import {  By, until } from 'selenium-webdriver';
import Crawler from '../Crawler';
import Logger from '@ioc:Adonis/Core/Logger'
import ExtractionVehicle from 'App/Models/Extraction/ExtractionVehicle';
import Fuel from 'App/Models/Fuel';
import Model from 'App/Models/Model';
import { string } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon';

export default class Detail extends Crawler {
    public source = "custo-justo"

    public async handle(data) {
        const extractionVehicle = await ExtractionVehicle.find(data.extractionVehicleId || 0)

        if (!extractionVehicle) {
            throw Error("The extraction vehicle is needed.")
        }

        if (extractionVehicle.detailsExtractionComplete) {
            Logger.warn("Vehicle already got info. Skipping")
            return;
        }
        
        try {
            await this.loadDriver();
            await this.driver.get(`${extractionVehicle.link}`);
            await this.accept()

            let image = ''
            try {
                image = await this.driver.findElement(By.css('.main-slide')).getAttribute('src')
            } catch {
                Logger.warn("Not possible to get featured image")
            }
            try {
                const description = await this.getDescriptions()
                const model = await Model.updateOrCreate({
                    name: description.modelDescription,
                    brandId: extractionVehicle.brandId,
                }, {
                    name: description.modelDescription,
                    brandId: extractionVehicle.brandId,
                })
                const link = extractionVehicle.link.replace('https://www.custojusto.pt/', '')
                const locationState = this.getLocationState(string.sentenceCase(link.substring(0, link.indexOf('/'))))
    
                const fuel = await Fuel.findBy('slug', description.fuelType)
    
                extractionVehicle.merge(description)
                if (locationState) {
                    extractionVehicle.locationState = locationState;
                }
                if (model) {
                    extractionVehicle.modelId = model?.id
                }
                if (fuel) {
                    extractionVehicle.fuelId = fuel.id
                }
                if (image) {
                    extractionVehicle.featuredImage = image;
                }
    
                extractionVehicle.detailsExtractionComplete = true;
            } catch {
                const kaput = await this.driver.findElement(By.css('.kaput'))
                if ((await kaput.getText()).indexOf("não está activo")) {
                    extractionVehicle.removedDate = DateTime.now();
                }
            }
        
            Logger.info(extractionVehicle?.id.toString())
            if (!await extractionVehicle.save()) {
                throw new Error("Not possible to save the vehicle")
            }

        } catch (exception) {
            console.error(exception)
            throw new Error(exception)
        } finally {
            await this.driver.quit()
        }
    }

    async getDescriptions() {
        const description = await this.driver.findElement(By.css('.gbody'));
        const lines = (await description.getText()).split("\n")
        let year, mileage, transmission, fuelType, brandDescription, 
            modelDescription, location, locationState, engineCylinderCapacity, enginePower, color;

        lines.map((line, i) => {
            if (line.trim() == "Ano do modelo" && !isNaN(+lines[i - 1].replace(' ou anterior', ''))) {
                year = +lines[i - 1].replace(' ou anterior', '')
            } else if (line.trim() == 'Quilómetros' && !isNaN(+lines[i - 1].split(' - ')[0].replace(' ', ''))) {
                mileage = +lines[i - 1].split(' - ')[1].replace(' ', '') + 1
            } else if (line.trim() == 'Tipo de caixa') {
                transmission = this.getTransmission(lines[i - 1])
            } else if (line.trim() == 'Combustível') {
                fuelType = (lines[i - 1])
            } else if (line.trim() == 'Fabricante') {
                brandDescription = lines[i - 1]
            } else if (line.trim() == 'Modelo') {
                modelDescription = lines[i - 1]
            } else if (line.trim() == 'Concelho') {
                locationState = lines[i - 1]
            } else if (line.trim() == 'Freguesia') {
                location = lines[i - 1]
            } else if (line.trim().indexOf('Cilindrada') >= 0) {
                engineCylinderCapacity = lines[i - 1]
            } else if (line.trim().indexOf('Potência') >= 0) {
                enginePower = lines[i - 1]
            }  else if (line.trim().indexOf('Cor') >= 0) {
                color = lines[i - 1]
            } 
        })

        
        return { year, color, mileage, transmission, fuelType, brandDescription, modelDescription, location, locationState, engineCylinderCapacity, enginePower }
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
        } catch {
            Logger.warn("Not possible to click on cache.")
        }
    }

}
