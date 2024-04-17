import React, { useEffect, useState } from 'react';
import MainModal from '../../../components/General/MainModal';
import MainButton from '../../../components/General/MainButton';
import { CODES } from '../../../../utils/responseCodes';
import { simpleAlerts } from '../../../../utils/alerts';
import CuentaService from "../../../../services/cuenta"
import PerfilService from "../../../../services/perfil"
import AddPerfil from '../../../components/Cuentas/AddPerfil/AddPerfil';

const AddPerfiles = (props) => {
    const { open2, handleClose, id_usuarioLogin, setOpenModalLoader, setTitleSpinner,
      infoCuenta,setInfoCuenta,getCuentas,servicios,dateInit,setDateInit, infoPerfil,setInfoPerfil,perfiles,clientes,getPerfiles,
      setClientes
      } = props;
    
    const url = "'" + window.location.pathname + "'";
    const [system, setSystem] = useState('FilmFiesta');
    

    const cleanInfo = () => {
        return setInfoCuenta(null)
          
    };
    
  const savePerfil = async () => {
    if (typeof infoPerfil?.cliente_id !== 'number' || infoPerfil?.cliente_id === 0) {
        simpleAlerts('Seleccione Cliente', 'warning');
        return;
    }

    // Verificar que pin tenga 4 dígitos numéricos
    const pinRegex = /^\d{4}$/;
    if (!pinRegex.test(infoPerfil?.pin)) {
        simpleAlerts('El PIN debe tener 4 dígitos numéricos', 'warning');
        return;
    }
       
        saveGeneral();
    }

    const saveGeneral = async () => {
       setOpenModalLoader(true);
        setTitleSpinner('Guardando ...');
        let data = {
            ...infoPerfil,
            cliente_id:infoPerfil?.cliente_id,
            cuenta_id: infoPerfil?.cuenta_id,
            dias:infoPerfil?.dias
           
        };
       

        try {
            const result = await PerfilService.savePerfilesCuenta(url, data);
            if (result.status === CODES.CREATE_201) {
                simpleAlerts(result.data.message, 'success');
                getCuentas();
                getPerfiles();
                handleClose();
            } else {
                simpleAlerts(result?.response?.data?.message, 'error');
                setOpenModalLoader(false);
                setTitleSpinner(null);
                return;
            }
        } catch (err) {
            console.log('Error en saveGeneral', err);
        }
       
        setOpenModalLoader(false);

   
    }



    return (
        <>
            <MainModal
                open={open2}
                handleClose={() => { handleClose(); cleanInfo() }}
                centrado={'centrado'}
                title={'Pestaña de Perfiles'}
                sx={{backgroundColor:'#1b222c'}}
                bodyModal={
                    <>
                       
                        <AddPerfil
                            
                            system={system}
                            infoCuenta={infoCuenta}
                            setInfoCuenta={setInfoCuenta}
                            servicios={servicios}
                            dateInit={dateInit}
                            setDateInit={setDateInit}
                            infoPerfil={infoPerfil}
                            setInfoPerfil={setInfoPerfil}
                            perfiles={perfiles}
                            clientes={clientes}
                            setClientes={setClientes} 
                                                       
                        />
                    </>
                }
                buttonActions={[
                    <MainButton
                        key='btn-modal-user-save1'
                        title={'Guardar'}
                      
                        color={'primary'}
                        onClick={savePerfil}
                    />
                ]}
            />
        </>
    );
};

export default AddPerfiles;