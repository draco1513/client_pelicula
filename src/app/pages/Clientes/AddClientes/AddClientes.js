import React, { useEffect, useState } from 'react';
import MainModal from '../../../components/General/MainModal';
import MainButton from '../../../components/General/MainButton';
import { CODES } from '../../../../utils/responseCodes';
import { simpleAlerts } from '../../../../utils/alerts';
import AddServicio from '../../../components/Servicios/AddServicio/AddServicio';
import ClienteService from "../../../../services/cliente"
import AddCliente from '../../../components/Clientes/AddCliente/AddCliente';

const AddClientes = (props) => {
    const { open2, handleClose, id_usuarioLogin, setOpenModalLoader, setTitleSpinner,
      typeEdition,infoCliente,setInfoCliente,getClientes } = props;

    const url = "'" + window.location.pathname + "'";
    const [system, setSystem] = useState('FilmFiesta');


    const cleanInfo = () => {
        return setInfoCliente(null)
          
    };

    useEffect(() => {
        if (typeEdition === 1) { //crear perfil
           // setInfoProfile(newProfile);
        }
    }, [])

  const saveCliente = async () => {
        if (!infoCliente?.nombre?.trim() || infoCliente?.nombre?.trim() === '') {
            simpleAlerts('Debe ingresar nombre de Cliente', 'warning');
            return;
        }
        if (!infoCliente?.celular?.trim() || infoCliente?.celular?.trim() === '') {
            simpleAlerts('Debe ingresar numero de celular', 'warning');
            return;
        }
        if (!infoCliente?.correo?.trim() || infoCliente?.correo?.trim() === '') {
            simpleAlerts('Debe ingresar correo', 'warning');
            return;
        }
        saveGeneral();
    }

    const saveGeneral = async () => {
       setOpenModalLoader(true);
        setTitleSpinner('Guardando ...');
        let data = {
            ...infoCliente,
            cliente_id: infoCliente?.cliente_id,
           
        };
        try {
            const result = await ClienteService.saveCliente(url, data);
            if (result.status === CODES.CREATE_201) {
                simpleAlerts(result.data.message, 'success');
                getClientes();
                handleClose();
            } else {
                simpleAlerts(result?.response?.data?.message, 'error');
                setOpenModalLoader(false);
                setTitleSpinner(null);
                return;
            }
        } catch (err) {
            console.log('Error en saveCliente', err);
        }
       
        setOpenModalLoader(false);

   
    }



    return (
        <>
            <MainModal
                open={open2}
                handleClose={() => { handleClose(); cleanInfo() }}
                centrado={'centrado'}
                title={'Pestaña de cliente'}
                bodyModal={
                    <>
                       
                        <AddCliente
                            typeEdition={typeEdition}
                            system={system}
                            infoCliente={infoCliente}
                            setInfoCliente={setInfoCliente}
                            
                        />
                    </>
                }
                buttonActions={[
                    <MainButton
                        key='btn-modal-user-save1'
                        title={'Guardar'}
                      
                        color={'primary'}
                        onClick={saveCliente}
                    />
                ]}
            />
        </>
    );
};

export default AddClientes;