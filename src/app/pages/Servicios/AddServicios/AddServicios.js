import React, { useEffect, useState } from 'react';
import MainModal from '../../../components/General/MainModal';
import MainButton from '../../../components/General/MainButton';
import { CODES } from '../../../../utils/responseCodes';
import { simpleAlerts } from '../../../../utils/alerts';
import AddServicio from '../../../components/Servicios/AddServicio/AddServicio';
import ServicioService from "../../../../services/servicio"

const AddServicios = (props) => {
    const { open2, handleClose, id_usuarioLogin, setOpenModalLoader, setTitleSpinner,
      typeEdition,infoServicio,setInfoServicio,getServicios } = props;

    const url = "'" + window.location.pathname + "'";
    const [system, setSystem] = useState('FilmFiesta');


    const cleanInfo = () => {
        return setInfoServicio(null)
          
    };

    useEffect(() => {
        if (typeEdition === 1) { //crear perfil
           // setInfoProfile(newProfile);
        }
    }, [])

  const saveServicio = async () => {
        if (!infoServicio?.descripcion?.trim() || infoServicio?.descripcion?.trim() === '') {
            simpleAlerts('Debe ingresar nombre de Servicio', 'warning');
            return;
        }
        if (typeof infoServicio?.numero_perfiles !== 'number' || infoServicio?.numero_perfiles <= 0) {
            simpleAlerts('Debe ingresar un número de Perfiles mayor que cero', 'warning');
            return;
        }
        if (!infoServicio?.producto_link?.trim() || infoServicio?.producto_link?.trim() === '') {
            simpleAlerts('Debe ingresar link del producto', 'warning');
            return;
        }
        saveGeneral();
    }

    const saveGeneral = async () => {
       setOpenModalLoader(true);
        setTitleSpinner('Guardando ...');
        let data = {
            ...infoServicio,
            servicio_id: infoServicio?.servicio_id,
           
        };
        try {
            const result = await ServicioService.saveServicio(url, data);
            if (result.status === CODES.CREATE_201) {
                simpleAlerts(result.data.message, 'success');
                getServicios();
                handleClose();
            } else {
                simpleAlerts(result?.response?.data?.message, 'error');
                setOpenModalLoader(false);
                setTitleSpinner(null);
                return;
            }
        } catch (err) {
            console.log('Error en saveServicio', err);
        }
       
        setOpenModalLoader(false);

   
    }



    return (
        <>
            <MainModal
           
                open={open2}
                handleClose={() => { handleClose(); cleanInfo() }}
                centrado={'centrado'}
                title={'Nuevo Servicio'}
                
                bodyModal={
                    <>
                       
                        <AddServicio
                            typeEdition={typeEdition}
                            system={system}
                            infoServicio={infoServicio}
                            setInfoServicio={setInfoServicio}
                            
                        />
                    </>
                }
                buttonActions={[
                    <MainButton
                        key='btn-modal-user-save1'
                        title={'Guardar'}
                        color={'primary'}
                        onClick={saveServicio}
                    />
                ]}
            />
        </>
    );
};

export default AddServicios;