import React, { useEffect } from "react";
import { CardHeader, CardContent, CardActions, } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { colors } from '../../../assets/colors';
import MainButton from "./MainButton";
import { Modal } from 'antd';

const MainModal = (props) => {
    const { open, handleOpen, handleClose, title, subTitle, bodyModal, buttonActions, formSubmit, size, centrado } = props;

    const handleModalOpen = () => {
        console.log('Modal abierto');
    };

    useEffect(() => {
        if (open)
            if (handleOpen)
                handleOpen();
    }, [open]);

    return (
        <Modal
            title={
                <CardHeader
                    avatar={
                        //<Avatar sx={{ bgcolor: colors.primary.hex, fontSize: 'xx-small' }} aria-label="recipe">
                            <LocalMoviesIcon />
                        //</Avatar>
                    }
                    title={title}
                    subheader={subTitle}
                    sx={{
                        paddingBottom: '0.3rem',
                        paddingTop: 0,
                        margin: '-0.5rem -1rem -0.1rem -1rem',
                        borderBottom: `solid 0.05rem ${colors.tertiary.hex}`,
                    }}
                />
            }
            open={open}
            onOk={handleClose}
            onCancel={handleClose}
            destroyOnClose={true}
            footer={null}
            maskClosable={false}// para evitar cerrar al hacer click fuera del modal

            style={{ top: (centrado ? '20%' : 50) }}
            width={(size === 'lg' ? 1000 : size === 'md' ? 800 : 1000)}
        >
            <form onSubmit={formSubmit} >
                <CardContent
                    sx={{
                        padding: 0,
                        margin: '0 -0.5rem',
                    }}
                >
                    {bodyModal}
                </CardContent>

                <CardActions
                    sx={{
                        //paddingBottom: '0.3rem',
                        //paddingTop: 0,
                        margin: '0.5rem -1rem -1rem -1rem',
                        borderTop: `solid 0.05rem ${colors.tertiary.hex}`,
                        display: 'flex',
                        justifyContent: 'center',
                      
                        
                    }}
                >
                    {buttonActions}
                    <MainButton
                        //key='btn-modal-cancel'
                        onClick={handleClose}
                        title={'Cerrar'}
                       
                        color={'secondary'}
                    />
                </CardActions>
            </form>
        </Modal >
    )
}

export default MainModal;