import {  By, WebElement, until } from 'selenium-webdriver';
import Crawler from '../Crawler';
import Logger from '@ioc:Adonis/Core/Logger'
import { DateTime } from 'luxon';
import ExtractionVehicle from 'App/Models/Extraction/ExtractionVehicle';
import Fuel from 'App/Models/Fuel';
import Brand from 'App/Models/Brand';
import Model from 'App/Models/Model';
import Extraction from 'App/Models/Extraction/Extraction';

export default class Vehicles extends Crawler {
    public source = "stand-virtual"
    private baseUrl = "https://www.standvirtual.com"

    public concurrency = 1;

    public async handle(data) {
        await this.loadDriver();

        if (!data.brandId || !data.extractionId) {
            throw Error("The brand ID and extraction ID are needed.")
        }
        const brand = await Brand.find(data.brandId)
        const extraction = await Extraction.find(data.extractionId)
        if (!brand || !extraction) {
            throw Error("The brand or extraction was not found.")
        }

        try {
            Logger.info(`Getting models for ${brand.slug}`)
            await this.driver.get(`${this.baseUrl}/carros/${brand.slug}`);
            await this.accept()

            const maxPagination = await this.findPagination()

            for (let i = 1; i < +maxPagination + 1; i++) {
                Logger.info(`Getting page ${i}`)
                await this.loadDriver()
                await this.getArticles(extraction, brand, i)
                await this.driver.sleep(500)
                await this.driver.close();
            }

            extraction.extractionSucceeded += 1;
            await extraction.save()

            Logger.info("Extraction complete")

        } catch (exception) {
            console.error(exception)
            throw new Error(exception)
        } finally {
            try {
                await this.driver.sleep(1000);
                await this.driver.close();
            } catch (exception) {
                Logger.warn(`Session already terminated`)
            }
        }
    }

    private async findPagination(): Promise<number> {
        const paginationItems = await this.driver.findElements(By.css('ul.pagination-list li a span'))
        let totalPages = 1
        for (let paginationItem of paginationItems) {
            if (!isNaN(+await paginationItem.getText())) {
                totalPages = +await paginationItem.getText()
            }
        }
        Logger.info(`Pages found ${totalPages}`)
        return totalPages
    }

    private async getArticles(extraction: Extraction, brand: Brand, page: number) {
        Logger.info(`Getting page ${this.baseUrl}/carros/${brand.slug}?page=${page}`)
        await this.driver.get(`${this.baseUrl}/carros/${brand.slug}?page=${page}`);
        const articles = await this.driver.findElements(By.css('div[data-testid="search-results"] article'))
        for (let article of articles) {
            try {
                const version = await article.findElement(By.css('h1')).getText()
                const mileage = await article.findElement(By.css('[data-parameter="mileage"]')).getText()
                const fuelType = await article.findElement(By.css('[data-parameter="fuel_type"]')).getText()
                const transmission = await article.findElement(By.css('[data-parameter="gearbox"]')).getText()
                const firstRegistrationYear = await article.findElement(By.css('[data-parameter="first_registration_year"]')).getText()
                const link = await article.findElement(By.css('a')).getAttribute('href')
                const featuredImage = await article.findElement(By.css('img')).getAttribute('src')
                const modelDescription = version.split(' ').length > 1 ? version.split(' ')[1] : ''

                const { price, location, locationState, year, enginePower, engineCylinderCapacity } = this.parseVehicleText(await article.getText())

                Logger.info(version)
                Logger.info(link)
                Logger.info(mileage)
                Logger.info(transmission)
                Logger.info(firstRegistrationYear)
                Logger.info(fuelType)

                const fuel = await Fuel.findBy('slug', this.getFuelSlug(fuelType))
                
                const model = await Model.updateOrCreate(
                    { 
                        brandId: brand.id,
                        name: modelDescription, 
                    }, 
                    {
                        brandId: brand.id,
                        name: modelDescription,
                    }
                )

                await ExtractionVehicle.updateOrCreate({
                        link,
                    },
                    {
                        source: this.source,
                        extractionHash: extraction.extractionHash,
                        extractionId: extraction.id,
                        modelDescription: modelDescription,
                        modelId: model?.id,
                        brandId: brand.id,
                        brandDescription: brand.name,
                        locationState,
                        version,
                        mileage: +mileage.replace('km', '').replace(' ', ''),
                        fuelId: fuel?.id,
                        fuelType,
                        link,
                        firstRegistrationYear: +firstRegistrationYear,
                        transmission,
                        price, 
                        location, 
                        year, 
                        enginePower, 
                        engineCylinderCapacity,
                        featuredImage
                    })
            } catch (exception) {
                Logger.warn(`Not possible to get or save car ${exception}`)
            }
         
        }
    }
    
    getFuelSlug(fuelType: string): any {
        if (fuelType.toLowerCase() == "gasolina") {
            return 'gasoline'
        } else if (fuelType.toLowerCase() == "diesel") {
            return 'diesel'
        } else if (fuelType.toLowerCase() == "eléctrico") {
            return 'eletric'
        } else if (fuelType.toLowerCase() == 'híbrido (diesel)') {
            return 'hybrid-diesel'
        } else if (fuelType.toLowerCase() == 'híbrido (gasolina)') {
            return 'hybrid-gasoline'
        } else {
            return fuelType.toLowerCase()
        }
    }

    parseVehicleText(text: string) {
        let lines = text.split('\n')
        let price = 0
        let year = 0
        let location = ''
        let locationState = ''
        let engineCylinderCapacity = ''
        let enginePower = ''
        lines.map(line => {
            if (line.indexOf(' ') > 0 
                && line.split(' ').length == 2 
                && !isNaN(+line.split(' ')[0])
                && !isNaN(+line.split(' ')[1])
            ) {
                price = +(line.replace(' ', ''))
            }
            if (line.indexOf('(') > 0 && line.indexOf(')') > 0) {
                location = line;
                locationState = line.substring(line.lastIndexOf('('))
                    .replace('(', '')
                    .replace(')', '')
            }
            if (line.length === 4 && !isNaN(+line) && +line <= DateTime.now().year + 1) {
                year = +line
            }
            if (line.indexOf('cm3') && line.indexOf('cv') && line.split(' • ').length == 2) {
                const items = line.split(' • ')
                engineCylinderCapacity = items[0]
                    .replace(' ', '')
                    .replace('cm3', '')
                enginePower = items[1]
                    .replace(' ', '')
                    .replace('cv', '')
            }
        })

        return { price, location, locationState, year, enginePower, engineCylinderCapacity }
    }

    private async accept() {
        // Click on cache
        Logger.info("Clicking on cache")
        await this.driver.sleep(1000)
        try {
            const acceptCache = this.driver.findElement(By.id('onetrust-accept-btn-handler'))
            await this.driver.wait(until.elementIsVisible(acceptCache), 3000);
            await acceptCache.click()
            return
        } catch {
            Logger.warn("Not possible to acept")
        }
        try {
            const acceptCache = this.driver.findElement(By.xpath("//button[contains(., 'Aceito')]"))
            await this.driver.wait(until.elementIsVisible(acceptCache), 3000);
            await acceptCache.click()
        } catch {
            Logger.warn("Not possible to acept")
        }
    }

    private async getModels() {   
        // Open makes dialog
        Logger.info("Opening models")
        const brandElement = this.driver.findElement(By.css('input[placeholder="Modelo"], input[value="Modelo"]'));
        await this.driver.wait(until.elementIsVisible(brandElement), 3000);

        await brandElement.click()
        await this.driver.sleep(500)

        // Search for the first make and get make class
        Logger.info("Getting first models")
        const optionClass = await this.getOptionElement();
        await this.driver.sleep(1000)

        Logger.info("Getting all models")
        const brandElements = await this.driver.findElements(By.css(optionClass))
        const models: Array<any> = []

        for (let brandElement of brandElements) {
            const details = await this.getModelDetails(brandElement)
            if (details) {
                models.push(details);
            }
        }
        
        return models;
    }

    private async getOptionElement() {
        Logger.info("Getting option element")
        let itemExample;
        itemExample = await this.driver.findElement(By.css('[data-testid="filter_enum_model"] ul li'))
        await this.driver.wait(until.elementIsVisible(itemExample), 2000);
        return '[data-testid="filter_enum_model"] ul li label p'
    }

    async getModelDetails(model: WebElement) {
        const text = await model.getText()
        if (text === "Selecionar" || text.indexOf("(") < 0) {
            return
        }
        const name = text.split('(')[0].trim()
        const total = +text.split('(')[1].replace(')', '').trim()
        const slug = name.toLowerCase().replace(' ', '-')
        return { name, total, slug }
    }

}
