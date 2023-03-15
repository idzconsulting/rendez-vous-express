import {UrlClientConstants} from '../urls/UrlClientConstants';

export interface AddressesResponses {
    adresses: Address[];
}

export interface Address {
    adresse: string;
    code_postal: number;
}

export class AddressesFetcher {
    static async searchAddress(address: string) {
        try {
            const response = await UrlClientConstants.axiosBase.post(UrlClientConstants.adresseRechercheURL,
                {recherche: address});
            return {
                status: response.status,
                data: response?.data as AddressesResponses
            }
        } catch (e) {
            throw e;
        }
    }
}
