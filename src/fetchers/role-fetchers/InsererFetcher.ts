import {RappelDTO} from '../../types/dto/RappelDTO';
import {UrlClientConstants} from '../urls/UrlClientConstants';

export class InsererFetcher {
    static async inserer(mission: any) {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.insererURL, mission);
            return {
                status: response.status,
                data: response?.data
            }
        } catch (e) {
            throw e;
        }
    }
}