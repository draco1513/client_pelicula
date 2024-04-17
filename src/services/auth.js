import axios from "axios";
import { Global } from '../utils/general';
import headerRequest from "../utils/headers"

const API_URL = Global.url;
class AuthService {
    signIn(body) {
        let ruta = `${API_URL}/login`;
        return axios
            .post(ruta, body)
            .catch((error) => {
                return error.response;
            });
    }

    signOut() {
        let ruta = `${API_URL}/logout`;
        return axios
        .post(ruta,{},{
            headers: headerRequest(),
        })
            .catch((error) => {
                return error.response;
            });
    }
}

export default new AuthService();