import { JobContract } from '@ioc:Rocketseat/Bull'
import { Builder, By, WebDriver, WebElement, until } from 'selenium-webdriver';

export default class GetDataProviders implements JobContract {
    public key = 'GetDataProviders'

    public async handle(job) {
        console.info("Getting data from stand virtual")

        const driver = await new Builder()
            .forBrowser('chrome')
            .build();
        
        try {
            await driver.get('https://www.standvirtual.com/');
            const brands = await this.getMakes(driver);
            console.log(brands)
            
            const models = await this.getModels(driver, brands[0])
            console.log(models)
            /*
            await Promise.allSettled(brands.map(async (brand) => {
                return await this.getModels(driver, brands[0])
            }))
            */
        } catch (exception) {
            console.error(exception)
        } finally {
            await driver.sleep(3000)
            await driver.close()
        }
    }


    private async getModels(driver: WebDriver, brand: { brand: string, vehiclesAvailable: number, element: WebElement}) {
        console.log(brand)
        const brandParent = await brand.element.findElement(By.xpath("./.."))
        console.log(brandParent)
        await brandParent.click()

        const brandElement = driver.findElement(By.css('input[placeholder="Modelo"], input[value="Modelo"]'));
        await driver.wait(until.elementIsVisible(brandElement), 3000);
        await brandElement.click()

        const optionClass = await this.getOptionElement(driver);
        console.log(optionClass)

        const modelElements = await driver.findElements(By.css(optionClass))
        await driver.wait(until.elementIsVisible(await driver.findElement(By.css(optionClass))), 3000)
        await driver.sleep(1000)

        const promises: any = await Promise.allSettled(modelElements.map(this.getModelDetails))

        return promises
            .map(promise => {
                return {
                    ...promise.value,
                    brand: brand.brand
                }
            } )
            .filter(item => item)
    }

    private async getOptionElement(driver: WebDriver) {
        const brandExample = driver.findElement(By.xpath("//span[contains(., 'Selecionar')]"))
        await driver.wait(until.elementIsVisible(brandExample), 10000);
        return 'span.' + (await brandExample.getAttribute('class')).split(' ')[0]
    }

    private async getMakes(driver: WebDriver) {
        // Click on cache
        console.log("Clicking on cache")
        const acceptCache = driver.findElement(By.id('onetrust-accept-btn-handler'))
        await driver.wait(until.elementIsVisible(acceptCache), 3000);
        await acceptCache.click()

        // Open makes dialog
        console.log("Opening makes")
        const brandElement = driver.findElement(By.css('input[placeholder="Marca"], input[value="Marca"]'));
        await driver.wait(until.elementIsVisible(brandElement), 3000);
        await brandElement.click()
        
        // Search for the first make and get make class
        console.log("Getting first make")
        const optionClass = await this.getOptionElement(driver);
        console.log(optionClass)

        console.log("Getting all makes")
        const brandElements = await driver.findElements(By.css(optionClass))
        await driver.wait(until.elementIsVisible(await driver.findElement(By.css(optionClass))), 3000)
        await driver.sleep(1000)

        const promises: any = await Promise.allSettled(brandElements.map(this.getBrandDetails))

        return promises
            .map(promise => promise.value)
            .filter(brand => brand)
    }

    async getBrandDetails(brand: WebElement) {
        const text = await brand.getText()
        if (text === "Selecionar") {
            return
        }
        const brandName = text.split('(')[0].trim()
        const vehiclesAvailable = +text.split('(')[1].replace(')', '').trim()

        return { brand: brandName, vehiclesAvailable, element: brand }
    }

    async getModelDetails(model: WebElement) {
        const text = await model.getText()
        if (text === "Selecionar") {
            return
        }
        const brandName = text.split('(')[0].trim()
        const vehiclesAvailable = +text.split('(')[1].replace(')', '').trim()

        return { model: brandName, vehiclesAvailable, element: model }
    }
}
