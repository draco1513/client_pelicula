import { Global } from "./general";
const validateUser = function () {
    let user = localStorage.getItem(Global.infoLegajo);
    return user;
};

const getDateOL = function (date, type = 'short', moreDays = 0) {
    date = (date ? new Date(`${date}T00:00:00`) : new Date())
    let dateTmp = date;
    dateTmp.setDate(dateTmp.getDate() + moreDays)
    let newDate;
    /*let fecha = date,
        hours = fecha.getHours(),
        minutes = fecha.getMinutes(),
        seconds = fecha.getSeconds(),
        day =
            (fecha.getDate() + moreDays) > lastDay ?
                lastDay :
                (fecha.getDate() + moreDays) < firstDay ?
                    firstDay :
                    (fecha.getDate() + moreDays)
        ,
        month = fecha.getMonth() + 1,
        year = fecha.getFullYear();*/
    let fecha = date,
        hours = fecha.getHours(),
        minutes = fecha.getMinutes(),
        seconds = fecha.getSeconds(),
        day = fecha.getDate(),
        month = fecha.getMonth() + 1,
        year = fecha.getFullYear();

    if (type.toLowerCase() === 'short') {
        newDate = year + '-' + (month < 10 ? '0' + (month || '0') : month || '') + '-' + (day < 10 ? '0' + (day || '0') : day || '');
    }
    if (type.toLowerCase() === 'large') {
        newDate = (year + '-' + (month < 10 ? '0' + (month || '0') : month || '') + '-' + (day < 10 ? '0' + (day || '0') : day || '') + ' ' + hours + ':' + (minutes < 10 ? '0' + (minutes || '0') : minutes || '') + ':' + (seconds < 10 ? '0' + (seconds || '0') : seconds || ''));
    }
    return newDate;
};

const formatDate = function (date = new Date(), type = 'date-time', typeTime = 'short') {
    //let fecha = new Date(date);
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let hour = String(date.getHours()).padStart(2, '0');
    let minute = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    let formattedDate;
    if (type === 'date') {
        formattedDate = `${year}-${month}-${day}`;
    } else if (type === 'time') {
        if (typeTime === 'long') {
            formattedDate = `${hour}:${minute}:${seconds}`;
        } else {
            formattedDate = `${hour}:${minute}`;
        }
    } else {
        if (typeTime === 'long') {
            formattedDate = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
        } else {
            formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;
        }
    }

    return formattedDate;
};

const minutesDiff = (date1, date2, type = 'date') => {
    let diffEnMin;
    if (type === 'date') {
        // let fecha1 = new Date(date1); //* fecha mayor '2023-04-02 12:45:00');
        // let fecha2 = new Date(date2); //* fecha menor '2023-04-02 12:30:00');
        // let diffEnMs = fecha1.getTime() - fecha2.getTime();
        // diffEnMin = diffEnMs / 60000;

        // let fecha1 = (/^\d{4}-\d{2}-\d{2}$/.test(date1) ? new Date(`${date1}T23:59:59`) : new Date(date1));
        // let fecha2 = (/^\d{4}-\d{2}-\d{2}$/.test(date2) ? new Date(`${date2}T00:00:00`) : new Date(date2));
        let fecha1 = (/^\d{4}-\d{2}-\d{2}$/.test(date1) ? new Date(`${date1}T00:00:00`) : new Date(date1));
        let fecha2 = (/^\d{4}-\d{2}-\d{2}$/.test(date2) ? new Date(`${date2}T00:00:00`) : new Date(date2));

        let diffEnMs = fecha1.getTime() - fecha2.getTime();
        diffEnMin = Math.floor(Math.abs(diffEnMs / 60000));
    } else {
        let fecha1 = new Date();
        let fecha2 = new Date();
        let [horas1, minutos1] = date1.split(':').map(Number);
        let [horas2, minutos2] = date2.split(':').map(Number);
        console.log(minutos1, minutos2)

        if (horas2 < horas1) {
            fecha2.setDate(fecha1.getDate() + 1);
        }
        fecha1 = new Date(`${formatDate(fecha1, 'date')}T${date1}`);
        fecha2 = new Date(`${formatDate(fecha2, 'date')}T${date2}`);

        let diffEnMs = fecha2.getTime() - fecha1.getTime();
        diffEnMin = diffEnMs / 60000;
    }
    return diffEnMin;
};

function sortDataList(dataList, sortConfig) {
    if (!sortConfig) {
        return dataList;
    }

    if (sortConfig.key) {
        const keys = sortConfig.key.split('.');
        const sortedData = dataList?.slice(0).sort((a, b) => {
            const propA = keys.reduce((obj, key) => obj?.[key], a);
            const propB = keys.reduce((obj, key) => obj?.[key], b);
            if (!isNaN(parseFloat(propA)) && !isNaN(parseFloat(propB))) {
                return sortConfig.direction === 'ascending' ? propA - propB : propB - propA;
            } else if (propA < propB) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            } else if (propA > propB) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            } else {
                return 0;
            }
        });
        return sortedData;
    } else {
        return dataList?.slice(0);
    }
};

function sortDataListSimple(dataList, sortConfig) {
    dataList?.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
    });

    return dataList
};

function filterData(data, searchValue, searchProperties) {
    return !searchValue ? data : data?.filter((dato) => {
        return searchProperties?.some(propiedad => {
            const propiedades = propiedad.split('.');
            let valor = dato;
            for (let i = 0; i < propiedades.length; i++)
                valor = valor?.[propiedades[i]];
            return valor?.toLowerCase().includes(searchValue.toLowerCase());
        });
    });
};

function validatePassword(clave) {
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&])(?!.*[\s\\\/]).{6,10}$/;
    return regex.test(clave);
};

function calculateWeek(pFecha, tipo = 1) {
    const fecha = (pFecha ? new Date(`${pFecha}T00:00:00`) : new Date())

    const primerDia = new Date(fecha);
    const ultimoDia = new Date(fecha);
    //if (tipo === 'lunes-domingo') {
    if (tipo === 1) {
        primerDia.setDate(fecha.getDate() - fecha.getDay() + 1);
        ultimoDia.setDate(fecha.getDate() + (7 - fecha.getDay()));
    } else {
        primerDia.setDate(fecha.getDate() - fecha.getDay());
        ultimoDia.setDate(fecha.getDate() + (6 - fecha.getDay()));
    }
    const primerDiaFormatted = primerDia.toISOString().split('T')[0];
    const ultimoDiaFormatted = ultimoDia.toISOString().split('T')[0];
    return {
        primerDia: primerDiaFormatted,
        ultimoDia: ultimoDiaFormatted
    };
};

function nombreDia(fecha, type = 'c') {
    fecha = (fecha ? new Date(`${fecha}T00:00:00`) : new Date())
    let diaSemana = fecha.getDay()
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diasSemanaShort = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return (type === 'c' ? diasSemana[diaSemana] : diasSemanaShort[diaSemana]);
}

function nombreMes(fecha, type = 'c') {
    fecha = (fecha ? new Date(`${fecha}T00:00:00`) : new Date());
    let mes = fecha.getMonth();
    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const nombresMesesShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return (type === 'c' ? nombresMeses[mes] : nombresMesesShort[mes]);
}

export { getDateOL, formatDate, minutesDiff, validateUser, sortDataList, sortDataListSimple, filterData, validatePassword, calculateWeek, nombreDia, nombreMes };
