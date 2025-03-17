import  React, {useRef, useState, useEffect} from 'react';
import cls from "./organizationTypesFilter.module.sass";
import {Button} from "shared/ui/button/button";
import mapIcon from 'shared/assets/icons/map.png'
import {motion} from "framer-motion";
import asset from 'shared/assets/images/SAT.png'
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "../../../../shared/ui/input";
import {useDispatch, useSelector} from "react-redux";
import {organizationTypeCard, organizationTypeFilter} from "../../model/selector/organizationTypesSelector";
import {useForm} from "react-hook-form";
import {addOrganization, onDeleteOrganization, onEditOrganization} from "../../model/slice/organizationTypesSlice";
import {fetchOrganizationTypesCards, fetchOrganizationTypesFilter} from "../../model/thunk/organizationTypesThunk";
import {fetchRegionsData, getRegions} from "../../../../entities/oftenUsed";
import {API_URL, headers, useHttp} from "../../../../shared/api/base";
import {Select} from "../../../../shared/ui/select";
import {ConfirmModal} from "../../../../shared/ui/confirmModal";
import {Textarea} from "../../../../shared/ui/textArea";
import {useNavigate} from "react-router";
import logo from "shared/assets/logo/logo.png"
import {onAddAlertOptions} from "features/alert/model/slice/alertSlice";

export const OrganizationTypesFilter = ({setSelectRegion, selectRegion,setSelectType, selectType}) => {

    const filter = useSelector(organizationTypeFilter)
    const cards = useSelector(organizationTypeCard)
    const region = useSelector(getRegions)
    const [active, setActive] = useState(filter[0]?.id)
    const [portal, setPortal] = useState(false)
    const [activeConfirm, setActiveConfirm] = useState(false)
    const [changeRegion, setChangeRegion] = useState(false)

    useEffect(() => {
        if (region) setChangeRegion(region[0].id)
    } , [region])
    const [changeType, setChangeType] = useState(false)


    const navigate = useNavigate()


    // useEffect(() => {
    //     if (filter && Object.keys(filter).length) {
    //         setActive(filter[0].id)
    //     }
    // }, [filter])


    const [activeItem, setActiveItem] = useState(null)

    const [activeEdit, setActiveEdit] = useState(false)

    const dispatch = useDispatch()
    const {register, handleSubmit, setValue} = useForm()

    const {request} = useHttp()

    useEffect(() => {
        setValue("name", activeItem?.name)
        setValue("request", activeItem?.request)
        setValue("phone", activeItem?.phone)
        setChangeRegion(activeItem?.region.id)
        setChangeType(activeItem?.organization_type.id)
    }, [activeItem])


    useEffect(() => {
        dispatch(fetchOrganizationTypesFilter())
        dispatch(fetchRegionsData())
    }, [])

    // useEffect(() => {
    //     if (selectType || selectRegion) {
    //         dispatch(fetchOrganizationTypesCards({id: selectType, region: selectRegion}))
    //     }
    // }, [selectType, selectRegion])



    // const renderItem = () => {
    //     return filter?.map(item => (
    //         <Button
    //             extraClass={active === item.id ? cls.active : cls.mainBox__extraBox__typeBox__handlerBox}
    //             onClick={() => {
    //                 setCategory(item?.category)
    //                 setActive(item?.id)
    //             }}
    //         >
    //             <span className={cls.mainBox__extraBox__typeBox__handlerBox__contentBox}>
    //                         <h1>{item?.name}</h1>
    //                         <h3>{item?.descr}</h3>
    //                     </span>
    //
    //         </Button>
    //     ))
    // }


    const onCreate = (data) => {
        const res = {
            ...data,
            region: changeRegion,
            organization_type: selectType
        }
        request(`${API_URL}organizations/organization/crud/create/`, "POST", JSON.stringify(res), headers())
            .then(res => {
                dispatch(addOrganization(res))
                setPortal(false)
                dispatch(onAddAlertOptions({
                    type: "success",
                    status: true,
                    msg: "Tashkilot qo'shildi"
                }))
            })

    }
    const onDelete = (data) => {

        request(`${API_URL}organizations/organization/crud/delete/${activeItem.id}/`, "PATCH", JSON.stringify({deleted: true}), headers())
            .then(res => {
                dispatch(onDeleteOrganization(activeItem.id))
                setActiveConfirm(false)
                setActiveEdit(false)
            })

    }

    const onEdit = (data) => {
        const res = {
            ...data,
            region: changeRegion,
            organization_type: changeType
        }

        console.log(res)
        request(`${API_URL}organizations/organization/crud/update/${activeItem.id}/`, "PUT", JSON.stringify(res), headers())
            .then(res => {
                dispatch(onEditOrganization({id: activeItem.id, data: res}))
                setActiveEdit(false)
            })


    }


    return (
        <div className={cls.box}>

            <div className={cls.box__buttonPanel}>
                <h1>Tashkilotlar</h1>
                <div className={cls.box__buttonPanel__container}>
                    <div className={cls.box__buttonPanel__wrapper}>
                        <Select defaultValue={selectType} title={"Tashkilot turlari"} onChangeOption={setSelectType} options={filter}/>
                        <Select defaultValue={selectRegion} title={"Location"} onChangeOption={setSelectRegion} options={region}/>

                    </div>
                    <Button onClick={() => setPortal(!portal)} extraClass={cls.box__buttonPanel__container__btn}>
                        <i className={"fa fa-plus"}/>
                        Yangi taskilot qo'shish

                    </Button>

                </div>
            </div>
            <div className={cls.box__container}>
                {cards?.results?.map(card => (
                <div
                    onClick={() => navigate(`../organizationProfile/${card.id}`)}
                    className={cls.box__item}
                    // key={card.id}
                >
                    <div className={cls.box__item_header}>
                        <div


                            className={cls.box__item_logo}>
                            <div className={cls.box__item_logo_img}>
                                <img
                                    src={card?.img?.length ? card.img : logo}
                                    alt=""
                                />
                            </div>
                            <h2>{card.name.substring(0 , 14)}</h2>
                            <div className={cls.popupName}>
                                {card.name}
                            </div>
                        </div>
                        <div className={cls.box__item_request}>
                            <div className={cls.box__item_request_number}>
                                {`${card.request_count}`.substring(0, 4)}
                                <div className={cls.popup}>
                                    {card.request_count}
                                </div>
                            </div>
                            <h2>Arizalar Soni</h2>
                        </div>
                    </div>

                    <div className={cls.box__item_body}>
                        <div className={cls.box__item_body_info}>
                            <h2>Location</h2>
                            <span>{card.region.name}</span>
                        </div>
                        <div className={cls.box__item_body_info}>
                            <h2>Phone</h2>
                            <span>{card.phone}</span>
                        </div>
                        <div className={cls.box__item_body_info}>
                            <h2>INN</h2>
                            <span>{card.inn}</span>
                        </div>
                    </div>

                </div>
                ))}
            </div>
            <Modal extraClass={cls.box__portal} active={portal} setActive={setPortal}>
                <h1>Add</h1>
                <Form onSubmit={handleSubmit(onCreate)} extraClassname={cls.box__portal__form} isChange={false}>
                    <Input register={register} name={"name"} extraClass={cls.box__portal__form__input}
                           placeholder={"Name"} />
                    <Select options={region} extraClass={cls.select} onChangeOption={setChangeRegion} defaultValue={changeRegion}/>
                    <Input register={register} name={"phone"} type={"number"} extraClass={cls.box__portal__form__input}
                           placeholder={"Phone"}/>
                    {/*<Select options={filter} extraClass={cls.select} onChangeOption={setChangeType}/>*/}

                    <Input name={"inn"} register={register} placeholder={`INN`} extraClass={cls.box__portal__form__input}/>

                    <Button extraClass={cls.box__portal__form__btn}>Add</Button>
                </Form>
            </Modal>

            <Modal extraClass={cls.box__portal} active={activeEdit} setActive={setActiveEdit}>
                <h1>Add</h1>
                <Form extraClassname={cls.box__portal__form} isChange={false}>
                    <Input register={register} name={"name"} extraClass={cls.box__portal__form__input}
                           placeholder={"Name"} />
                    <Select options={region} extraClass={cls.select} onChangeOption={setChangeRegion} defaultValue={changeRegion}/>
                    <Input register={register} name={"phone"} type={"number"} extraClass={cls.box__portal__form__input}
                           placeholder={"Phone"}/>
                    {/*<Select options={filter} extraClass={cls.select} onChangeOption={setChangeType}/>*/}

                    <Input extraClass={cls.box__portal__form__input} placeholder={`Arizalar soni`}/>
                    <Input placeholder={`INN`} extraClass={cls.box__portal__form__input}/>

                    <div style={{display: "flex", gap: "1rem"}}>
                        <Button onClick={handleSubmit(onEdit)} extraClass={cls.box__portal__form__btn}>Edit</Button>
                        <Button type={"danger"} onClick={handleSubmit(() => setActiveConfirm(true))}
                                extraClass={cls.box__portal__form__btn}>Delete</Button>
                    </div>
                </Form>
            </Modal>

            <ConfirmModal
                onClick={onDelete}
                setActive={setActiveConfirm}
                active={activeConfirm}
            />

        </div>
    );
};

// <i onClick={() => {*/}
//     {/*    // setActiveEdit(true)*/}
//     {/*    // // setActiveItem(card)*/}
//     {/*}} className={"fa fa-pen"}/>