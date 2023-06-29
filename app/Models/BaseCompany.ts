import HttpContext from '@ioc:Adonis/Core/HttpContext'
import { BaseModel, LucidModel, ModelQueryBuilderContract, beforeFetch, beforeSave, column } from "@ioc:Adonis/Lucid/Orm";

export default class BaseCompany extends BaseModel {
    @column()
    public companyId: number

    @beforeSave()
    public static beforeSave(model: LucidModel | any) {
		const companyId = HttpContext.get()?.auth?.user?.companyId;
        if (companyId) {
            model.companyId = companyId;
        }
    }

    @beforeFetch()
    public static beforeFetchCompany(query: ModelQueryBuilderContract<any>) {
		const companyId = HttpContext.get()?.auth?.user?.companyId;
        if (companyId) {
            query.where('company_id', companyId)
        }
    }
}
