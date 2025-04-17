import cls from "./settingsList.module.sass"
import {Modal} from "../../../../shared/ui/modal";
import {Form} from "../../../../shared/ui/form";
import {Input} from "../../../../shared/ui/input";
import {Textarea} from "../../../../shared/ui/textArea";
import {Button} from "../../../../shared/ui/button/button";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";

import {useEffect, useState} from "react";
import {onDeleteDegree, onDeleteDirection, onEditDegree, onEditDirection} from "../../../../entities/settings";
import {ConfirmModal} from "../../../../shared/ui/confirmModal";
import {API_URL, headers, useHttp} from "../../../../shared/api/base";


export const SettingsLists = ({data, activeFilter}) => {
    const [activeEdit, setActiveEdit] = useState(false)

    const [activeItem, setActiveItem] = useState(null)


    console.log(data,"dasdta")
    const renderData = () => {
        return data?.map((item,index) => (
            <div className={cls.box}>

                <div>
                    <h1 className={cls.index}>
                        {index+1}
                    </h1>

                    <div style={{display: 'flex' , flexDirection: 'column'}}>
                        <div className={cls.box__title}>
                            {item?.name}
                        </div>
                        <div className={cls.box__desc}>
                            {item?.desc}
                        </div>
                    </div>
                </div>


                <i className={`fa-regular fa-pen-to-square ${cls.pen}`} onClick={() => {
                    setActiveEdit(true)
                    setActiveItem(item)
                }}/>
            </div>
        ))
    }

    const render = renderData()
    return (
        <div className={cls.settings}>
            {render}
            <SettingsListEdit activeFilter={activeFilter} setActive={setActiveEdit} active={activeEdit}
                              activeItem={activeItem}/>
        </div>
    );
};


export const SettingsListEdit = ({active, setActive, activeItem, activeFilter}) => {
    const [activeConfirm, setActiveConfirm] = useState(false)


    const [name,setName] = useState("")
    const [desc,setDesc] = useState("")

    const {request} = useHttp()

    useEffect(() => {
        setName(activeItem?.name)
        setDesc(activeItem?.desc)
    }, [ activeItem])

    const dispatch = useDispatch()

    const onClick = () => {

        const data ={
            name,
            desc
        }
        setActive(false)
        if (activeFilter === 1) {
            request(`${API_URL}organization_fields/crud/update/${activeItem.id}/`, "PUT", JSON.stringify(data), headers())
                .then(res => {
                    dispatch(onEditDirection({id: activeItem.id, res}))
                })
        } else {
            request(`${API_URL}organization-degrees/organization-degree/crud/update/${activeItem.id}/`, "PUT", JSON.stringify(data), headers())
                .then(res => {
                    dispatch(onEditDegree({id: activeItem.id, data}))
                })
        }

        setDesc("")
        setName("")

    }


    const onDelete = () => {
        if (activeFilter === 1) {
            request(`${API_URL}organization_fields/crud/delete/${activeItem.id}/`, "DELETE", null, headers())
                .then(res => {
                    dispatch(onDeleteDirection(activeItem.id))
                })
        } else {
            request(`${API_URL}organization-degrees/organization-degree/crud/delete/${activeItem.id}/`, "DELETE", null, headers())
                .then(res => {
                    dispatch(onDeleteDegree(activeItem.id))
                })

        }
        setActiveConfirm(false)
        setActive(false)
    }
    return (
        <Modal setActive={setActive} active={active}>
            <h1>Edit {activeFilter === 1 ? "Direction" : "Degree"}</h1>


            <div >
                <Input value={name} onChange={(e) => setName(e.target.value)} extraClass={cls.filter__input} name={"name"} />
                <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} maxLength={140} name={"desc"} />

            </div>
            <div className={cls.filter__buttons}>
                <Button onClick={onClick} id={"formId"} extraClass={cls.filter__btn}>Edit</Button>
                <Button
                    onClick={() => setActiveConfirm(true)}
                    type={"danger"}
                    extraClass={cls.filter__btn}
                >
                    Delete
                </Button>
            </div>
            <ConfirmModal
                onClick={onDelete}
                active={activeConfirm}
                setActive={setActiveConfirm}
            />
        </Modal>
    )
}