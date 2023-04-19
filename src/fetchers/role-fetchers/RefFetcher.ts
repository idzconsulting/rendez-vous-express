import {UrlClientConstants} from '../urls/UrlClientConstants';
import {RappelDTO} from '../../types/dto/RappelDTO';

export class RefsFetcher {
    static async getRefs() {
        try {
            const response = await UrlClientConstants.axiosBase.get(UrlClientConstants.refsUrl);
            return response
        } catch (e) {
            throw e;
        }
    }
}
