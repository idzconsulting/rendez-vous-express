import axios from 'axios';

export class UrlClientConstants {
    private static readonly _baseURL: string = 'https://api.rdvexpress.idzconsulting.fr/';

    static readonly rappelerURL = 'rendez-vous/rappeler';
    static readonly insererURL = 'rendez-vous/inserer';
    static readonly enregistrerURL = 'rendez-vous/nouveau';
    static readonly adresseRechercheURL = 'adresse/recherche';
    static readonly refsUrl = 'refs'

    static axiosBase = axios.create({
        baseURL: this._baseURL,
    })
}
