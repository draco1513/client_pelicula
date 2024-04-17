import React, { } from 'react';
import { Select } from "antd";
const { Option } = Select;

const MainSelect = (props) => {
    const { mode, title, readonly, placeholder, width, size, options, value, name, onChange, required } = props;

    return (
        <div
            className='fieldset'
        >
            <legend className='title-legend'>{title}</legend>
            <Select
                mode={mode || "single"}
                disabled={readonly || false}
                className="select"
                size={size || 'middle'}
                placeholder={placeholder || 'Seleccionar'}
                optionFilterProp="children"
                showSearch
                name={name || ''}
                popupClassName='my-drop-down'
                value={value || 0}
                onChange={onChange}
                style={{ width: width || '100%' }}
                required={required || false}
            >
                <Option value={0}><em>Seleccionar</em></Option>
                {options?.map((opt, idx) => {
                    return (
                        // <Option key={opt?.value + idx} value={opt?.value}>
                        <Option key={opt?.value?.toString()+opt?.label?.replace(/\s+/g, '')} value={opt?.value}>
                            {/* <span style={{ fontStyle: 'italic', fontSize: '10px' }}>{opt?.value?.toString()}&nbsp;-&nbsp;</span> */}
                            {opt?.label}
                        </Option>
                    )
                })}
            </Select>
        </div>
    );
};

export default MainSelect;