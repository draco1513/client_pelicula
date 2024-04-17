import axios from "axios";
import { Global } from '../utils/general';
import headerRequest from "../utils/headers"

const API_URL = Global.url;
const SYS = Global.system;

class CuentaService {
    getCuentas(url, { search = '',page = 1, pageSize = 10, pagination = true }) {
        let ruta = `${API_URL}/cuentas?url=${url}&search=${search}&page=${page}&pageSize=${pageSize}&pagination=${pagination}`;
        return axios
            .get(ruta, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    getCuentasAll(url) {
        let ruta = `${API_URL}/cuentasAll?url=${url}`;
        return axios
            .get(ruta, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    saveCuenta(url, body) {
        let ruta = `${API_URL}/cuentas/saveCuenta?sys=${SYS}&url=${url}`;
        return axios
            .post(ruta, body, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    deleteCuenta(url, body) {
        let ruta = `${API_URL}/deleteCuenta?sys=${SYS}&url=${url}`;
        return axios.delete(ruta, {
            headers: headerRequest(),
            data: body
        }).catch((error) => {
            return error;
        });
    }
}

export default new CuentaService();
