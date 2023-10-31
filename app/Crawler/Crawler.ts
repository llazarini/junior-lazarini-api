import { Builder, Capabilities, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

export default class Crawler {
    public key = ''

    public source = ""
    public driver: WebDriver

    public async loadDriver() {
        const options = new Options();
        
        options.addArguments('--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--headless=new') //--headless=new
        options.excludeSwitches("disable-popup-blocking", "enable-automation"); 
        options.set("useAutomationExtension", false);

        let capabilities = Capabilities.chrome();
        
        this.driver = await new Builder()
            .usingServer('http://localhost:4444/wd/hub')
            .setChromeOptions(options)
            .withCapabilities(capabilities)
            .build();
    }
}