import Extraction from "App/Models/Extraction/Extraction";
import { Builder, Capabilities, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

export default class Crawler {
    public source = ""
    public driver: WebDriver

    public async loadDriver() {
        const options = new Options();
        
        options.addArguments('--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', ) //--headless=new
        options.excludeSwitches("disable-popup-blocking", "enable-automation"); 
        options.set("useAutomationExtension", false);

        let capabilities = Capabilities.chrome();
        
        this.driver = await new Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .setChromeOptions(options)
            .withCapabilities(capabilities)
            .build();
    }

    getTransmission(value: string): any {
        if (value.toLowerCase() == "automática") return "automatic"
        return value.toLowerCase()
    }

    getLocationState(state: string) {
        if (state.toLocaleLowerCase() ==="santarem") return "Santarém";
        if (state.toLocaleLowerCase() ==="setubal") return "Setúbal";
        if (state.toLocaleLowerCase() ==="acores") return "Açores";
        if (state.toLocaleLowerCase() ==="viana do castelo") return "Viana do Castelo";
        if (state.toLocaleLowerCase() ==="castelo branco") return "Castelo Branco";
        if (state.toLocaleLowerCase() ==="evora") return "Évora";
        return state;
    }

    getFuelSlug(fuelType: string): any {
        if (fuelType.toLowerCase() == "gasolina") return 'gasoline'
        if (fuelType.toLowerCase() == "diesel") return 'diesel'
        if (fuelType.toLowerCase() == "eléctrico") return 'eletric'
        if (fuelType.toLowerCase() == 'híbrido (diesel)') return 'hybrid-diesel'
        if (fuelType.toLowerCase() == 'híbrido (gasolina)') return 'hybrid-gasoline'
        if (fuelType.toLowerCase() == 'eco/híbrido') return 'hybrid-gasoline'
        return fuelType.toLowerCase()
    }

    async updateSuccess(extractionId, success: boolean = true) {
        // Update extraction
        const extraction = await Extraction.find(extractionId)
        if (extraction) {
            if (success) {
                extraction.extractionSucceeded += 1;
            } else {
                extraction.extractionFailed += 1;
            }

            if (extraction.extractionSucceeded + extraction.extractionFailed == extraction.extractionTotal) {
                if (extraction.extractionTotal == extraction.extractionSucceeded) {
                    extraction.status = 'success'
                } else {
                    extraction.status = 'failed'
                }
            }

            await extraction.save()
        }    
    }
}