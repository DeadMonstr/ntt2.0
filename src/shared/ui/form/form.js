import {memo} from 'react';
import classNames from "classnames";

import cls from "./form.module.sass"

export const Form = memo(({id, extraClassname, onSubmit, children, isChange = true, disabled , value = "Tasdiqlash"}) => {
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
                    value={value}
                    className={classNames(cls.form__submit, {
                        [cls.active]: !disabled
                    })}
                    type="submit"
                />
            }

        </form>
    );
})