import { UrlClientConstants } from '../urls/UrlClientConstants';

export class DisponibiliteFetcher {
    static async getTechInNearDistance(cp: any) {
        try {
            const buildPayload = { cp}
            const buildPayload2 = { diagnostiques:[]}
            const jsonString = JSON.stringify(buildPayload);
            const encodedData = encodeURIComponent(jsonString);
            const jsonString2 = JSON.stringify(buildPayload2);
            const encodedData2 = encodeURIComponent(jsonString2);
            const response = await UrlClientConstants.axiosBase2.get(`${UrlClientConstants.distanceUrl}?data1=${encodedData}&data2=${encodedData2}`);
            return response
        } catch (e) {
            throw e;
        }
    }
}
