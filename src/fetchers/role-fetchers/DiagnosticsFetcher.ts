import {UrlClientConstants} from '../urls/UrlClientConstants';

export class DiagnoscticsFetcher {
    static async obligatoires(mission: any) {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.diagnostics + 'obligatoires', mission);
            return {
                status: response.status,
                data: response?.data
            }
        } catch (e) {
            throw e;
        }
    }
    static async price(mission: any) {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.diagnostics + 'prix', mission);
            return {
                status: response.status,
                data: response?.data
            }
        } catch (e) {
            throw e;
        }
    }
}