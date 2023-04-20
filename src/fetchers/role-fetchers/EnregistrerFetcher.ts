import {RappelDTO} from '../../types/dto/RappelDTO';
import {UrlClientConstants} from '../urls/UrlClientConstants';

export class EnregistrerFetcher {
    static async enregistrer(mission: any) {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.enregistrerURL, mission);
            console.log(response);
            return {
                status: response.status,
                data: response?.data
            }
        } catch (e) {
            throw e;
        }
    }
}