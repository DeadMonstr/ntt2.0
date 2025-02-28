
import cls from "./confirmModal.module.sass"

import React from "react";
import {Modal} from "../modal";
import {Button} from "../button/button";

export const ConfirmModal = ({setActive, active, onClick, title= "Rostanham o'chirmoqchimisiz", text, type}) => {

    return (
        <Modal active={active} setActive={setActive}>
            <div className={cls.filter}>
                <div className={cls.deleteHead}>
                    {/*{renderImg()}*/}
                    <h2>{title}</h2>
                </div>
                {text ?
                    <div className={cls.deleteText}>
                        <span>{text}</span>
                    </div> : null
                }
                <div className={cls.deleteButtons}>
                    <Button extraClass={cls.deleteButton} type={type} children={"Xa"} onClick={onClick}/>
                    <Button extraClass={cls.cancelButton} type={type === "success" ? "danger" : null} children={"Yo'q"} onClick={() => setActive(!active)}/>
                </div>
            </div>
        </Modal>
    );
};

