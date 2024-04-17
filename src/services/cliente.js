import axios from "axios";
import { Global } from '../utils/general';
import headerRequest from "../utils/headers"

const API_URL = Global.url;
const SYS = Global.system;

class ClienteService {
    getClientes(url, { search = '',page = 1, pageSize = 10, pagination = true }) {
        let ruta = `${API_URL}/clientes?url=${url}&search=${search}&page=${page}&pageSize=${pageSize}&pagination=${pagination}`;
        return axios
            .get(ruta, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }
    

    obtenerClientesConCuentas(url) {
        let ruta = `${API_URL}/clientes-cuenta?url=${url}`;
        return axios
            .get(ruta, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    obtenerInformacionCuentasCliente(url,{cliente_id=''}) {
        let ruta = `${API_URL}/clientes-cuenta/info?url=${url}&cliente_id=${cliente_id}`;
        return axios
            .get(ruta, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }



    saveCliente(url, body) {
        let ruta = `${API_URL}/clientes/saveCliente?sys=${SYS}&url=${url}`;
        return axios
            .post(ruta, body, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    deleteCliente(url, body) {
        let ruta = `${API_URL}/deleteCliente?sys=${SYS}&url=${url}`;
        return axios.delete(ruta, {
            headers: headerRequest(),
            data: body
        }).catch((error) => {
            return error;
        });
    }
}

export default new ClienteService();
