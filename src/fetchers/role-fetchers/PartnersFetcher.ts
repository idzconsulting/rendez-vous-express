import {UrlClientConstants} from '../urls/UrlClientConstants';

export class PartnersFetcher {
    static async getPartner(partner: any) {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.partners + 'recherche', partner);
            return {
                status: response.status,
                data: response?.data
            }
        } catch (e) {
            throw e;
        }
    }
    static async addPartner(partner: any) {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.contacts + 'ajout', partner);
            return {
                status: response.status,
                data: response?.data
            }
        } catch (e) {
            throw e;
        }
    }
}