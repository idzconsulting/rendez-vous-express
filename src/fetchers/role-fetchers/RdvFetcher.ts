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

    static async getRdvIdeal(cp:string,diags:any) {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.rdvIdeal,{
                cp,
                diags:[3,4,5],
                jour_delai:'0',
                id_agent:'0',
                type_surface_id:'6'
            });
            return response
        } catch (e) {
            throw e;
        }
    }
}
