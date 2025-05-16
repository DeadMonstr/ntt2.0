import classNames from "classnames";
import React, {useCallback, useEffect, useRef, useState} from 'react';


import cls from "./Popup.module.sass"
import {createPortal} from "react-dom";


const Popup = ({type = "auto", options, children, extraClass, defaultActive, onChange, trigger}) => {

    const [activeItem, setActiveItem] = useState(defaultActive || "")
    const [active, setActive] = useState(false)
    const popupModal = useRef()

    useEffect(() => {
        setActiveItem(defaultActive)
    }, [defaultActive])

    useEffect(() => {
        const toggleActiveFalse = (e) => {
            if (!popupModal.current.contains(e.target)) {
                setActive(false)
                document.body.style.pointerEvents = "auto"
            }
        }
        if (active) {
            document.addEventListener("click", toggleActiveFalse, true)
            return () => {
                document.removeEventListener("click", toggleActiveFalse, true)
            }
        }

    }, [active, popupModal])


    const renderOptions = useCallback(() => {
        return options?.map(item => {
            return <div
                key={item.title}
                className={classNames(cls.item, {
                    [cls.active]: +activeItem?.id === item.id
                })}
                onClick={() => {
                    setActiveItem(item)
                    onChange && onChange(item)
                    setActive(false)
                }}
            >
                {!!item.img && <img src={item.img} alt={item.title}/>}

                <h2>{item.title ? item.title  : item}</h2>
            </div>
        })
    }, [options, activeItem])

    const onToggle = useCallback(() => setActive(!active), [active])


    // if (type === "handmade") {
    //     return children
    // }

    return (
        <div
            ref={popupModal}
            className={classNames(cls.popup)}
        >
            <div onClick={onToggle}>
                {trigger}
            </div>
            <div
                className={classNames(cls.popup__content, extraClass, {
                    [cls.active]: active
                })}
            >
                {type === "handmade" ? children : renderOptions()}
            </div>
        </div>
    );
};

export default Popup;