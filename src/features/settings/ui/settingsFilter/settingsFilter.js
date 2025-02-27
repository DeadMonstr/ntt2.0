import cls from "./settings.module.sass"
import {Modal} from "../../../../shared/ui/modal";
import {useState} from "react";
import {Form} from "../../../../shared/ui/form";
import {Input} from "../../../../shared/ui/input";
import {Textarea} from "../../../../shared/ui/textArea";
import {Button} from "../../../../shared/ui/button/button";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {onAddDegree, onAddDirection} from "../../../../entities/settings";
import {API_URL, headers, useHttp} from "../../../../shared/api/base";

export const SettingsFilter = ({activeFilter, filterItem, setActiveFilter, active}) => {

    const [activeAdd, setActiveAdd] = useState(false)


    const renderItem = () => {
        return filterItem.map(item => (
            <li className={activeFilter === item.id ? cls.active : ""} onClick={() => setActiveFilter(item.id)}>
                {item.name} {activeFilter === item.id && <i className={"fas fa-check"}/>}
            </li>
        ))
    }

    return (

        <div className={cls.filter}>
            <ul className={cls.filter__list}>
                {renderItem()}
            </ul>
            <div className={cls.filter__buttons}>
                <div onClick={() => setActiveAdd(true)} className={cls.filter__add}>
                    <i className={"fa fa-plus"}/>
                </div>
            </div>

            <AddDirection active={active} activeFilter={activeFilter} activeAdd={activeAdd} setActive={setActiveAdd}/>
        </div>

    );
};


export const AddDirection = ({active, setActive, activeFilter, activeAdd}) => {

    const {register, setValue, handleSubmit} = useForm()

    const {request} = useHttp()
    const dispatch = useDispatch()
    const onClick = (data) => {
        const res = {
            ...data,
            organization_type: active
        }
        if (activeFilter === 1) {
            request(`${API_URL}organization_fields/crud/create/`, "POST", JSON.stringify(res), headers())
                .then(res => {
                    dispatch(onAddDirection(res))

                })
        } else {
            request(`${API_URL}organization-degrees/organization-degree/crud/create/`, "POST", JSON.stringify(res), headers())
                .then(res => {
                    dispatch(onAddDegree(res))

                })
        }
        setValue("name", "")
        setValue("desc", "")
        setActive(false)
    }
    return (
        <Modal setActive={setActive} active={activeAdd}>
            <h1>Add {activeFilter === 1 ? "direction" : "degree"}</h1>


            <Form isChange={false}>
                <Input extraClass={cls.filter__input} name={"name"} register={register}/>
                <Textarea maxLength={140} name={"desc"} register={register}/>
                <Button onClick={handleSubmit(onClick)} extraClass={cls.filter__btn}>Add</Button>

            </Form>
        </Modal>
    );
}