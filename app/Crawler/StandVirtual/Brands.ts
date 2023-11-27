import { By, WebElement, until } from 'selenium-webdriver';
import Crawler from '../Crawler';
import Logger from '@ioc:Adonis/Core/Logger'
import Brand from 'App/Models/Brand';
import { string } from '@ioc:Adonis/Core/Helpers'

export default class Brands extends Crawler {
    public source = "stand-virtual"
    private baseUrl = "https://www.standvirtual.com/carros/"

    public concurrency = 1;

    public async handle(data) {
    
        try {
            await this.loadDriver();
            
            Logger.info(`Getting brands`)

            await this.driver.get(this.baseUrl);
            await this.accept()
            const brands = await this.getMakes();

            Logger.info(`${brands.length} brands found`)
            
            for (let i in brands) {
                await Brand.updateOrCreate({
                    slug: brands[i].slug
                }, {
                    name: brands[i].name,
                    slug: brands[i].slug,
                })
            }

            Logger.info("Extraction complete")
        } catch (exception) {
            Logger.error(exception)
        } finally {
            await this.driver.sleep(1000)
            await this.driver.close()
        }
    }

    private async getOptionElement() {
        Logger.info("Getting option element")
        let itemExample;
        itemExample = await this.driver.findElement(By.css('[data-testid="filter_enum_make"] ul li'))
        await this.driver.wait(until.elementIsVisible(itemExample), 2000);
        return '[data-testid="filter_enum_make"] ul li label p'
    }

    private slug(brand: string) {
        const value = string.toSlug(brand, { lower: true })
        if (value === 'today-sunshine') {
            return 'today_sunshine'
        }
        if (value === 'morris') {
            return 'austin-morris'
        }
        if (value === 'lynk-and-co') {
            return 'lynk-co'
        }
        return value.replace('.', '-')
    }

    private async accept() {
        // Click on cache
        Logger.info("Clicking on cache")
        await this.driver.sleep(3000)
        try {
            const acceptCache = this.driver.findElement(By.id('onetrust-accept-btn-handler'))
            await this.driver.wait(until.elementIsVisible(acceptCache), 3000);
            await acceptCache.click()
        } catch (except) {
            Logger.info(except)
            const acceptCache = this.driver.findElement(By.xpath("//button[contains(., 'Aceito')]"))
            await this.driver.wait(until.elementIsVisible(acceptCache), 3000);
            await acceptCache.click()
        }

    }

    private async getMakes() {   
        // Open makes dialog
        Logger.info("Opening makes")
        const brandElement = this.driver.findElement(By.css('input[placeholder="Marca"], input[value="Marca"]'));
        await this.driver.wait(until.elementIsVisible(brandElement), 3000);

        await brandElement.click()
        await this.driver.sleep(1000)

        // Search for the first make and get make class
        Logger.info("Getting first make")
        const optionClass = await this.getOptionElement();
        await this.driver.sleep(1000)

        Logger.info("Getting all makes")
        const brandElements = await this.driver.findElements(By.css(optionClass))
        const brands: Array<any> = []

        if (brandElements.length < 100) {
            throw new Error("Not able to get all the brands.")
        }

        for (let brandElement of brandElements) {
            const details = await this.getBrandDetails(brandElement)
            if (details) {
                brands.push(details);
            }
        }
        
        return brands;
    }

    async getBrandDetails(brand: WebElement) {
        const text = await brand.getText()
        if (text === "Selecionar" || text.indexOf("(") < 0) {
            return
        }
        const name = text.split('(')[0].trim()
        const total = +text.split('(')[1].replace(')', '').trim()
        const slug = this.slug(name)
        return { name, total, slug }
    }

}
