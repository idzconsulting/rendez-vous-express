export class LoginFetcher {
    async login() {
        try {
            // const response = await UrlServerConstants.axiosBase.post(UrlServerConstants.loginURL, {...user});
            // return {
            //     status: response.status,
            //     data: response?.data as UserFromLogin
            // }
        } catch (e) {
            throw e;
        }
    }

    async logout() {
        // await UrlServerConstants.axiosBase.get(UrlServerConstants.logoutURL);
    }
}
