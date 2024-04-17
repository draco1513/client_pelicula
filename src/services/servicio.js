import axios from "axios";
import { Global } from '../utils/general';
import headerRequest from "../utils/headers"

const API_URL = Global.url;
const SYS = Global.system;

class ServicioService {
    getServicios(url, { search = '',page = 1, pageSize = 10, pagination = true }) {
        let ruta = `${API_URL}/servicios?url=${url}&search=${search}&page=${page}&pageSize=${pageSize}&pagination=${pagination}`;
        return axios
            .get(ruta, {
                headers: headerRequest(),
            })
            .catch((error) => {
                return error;
            });
    }

    saveServicio(url, body) {
        let ruta = `${API_URL}/servicios/saveServicio?sys=${SYS}&url=${url}`;
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

export default new ServicioService();
