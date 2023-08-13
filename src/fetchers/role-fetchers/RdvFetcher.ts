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
}
