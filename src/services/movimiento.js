import axios from "axios";
import { Global } from '../utils/general';
import headerRequest from "../utils/headers"

const API_URL = Global.url;
const SYS = Global.system;

class Movimientoservice {
    getMovimientos(url, { search = '',page = 1, pageSize = 10, pagination = true ,dateInit,dateEnd}) {
        
        let ruta = `${API_URL}/movimientos?url=${url}&search=${search}&page=${page}&pageSize=${pageSize}&pagination=${pagination}&fechaInicio=${dateInit}&fechaFin=${dateEnd}`;
        return axios
            .get(ruta, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    getMovimientosPagados(url) {
        
        let ruta = `${API_URL}/movimientos-pagados?url=${url}`;
        return axios
            .get(ruta, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    saveMovimiento(url, body) {
        let ruta = `${API_URL}/movimientos/saveMovimiento?sys=${SYS}&url=${url}`;
        return axios
            .post(ruta, body, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    deleteMovimiento(url, body) {
        let ruta = `${API_URL}/deleteMovimiento?sys=${SYS}&url=${url}`;
        return axios.delete(ruta, {
            headers: headerRequest(),
            data: body
        }).catch((error) => {
            return error;
        });
    }
}

export default new Movimientoservice();
