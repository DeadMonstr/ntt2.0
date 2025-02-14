import React from "react";
import classNames from "classnames";

import cls from "./button.module.sass"


export const Button = React.memo(({id, children, onClick, type, disabled, status, extraClass, editPlus}) => {
    return (
        <button

            id={id}
            form={id}
            onClick={onClick}
            className={classNames(cls.btn, extraClass, cls[type], {
                [cls.simple]: type === "simple",
                [cls.simple__add]: type === "simple-add",
                [cls.success]: type === "success",
                [cls.danger]: type === "danger",
                [cls.warning]: type === "warning",
                [cls.disabled]: type === "disabled",
                [cls.star]: type === "star",
                [cls.login]: type === "login",
                [cls.filter]: type === "filter",
            })}
            // type={type === "submit" ? "submit" : "button"}
            type={type ?? "submit"}
            disabled={type === "disabled" ? disabled : disabled}
        >

            {children}
        </button>
    )
})