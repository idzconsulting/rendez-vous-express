import {RappelDTO} from '../../types/dto/RappelDTO';
import {UrlClientConstants} from '../urls/UrlClientConstants';

export class InsererFetcher {
    static async inserer(rappel: RappelDTO) {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.insererURL, rappel);
            console.warn(response);
            return {
                status: response.status,
                data: response?.data
            }
        } catch (e) {
            throw e;
        }
    }
}