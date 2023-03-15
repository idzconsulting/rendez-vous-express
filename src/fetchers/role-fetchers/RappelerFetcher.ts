import {UrlClientConstants} from '../urls/UrlClientConstants';
import {Rappel} from '../../types/fetcher-types/Rappel';

export class RappelerFetcher {
    static async rappeler(rappel: Rappel) {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.rappelerURL, rappel);
            return {
                status: response.status,
                data: response?.data
            }
        } catch (e) {
            throw e;
        }
    }

    async logout() {
        // await UrlServerConstants.axiosBase.get(UrlServerConstants.logoutURL);
    }
}
