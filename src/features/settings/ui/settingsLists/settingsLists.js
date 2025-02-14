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

    const renderData = () => {
        return data?.map(item => (
            <div className={cls.box}>
                <div className={cls.box__title}>
                    {item?.name}
                    <i className={`fa fa-pen ${cls.pen}`} onClick={() => {
                        setActiveEdit(true)
                        setActiveItem(item)
                    }}/>
                </div>
                <div className={cls.box__desc}>
                    {item?.desc}
                </div>

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
    const {register, setValue, handleSubmit} = useForm()
    const [activeConfirm, setActiveConfirm] = useState(false)

    const {request} = useHttp()
    useEffect(() => {
        setValue('name', activeItem?.name)
        setValue('desc', activeItem?.desc)
    }, [active, activeItem])
    const dispatch = useDispatch()

    const onClick = (data) => {
        setValue("name", "")
        setValue("desc", "")
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
    }
    const onDelete = (data) => {
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


            <Form isChange={false}>
                <Input extraClass={cls.filter__input} name={"name"} register={register}/>
                <Textarea maxLength={140} name={"desc"} register={register}/>
                <div className={cls.filter__buttons}>
                    <Button onClick={handleSubmit(onClick)} extraClass={cls.filter__btn}>Edit</Button>
                    <Button
                        onClick={handleSubmit(() => setActiveConfirm(true))}
                        type={"danger"}
                        extraClass={cls.filter__btn}
                    >
                        Delete
                    </Button>
                </div>

            </Form>
            <ConfirmModal
                onClick={handleSubmit(onDelete)}
                active={activeConfirm}
                setActive={setActiveConfirm}
            />
        </Modal>
    )
}