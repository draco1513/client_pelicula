import React from 'react';

const MainInputInfo = (props) => {
    const { title, value, styleTitle, width } = props;

    return (
        <div className='main-input-info'> 
            <legend className='title-legend' style={{ ...styleTitle }}>{title}</legend>
            <label
                style={{
                    border: 'solid 1px #C4C4C4',
                    width: (width || '100%'),
                    backgroundColor: '#F1EFEF',
                    borderRadius: '4px',
                    fontSize: '12px',
                    height: '2.05rem',
                    paddingLeft: 9,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {value || 'Sin valor'}
            </label>
        </div>
    );
};

export default MainInputInfo;