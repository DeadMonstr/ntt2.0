import {memo} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import cls from "./modal.module.sass";
import close from "shared/assets/icons/cross.svg";

export const Modal = memo(({children, active, setActive, extraClass,type="simple" , typeIcon,title}) => {

    const onClick = (target) => {
        if (target && typeof target.className === 'string') {
            if (target.className.includes('outClose') || target.className.includes('innerClose')) {
                setActive(false);
            }
        }
    };

    if (active) {

        if (type === "simple") {
            return (


                createPortal(
                    <div
                        className={classNames(cls.modal, "outClose")}
                        onClick={(e) => onClick(e.target)}
                    >
                        <div className={classNames(cls.modal__inner, extraClass)}>
                            <h1>{title}</h1>

                            {!typeIcon ?
                            <img
                                className={classNames(cls.modal__close, "innerClose")}
                                onClick={(e) => onClick(e.target)}
                                src={close}
                                alt=""
                            /> : null }
                            {children}
                        </div>
                    </div>
                    ,
                    document.body
                )
            );
        }



        return (
            createPortal(
                <div
                    className={classNames(cls.modal, "outClose")}
                    onClick={(e) => onClick(e.target)}
                >
                    {children}
                </div>,
                document.body
            )
        );
    }
    return null;
})