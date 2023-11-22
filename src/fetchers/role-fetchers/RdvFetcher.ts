import {UrlClientConstants} from '../urls/UrlClientConstants';

export class RdvFetcher {
    static async getRdvAvailable() {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.rdvUrl);
            return response
        } catch (e) {
            throw e;
        }
    }

    static async getRdvIdeal(cp:string,diags:any,type_surface_id:string) {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.rdvIdeal,{
                cp,
                diags,
                jour_delai:'0',
                id_agent:'0',
                type_surface_id
            });
            return response
        } catch (e) {
            throw e;
        }
    }
}
