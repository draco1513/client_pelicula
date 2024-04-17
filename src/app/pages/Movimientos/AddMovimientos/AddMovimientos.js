import React, { useEffect, useState } from 'react';
import MainModalMov from '../../../components/General/MainModalMov';
import MainButton from '../../../components/General/MainButton';
import AddMovimiento from '../../../components/Movimientos/AddMovimiento/AddMovimiento';
import MovimientoService from "../../../../services/movimiento";
import { CODES } from '../../../../utils/responseCodes';
import { simpleAlerts } from '../../../../utils/alerts';

const AddMovimientos = (props) => {
    const { open2, handleClose, id_usuarioLogin, setOpenModalLoader, setTitleSpinner,infoServicio,setInfoServicio,clientesCuenta,
        getMovimientos,infoclientesCuenta,setInfoclientesCuenta,clientesPerfilCuenta,setClientesPerfilCuenta,movimientosPagados,
        setMovimientosPagados,cuentasAll,setCuentasAll} = props;

    const url = "'" + window.location.pathname + "'";
    const [system, setSystem] = useState('FilmFiesta');
    
    
   
    const cleanInfo = () => {
        return setInfoclientesCuenta(null),setClientesPerfilCuenta(null)
          
    };

  

  const saveMovimiento = async () => {
       
        saveGeneral();
    }

    const saveGeneral = async () => {
       setOpenModalLoader(true);
        setTitleSpinner('Guardando ...');
        let data = {
            ...infoclientesCuenta,
        };
        try {
            const result = await MovimientoService.saveMovimiento(url, data);
            if (result.status === CODES.CREATE_201) {
                simpleAlerts(result.data.message, 'success');
                getMovimientos();
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
            <MainModalMov
                
                open={open2}
                handleClose={() => { handleClose(); cleanInfo() }}
                centrado={'centrado'}
                title={'Agregar movimiento'}
               
                bodyModal={
                    <>
                        <AddMovimiento
                            system={system}
                            infoServicio={infoServicio}
                            setInfoServicio={setInfoServicio}
                            clientesCuenta={clientesCuenta}
                            setClientesCuenta={clientesCuenta}
                            infoclientesCuenta={infoclientesCuenta}
                            setInfoclientesCuenta={setInfoclientesCuenta}
                            clientesPerfilCuenta={clientesPerfilCuenta}
                            setClientesPerfilCuenta={setClientesPerfilCuenta}
                            movimientosPagados={movimientosPagados}
                            setMovimientosPagados={setMovimientosPagados}
                            cuentasAll={cuentasAll}
                            setCuentasAll={setCuentasAll}

                        />
                    </>
                }
                buttonActions={[
                    <MainButton
                        key='btn-modal-user-save1'
                        title={'Guardar'}
                       
                        color={'primary'}
                        onClick={saveMovimiento}
                    />
                ]}
            />
        </>
    );
};

export default AddMovimientos;