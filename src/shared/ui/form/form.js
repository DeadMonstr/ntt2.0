import {memo} from 'react';
import classNames from "classnames";

import cls from "./form.module.sass"

export const Form = memo(({id, extraClassname, onSubmit, children, isChange = true, disabled}) => {
    return (
        <form
            id={id}
            className={classNames(cls.form, extraClassname)}
            onSubmit={onSubmit}
        >
            {children}

            {
                isChange &&
                <input
                    disabled={disabled}
                    value={"Tasdiqlash"}
                    className={classNames(cls.form__submit, {
                        [cls.active]: !disabled
                    })}
                    type="submit"
                />
            }

        </form>
    );
})