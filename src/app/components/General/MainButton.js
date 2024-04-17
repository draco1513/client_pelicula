import React from "react";
import { Button } from '@mui/material';

const MainButton = (props) => {
    const { onClick, title, typeStyle, color, size, type, style, fullWidth } = props;
    return (
        <Button
            type={type || 'button'}
            size={size || 'small'}
            variant={typeStyle || 'contained'}
            color={color || 'primary'}
            fullWidth={fullWidth || false}
            sx={{
                ...style,
                margin: '0 1px',
                padding: '0.28rem 0.4rem',
                fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.75rem' }
            }}
            onClick={onClick}
        >
            {title}
        </Button>
    )
}

export default MainButton;