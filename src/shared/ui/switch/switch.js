import React from 'react'
import cls from './switch.module.sass'

export const Switch = ({ checked, onChange }) => {
    return (
        <label className={cls.switch}>
            <input
                type="checkbox"
                checked={checked}
                onChange={e => onChange(e.target.checked)}
                className={cls.input}
            />
            <span className={cls.slider}></span>
        </label>
    )
}
