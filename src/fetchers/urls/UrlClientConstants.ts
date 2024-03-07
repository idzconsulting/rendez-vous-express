import axios from 'axios';

export class UrlClientConstants {
    private static readonly _baseURL: string = 'https://api.rdvexpress.idzconsulting.fr/';
    private static readonly _baseURL2: string = 'https://idzconsulting.fr/api/';
    static readonly rappelerURL = 'rendez-vous/rappeler';
    static readonly insererURL = 'rendez-vous/inserer';
    static readonly enregistrerURL = 'rendez-vous/nouveau';
    static readonly rdvUrl = 'rendez-vous/disponibles';
    static readonly rdvIdeal = 'rendez-vous/rdv-ideal';
    static readonly adresseRechercheURL = 'adresse/recherche';
    static readonly clientRechercheURL = 'client/recherche';
    static readonly diagnostics = 'diagnostics/'
    static readonly partners = 'partenaires/'
    static readonly contacts ='contacts/'
    static readonly refsUrl = 'refs'
    static readonly distanceUrl = 'diagnostique/prix/'

    static axiosBase = axios.create({
        baseURL: this._baseURL,
    })

    static axiosBase2 = axios.create({
        baseURL: this._baseURL2,
    })
}
