import React from 'react';
import TextField from '@mui/material/TextField'

const MainInput = (props) => {
    const { title, readonly, placeholder, type, value, required, propsInput, name, onChange, style, styleTitle } = props;

    return (
        <div className='fieldset'>
            <legend className='title-legend' style={{ ...styleTitle ,paddingTop:'14px',color:'gray'}}>{title}</legend>
            <TextField
                className="text"
                fullWidth
                required={required || false}
                placeholder={placeholder || ''}
                size='small'
                type={type || 'text'}
                value={value || ''}
                onChange={onChange}
                name={name || ''}

                style={{ ...style, borderRadius: '10px' }}
                inputProps={{
                    ...propsInput,
                    style: {
                        fontSize: 12,  // font size of input text
                        backgroundColor: readonly ? '#F1EFEF' : 'white',
                        
                        borderRadius: '10px'
                    },
                    readOnly: (readonly || false),
                }}

                InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            />
        </div>
    );

    // return (
    //     <div className='group' style={{ width: width ? `${width}%` : '100%' }} >
    //         <div className="contenido">
    //             <label className="label">{title}</label>
    //             <TextField fullWidth
    //                 required={required || false}
    //                 className="input"
    //                 placeholder={placeholder || ''}
    //                 size='small'
    //                 type={type || 'text'}
    //                 value={value || ''}
    //                 onChange={onChange}

    //                 inputProps={{
    //                     ...propsInput,
    //                     style: {
    //                         fontSize: 12,  // font size of input text
    //                         backgroundColor: readonly ? '#F1EFEF' : 'white'
    //                     },
    //                     readOnly: (readonly || false),
    //                 }}

    //                 InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
    //                 name={name || ''}
    //             />
    //         </div>
    //     </div>
    // );
};

export default MainInput;