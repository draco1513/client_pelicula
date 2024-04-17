import React, { useEffect, useState } from 'react';
import MainModal from '../../../components/General/MainModal';
import MainButton from '../../../components/General/MainButton';
import { CODES } from '../../../../utils/responseCodes';
import { simpleAlerts } from '../../../../utils/alerts';
import CuentaService from "../../../../services/cuenta"
import AddCuenta from '../../../components/Cuentas/AddCuenta/AddCuenta';

const AddCuentas = (props) => {
    const { open2, handleClose, id_usuarioLogin, setOpenModalLoader, setTitleSpinner,
      infoCuenta,setInfoCuenta,getCuentas,servicios,dateInit,setDateInit,typeModal,setTypeModal} = props;

    const url = "'" + window.location.pathname + "'";
    const [system, setSystem] = useState('FilmFiesta');


    const cleanInfo = () => {
        return setInfoCuenta(null)
          
    };
    
    const saveCuenta = async () => {
        // Verificar que servicio_id no sea 0
        if (typeof infoCuenta?.servicio_id !== 'number' || infoCuenta?.servicio_id === 0) {
            simpleAlerts('Seleccione Producto', 'warning');
            return;
        }
    
        // Verificar que correo esté ingresado
        if (!infoCuenta?.correo?.trim() || infoCuenta?.correo?.trim() === '') {
            simpleAlerts('Debe ingresar Correo', 'warning');
            return;
        }
    
        // Verificar que password_cuenta esté ingresado
        if (!infoCuenta?.password_cuenta?.trim() || infoCuenta?.password_cuenta?.trim() === '') {
            simpleAlerts('Debe ingresar contraseña de cuenta', 'warning');
            return;
        }
    
        saveGeneral();
    };

    const saveGeneral = async () => {
       setOpenModalLoader(true);
        setTitleSpinner('Guardando ...');
        let data = {
            ...infoCuenta,
            cuenta_id: infoCuenta?.cuenta_id,
           
        };
        try {
            const result = await CuentaService.saveCuenta(url, data);
            if (result.status === CODES.CREATE_201) {
                simpleAlerts(result.data.message, 'success');
                getCuentas();
                handleClose();
            } else {
                simpleAlerts(result?.response?.data?.message, 'error');
                setOpenModalLoader(false);
                setTitleSpinner(null);
                return;
            }
        } catch (err) {
            console.log('Error en saveCuenta', err);
        }
       
        setOpenModalLoader(false);

   
    }



    return (
        <>
            <MainModal
                open={open2}
                handleClose={() => { handleClose(); cleanInfo() }}
                centrado={'centrado'}
                title={'Pestaña de cuenta'}
                bodyModal={
                    <>
                       
                        <AddCuenta
                            
                            system={system}
                            infoCuenta={infoCuenta}
                            setInfoCuenta={setInfoCuenta}
                            servicios={servicios}
                            dateInit={dateInit}
                            setDateInit={setDateInit}
                                                       
                        />
                    </>
                }
                buttonActions={[
                    <MainButton
                        key='btn-modal-user-save1'
                        title={'Guardar'}
                       
                        color={'primary'}
                        onClick={saveCuenta}
                    />
                ]}
            />
        </>
    );
};

export default AddCuentas;