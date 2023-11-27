import {  By, WebElement, until } from 'selenium-webdriver';
import Crawler from '../Crawler';
import Logger from '@ioc:Adonis/Core/Logger'
import { DateTime } from 'luxon';
import ExtractionVehicle from 'App/Models/Extraction/ExtractionVehicle';
import Brand from 'App/Models/Brand';
import Model from 'App/Models/Model';
import Extraction from 'App/Models/Extraction/Extraction';
import Bull from '@ioc:Rocketseat/Bull';
import CrawlerJob from 'App/Jobs/CrawlerJob';

export default class Vehicles extends Crawler {
    public source = "custo-justo"
    private baseUrl = "https://custojusto.pt/portugal/veiculos/carros-usados"

    public concurrency = 5;

    public async handle(data) {
        await this.loadDriver();

        if (!data.brandId || !data.extractionId) {
            throw Error("The brand ID and extraction ID are needed.")
        }

        const brand = await Brand.find(data.brandId)
        let extraction = await Extraction.find(data.extractionId)

        if (!brand || !extraction) {
            throw Error("The brand or extraction was not found.")
        }

        if (brand.slug == 'volkswagen') {
            brand.slug = 'vw'
        }

        try {
            Logger.info(`Getting models for ${brand.slug}`)
            await this.driver.get(`${this.baseUrl}/${brand.slug}`);
            await this.accept()
            const pages = await this.findPagination()

            const autoComplete = await this.driver.findElement(By.id('searchAutocomplete'))
            if (await autoComplete.getAttribute('value') !== '') {
                Logger.warn(`Brand not found in the site ${brand.slug}. Skipping`)
                await this.updateSuccess(data.extractionId)
                return;
            }

            // For each brand get vehicles
            for (let i = 1; i <= pages; i++) {
                await this.getArticles(extraction, brand, i)
            }

            await this.updateSuccess(extraction.id)
        } catch (exception) {
            console.error(exception)
            await this.updateSuccess(extraction.id, false)

            throw new Error(exception)
        } finally {
            await this.driver.quit()
        }
    }

    private async findPagination(): Promise<number> {
        try {
            const lastPagination = await this.driver.findElement(By.css('.dapagination .pull-left:nth-child(2) li a'))
            const href = await lastPagination.getAttribute('href')
            const total = href.substring(href.lastIndexOf('=') + 1)
            Logger.info(`Pages found ${total}`)
            return +total
        } catch (exception) {
            Logger.warn("Pagination not found")
            return 1
        }
    }

    private async getArticles(extraction: Extraction, brand: Brand, page: number) {
        Logger.info(`Getting page ${this.baseUrl}/${brand.slug}?o=${page}`)
        await this.driver.get(`${this.baseUrl}/${brand.slug}?o=${page}`);

        const articles = await this.driver.findElements(By.css('.results_listing'))

        Logger.info(`Items found ${articles.length}`)

        for (let article of articles) {
            const { price, location, year, version } = this.parseVehicleText(await article.getText())
            const link = await article.findElement(By.xpath("./..")).getAttribute('href')
            const featuredImage = await article.findElement(By.css('img')).getAttribute('src')

            let model
            if (version && version.split(' ').length) {
                model = await Model
                    .query()
                    .where((where) => {
                        version
                            ?.split(' ')
                            .map(model => where.orWhereILike('name', model))
                    })
                    .where('brandId', brand.id)
                    .first()
            }
    
            const extractionVehicle = await ExtractionVehicle.updateOrCreate({
                    link,
                },
                {
                    source: this.source,
                    extractionHash: extraction.extractionHash,
                    extractionId: extraction.id,
                    modelDescription: '',
                    modelId: model?.id,
                    brandId: brand.id,
                    brandDescription: brand.name,
                    locationState: "",
                    version,
                    mileage: undefined,
                    fuelId: undefined,
                    fuelType: '',
                    link,
                    firstRegistrationYear: year,
                    transmission: undefined,
                    price, 
                    location, 
                    year, 
                    enginePower: undefined, 
                    engineCylinderCapacity: undefined,
                    featuredImage
            })

            if (!extractionVehicle.detailsExtractionComplete) {
                Bull.add(new CrawlerJob().key, { crawler: 'CustoJusto/Detail', extractionVehicleId: extractionVehicle.id })
            }
        }
    }

    private parseVehicleText(text: string) {
        let lines = text.split('\n')
        let price, location, year, version;

        lines.map(line => {
            if (line.split(' - ').length == 2 && !isNaN(+line.split(' - ')[1])) {
                const twoLetterYear = +line.split(' - ')[1]
                version = line.split(' - ')[0]
                if (twoLetterYear <= 23) {
                    year = 2000 + twoLetterYear
                } else (
                    year = 1900 + twoLetterYear
                )
            } else if (line.split(' - ').length == 2) {
                location = line.split(' - ')[1]
            } else if (line.indexOf('€') > 0) {
                price = isNaN(+line.trim().replace('€', '').replace(' ', '')) ? 0 : +line.trim().replace('€', '').replace(' ', '')
            }
        })

        if (!version) {
            version = lines[1]
        }

        return { price, location, year, version, }
    }

    private async accept() {
        // Click on cache
        Logger.info("Clicking on cache")
        try {
            await this.driver.sleep(500)
            const acceptCache = this.driver.findElement(By.id('didomi-notice-agree-button'))
            await this.driver.wait(until.elementIsVisible(acceptCache), 3000);
            await acceptCache.click()
            await this.driver.sleep(500);
            return true 
        } catch {
            Logger.warn("Not possible to click on cache.")
            return false
        }
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
