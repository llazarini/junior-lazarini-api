import { JobContract } from "@ioc:Rocketseat/Bull";
import CustoJustoVehicles from "App/Crawler/CustoJusto/Vehicles";
import CustoJustoDetail from "App/Crawler/CustoJusto/Detail";
import StandVirtualVehicles from "App/Crawler/StandVirtual/Vehicles";
import StandVirtualBrands from "App/Crawler/StandVirtual/Brands";

export default class CrawlerJob implements JobContract {
    public key = 'CrawlerJob'
    public concurrency = 10;

    public async handle({ data }) {
        console.info(data.crawler)
        
        let crawler;
        if (data.crawler == 'CustoJusto/Vehicles') {
            crawler = new CustoJustoVehicles()
        } else if (data.crawler == 'CustoJusto/Detail') {
            crawler = new CustoJustoDetail()
        } else if (data.crawler == 'StandVirtual/Vehicles') {
            crawler = new StandVirtualVehicles()
        } else if (data.crawler == 'StandVirtual/Brands') {
            crawler = new StandVirtualBrands()
        }
        await crawler.handle(data)
    }
}
