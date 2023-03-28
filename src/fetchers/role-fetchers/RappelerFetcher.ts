import {UrlClientConstants} from '../urls/UrlClientConstants';
import {RappelDTO} from '../../types/dto/RappelDTO';

export class RappelerFetcher {
    static async rappeler(rappel: RappelDTO) {
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
}
