import React, {memo, useState} from "react";
import classNames from "classnames";

import cls from "./input.module.sass";

export const Input = memo((
    {
        type,
        defaultValue,
        value,
        register,
        required,
        style,
        name,
        extraClass,
        placeholder,
        onChange,
        disabled,
        extraValues,
        checked,
        title
    }
) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <label style={style} className={cls.inputLabel} htmlFor={name}>
            {
                title ?
                    <div className={cls.info}>
                        <span className={cls.info__inner}>
                            {title}
                        </span>
                    </div>
                    : null
            }
            {
                register ? (
                    <div className={cls.field}>
                        <input
                            id={name}
                            className={classNames(cls.input, extraClass)}
                            type={showPassword ? "text" : type}
                            placeholder={placeholder}
                            disabled={disabled}
                            required={required}
                            {...register(name, {
                                checked: checked,
                                defaultValue: defaultValue,
                                value: value,
                                onChange: onChange,
                                ...extraValues
                            })}
                        />


                        {type === "password" && (
                            <div className={cls.eye} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <i className="fas fa-eye" />
                                ) : (
                                    <i className="fa fa-eye-slash" />
                                )}
                            </div>
                        )}
                        {type === "checkbox" && (
                            <p>{placeholder}</p>
                        )}
                    </div>
                ) : (
                    <div className={cls.field}>
                        <input
                            id={name}
                            className={classNames(cls.input, extraClass)}
                            type={showPassword ? "text" : type}
                            defaultValue={defaultValue}
                            value={value}

                            onChange={onChange}
                            placeholder={placeholder}
                            disabled={disabled}
                            checked={checked}
                            required={required}
                            {...extraValues}
                        />
                        {type === "password" && (
                            <div className={cls.eye} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? (
                                    <i className="fas fa-eye" />
                                ) : (
                                    <i className="fa fa-eye-slash" />
                                )}
                            </div>
                        )}
                        {type === "checkbox" && (
                            <p>{placeholder}</p>
                        )}
                    </div>
                )
            }
        </label>
    )
})
