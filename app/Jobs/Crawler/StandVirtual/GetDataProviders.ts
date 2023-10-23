import { JobContract } from '@ioc:Rocketseat/Bull'
import ExtractionSummary from 'App/Models/ExtractionSummary';
import { DateTime } from 'luxon';
import { Builder, By, WebDriver, WebElement, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';

export default class GetDataProviders implements JobContract {
    public key = 'GetDataProviders'
    makeButtonClass: Promise<string>;
    

    public async handle(job) {
        console.info("Getting data from stand virtual")

        const options = new Options();

        options.addArguments('--no-sandbox')
        options.addArguments('--headless')
        options.addArguments('--disable-dev-shm-usage')

        options.excludeSwitches("disable-popup-blocking", "enable-automation");

        //options.addArguments("--headless");
        //options.addArguments("--window-size=1280,1200")

        const driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
        
        try {
            await driver.get('https://www.standvirtual.com/');
            const brands = await this.getMakes(driver);
            console.log(brands)

            for (let i in brands) {
                console.log('Getting models for make ' + brands[i].brand)
                const models = await this.getModels(driver, brands[i == 0 ? 0 : i - 1], brands[i])
                console.log(models)

                await Promise.allSettled(models.map(async (item) => {
                    console.log({
                        model: item.model,
                        brand: brands[i].brand,
                        extractionDate: DateTime.now(),
                        brandTotal: brands[i].vehiclesAvailable,
                        modelTotal: item.vehiclesAvailable
                    })
                    await ExtractionSummary.create({
                        source: 'standvirtual',
                        model: item.model,
                        brand: brands[i].brand,
                        extractionDate: DateTime.now(),
                        brandTotal: brands[i].vehiclesAvailable,
                        modelTotal: item.vehiclesAvailable
                    })
                }))
            }
            
        } catch (exception) {
            console.error(exception)
        } finally {
            await driver.sleep(3000)
            //await driver.close()
        }
    }


    private async getModels(
        driver: WebDriver, 
        previusBrand: { text: string, brand: string, vehiclesAvailable: number}, 
        brand: { text: string, brand: string, vehiclesAvailable: number}
    ) {

        console.log("Opening make dialog")
        const brandSelect = driver.findElement(By.css('input[placeholder="Marca"], input[value="Marca"],  input[value="' + previusBrand.brand + '"]'));
        await driver.wait(until.elementIsVisible(brandSelect), 3000);
        await brandSelect.click()

        await driver.sleep(1000)

        console.log("Searching make ")
        const brandElement = driver.findElement(By.xpath("//span[contains(., '" + brand.brand + "')]"))
        await driver.wait(until.elementIsVisible(brandElement), 3000);
        await brandElement.click()


        console.log("Opening Model dialog")
        const makeElement = driver.findElement(By.css('input[placeholder="Modelo"], input[value="Modelo"]'));
        await driver.wait(until.elementIsVisible(makeElement), 3000);
        await makeElement.click()

        await driver.sleep(1000)

        const optionClass = await this.getOptionElement(driver);

        const modelElements = await driver.findElements(By.css(optionClass))
        await driver.wait(until.elementIsVisible(await driver.findElement(By.css(optionClass))), 3000)

        const promises: any = await Promise.allSettled(modelElements.map(this.getModelDetails))

        const title = await driver.findElement(By.css('form')) // Close everything
        await title.click()

        return promises
            .map(promise => {
                if (!promise.value) {
                    return
                }
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

        this.makeButtonClass = brandElement.getAttribute('class');
        await brandElement.click()
        
        // Search for the first make and get make class
        console.log("Getting first make")
        const optionClass = await this.getOptionElement(driver);
        console.log(optionClass)

        console.log("Getting all makes")
        const brandElements = await driver.findElements(By.css(optionClass))
        await driver.wait(until.elementIsVisible(await driver.findElement(By.css(optionClass))), 3000)

        const promises: any = await Promise.allSettled(brandElements.map(this.getBrandDetails))

        const title = await driver.findElement(By.css('form'))
        await title.click() // Close everything

        await driver.sleep(500)

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

        return { text, brand: brandName, vehiclesAvailable, element: brand }
    }

    async getModelDetails(model: WebElement) {
        const text = await model.getText()
        if (text === "Selecionar") {
            return
        }
        const brandName = text.split('(')[0].trim()
        const vehiclesAvailable = +text.split('(')[1].replace(')', '').trim()

        return { text, model: brandName, vehiclesAvailable, element: model }
    }
}
