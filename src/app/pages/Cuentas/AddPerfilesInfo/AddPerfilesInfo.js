import React, { useEffect, useState } from 'react';
import MainModal from '../../../components/General/MainModal';
import MainButton from '../../../components/General/MainButton';
import AddPerfilesInfos from '../../../components/Cuentas/AddPerfilesInfos/AddPerfilesInfos';

const AddPerfilesInfo = (props) => {
    const { open2, handleClose,perfilesData,setPerfilesData} = props;
    
    const url = "'" + window.location.pathname + "'";
    const [system, setSystem] = useState('FilmFiesta');
    

    const cleanInfo = () => {
        //return setInfoCuenta(null)
          
    };
    

    return (
        <>
            <MainModal
                open={open2}
                handleClose={() => { handleClose(); cleanInfo() }}
                centrado={'centrado'}
                title={'Pestaña de Perfiles'}
                bodyModal={
                    <>
                       
                        <AddPerfilesInfos

                            perfilesData={perfilesData}
                            setPerfilesData={setPerfilesData}
                                                       
                        />
                    </>
                }
                buttonActions={[
                    <MainButton
                        key='btn-modal-user-save1'
                        title={'Guardar'}
                        typeStyle={'outlined'}
                        color={'primary'}
                        //onClick={savePerfil}
                    />
                ]}
            />
        </>
    );
};

export default AddPerfilesInfo;