import React from 'react';
import './spinner.scss'
import { Box, Modal } from '@mui/material';

const SpinnerLoader = (props) => {
    const { open, title } = props;
    return (
        // <span className="loader"></span>
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="modal-loader-container">
                <div className="modal-loader-title">
                    <div className="modal-loader-icon-container">
                        <span className="loader"></span>
                    </div>
                    {title &&
                        <h5 className='title-spinner'>{title?.charAt(0)?.toUpperCase() + title?.slice(1)?.toLowerCase()}</h5>
                    }
                </div>
            </Box>
        </Modal>
    );
};

export default SpinnerLoader;