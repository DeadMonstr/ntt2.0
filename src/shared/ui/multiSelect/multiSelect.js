import React from 'react';
import Select from "react-select";
import cls from "./multiSelect.module.sass"


export const MultiSelect = ({onChange, value, options, defaultValue, title, placeholder}) => {

    console.log(defaultValue, "defaultValue")

    return (
        <div className={cls.multiSelectWrapper}>
            {title && <h1>{title}</h1>}
            <Select
                defaultValue={defaultValue}
                isMulti
                onChange={onChange}
                value={value}
                options={options}
                className={cls.multiSelect}
                placeholder={placeholder ?? "Tanlang"}
                styles={{
                    placeholder: (base) => ({
                        ...base,
                        fontSize: '1.6rem',
                        color: "#000",
                        fontWeight: 400,
                    }),
                }}
            />
        </div>

    );
};

