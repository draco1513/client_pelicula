import axios from "axios";
import { Global } from '../utils/general';
import headerRequest from "../utils/headers"

const API_URL = Global.url;
const SYS = Global.system;

class PerfilService {
    getPerfiles(url) {
        let ruta = `${API_URL}/perfiles?url=${url}`;
        return axios
            .get(ruta, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    getClientesAll(url) {
        let ruta = `${API_URL}/perfiles/clientes?url=${url}`;
        return axios
            .get(ruta, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    savePerfilesCuenta(url, body) {
        let ruta = `${API_URL}/perfiles/savePerfilesCuenta?sys=${SYS}&url=${url}`;
        return axios
            .post(ruta, body, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    deleteServicio(url, body) {
        let ruta = `${API_URL}/deleteServicio?sys=${SYS}&url=${url}`;
        return axios.delete(ruta, {
            headers: headerRequest(),
            data: body
        }).catch((error) => {
            return error;
        });
    }
}

export default new PerfilService();
