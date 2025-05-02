import {memo, useCallback, useEffect, useState} from 'react';
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useDropzone} from "react-dropzone";

import {
    createUserData,
    deleteUserData,
    fetchOrganizationProfileAdmin,
    getOrganizationProfileError,
    getOrganizationProfileLoading, getOrganizationProfileUserData,
    OrganizationProfileInfo,
    updateData
} from "entities/organizationProfile";
import {getOrganizationProfileData} from "entities/organizationProfile";
import {Modal} from "shared/ui/modal";
import {Form} from "shared/ui/form";
import {Input} from "shared/ui/input";
import {Select} from "shared/ui/select";
import {Textarea} from "shared/ui/textArea";
import {API_URL, headers, headersImg, useHttp} from "shared/api/base";

import cls from "./organizationProfileInfoModal.module.sass";
import {fetchRegionsData, getRegions} from "entities/oftenUsed";
import {ConfirmModal} from "../../../../shared/ui/confirmModal";
import {useParams} from "react-router";
import {
    getOrganizationProfileUserImageData
} from "../../../../entities/organizationProfile/model/selector/organizationProfileSelector";
import {
    getOrganizationImage,
    updateAdminInfo
} from "../../../../entities/organizationProfile/model/slice/organizationProfileSlice";
import {fetchOrganizationTypesFilter} from "../../../organizationTypes/model/thunk/organizationTypesThunk";
import {organizationTypeFilter} from "../../../organizationTypes/model/selector/organizationTypesSelector";
import {onAddAlertOptions} from "features/alert/model/slice/alertSlice";
import {getOftenUsedDistrict} from "entities/oftenUsed/model/selector/oftenUsedSelector";
import {fetchRegionDistrict} from "entities/oftenUsed/model/thunk/oftenUsedThunk";

export const OrganizationProfileInfoModal = memo(({userRole}) => {

    const {id} = useParams()

    useEffect(() => {
        dispatch(fetchRegionsData())
        dispatch(fetchOrganizationProfileAdmin({id}))
        dispatch(fetchOrganizationTypesFilter())
    }, [id])

    const {
        register,
        handleSubmit
    } = useForm()
    const {request} = useHttp()
    const dispatch = useDispatch()
    const formData = new FormData()
    const data = useSelector(getOrganizationProfileData)
    const userProfile = useSelector(getOrganizationProfileUserData)
    const userProfileImage = useSelector(getOrganizationProfileUserImageData)
    const regionsData = useSelector(getRegions)
    const district = useSelector(getOftenUsedDistrict)

    const typesData = useSelector(organizationTypeFilter)
    const loading = useSelector(getOrganizationProfileLoading)
    const error = useSelector(getOrganizationProfileError)
    const [activeModal, setActiveModal] = useState(false)
    const [activeAddModal, setActiveAddModal] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [selectedDistrict, setSelectedDistrict] = useState(null)
    const [checkUsername, setCheckUserName] = useState(null)
    const [selectedType, setSelectedType] = useState(null)
    const [newImageFile, setNewImageFile] = useState(null)

    const {getInputProps, getRootProps} = useDropzone({
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles[0])
            setNewImageFile(acceptedFiles[0])
        }
    })

    useEffect(() => {
        if (activeAddModal || activeModal) {
            setNewImageFile(null)
        }
    }, [activeAddModal, activeModal])

    console.log(selectedRegion , "reg")

    useEffect(() => {
        if (selectedRegion) dispatch(fetchRegionDistrict(selectedRegion))
    } , [selectedRegion])

    const onActiveModal = useCallback(() => setActiveModal(true), [])

    const onSubmit = (data) => {
        formData.append("name", data?.name_organization)
        formData.append("phone", data?.phone)
        formData.append("email", data?.email)
        formData.append("address", data?.address)
        formData.append("website_link", data?.website_link)
        formData.append("youtube_link", data?.youtube_link)
        formData.append("telegram_link", data?.telegram_link)
        formData.append("instagram_link", data?.instagram_link)
        formData.append("facebook_link", data?.facebook_link)
        formData.append("desc", data?.desc)
        // formData.append("phone", data?.phone)
        formData.append("locations", JSON.stringify(data?.locations))
        if (newImageFile) formData.append("img", newImageFile)
        if (selectedRegion) formData.append("region", selectedRegion)
        if (selectedDistrict) formData.append("district", selectedDistrict)
        if (selectedType) formData.append("organization_type", selectedType)
        request(`${API_URL}organizations/organization/crud/update/${id}/`, "PATCH", formData, {})
            .then(res => {
                dispatch(updateData(res))
                console.log(res, "update")
                setActiveModal(false)
                dispatch(updateAdminInfo(res))
            })
            .catch(err => console.log(err))
        formData.delete("name")
        formData.delete("desc")
        formData.delete("locations")
        formData.delete("img")
        formData.delete("phone")
        formData.delete("email")
        formData.delete("address")
        formData.delete("website_link")
        formData.delete("youtube_link")
        formData.delete("telegram_link")
        formData.delete("instagram_link")
        formData.delete("facebook_link")
    }
    console.log(userProfile)

    const onCreate = (data) => {
        console.log(data)
        if (newImageFile) {
            formData.append("url", newImageFile)
            formData.append("type", "img")
            request(`${API_URL}organizations/organization_gallery/crud/create-file/`, "POST", formData, {})
                .then(res => {
                    dispatch(getOrganizationImage(res))
                    const createData = {
                        organization: +id,
                        user: {
                            file: res?.id,
                            name: data?.name,
                            username: data?.username,
                            surname: data?.surname,
                            phone_extra: data?.phone_extra
                        }
                    }

                    request(
                        `${API_URL}organizations/organization_user/crud/create/`,
                        "POST",
                        JSON.stringify(createData)
                        // formData,
                        // {}
                    )
                        .then(res => {
                            dispatch(createUserData(res))
                            dispatch(onAddAlertOptions({
                                status: true,
                                type: "success",
                                msg: "Admin qo'shildi"
                            }))
                            setActiveAddModal(false)
                        })
                        .catch(err => console.log(err))
                })
            formData.delete("url")
            formData.delete("type")
        } else {
            const createData = {
                organization: +id,
                user: {
                    name: data?.name,
                    username: data?.username,
                    surname: data?.surname,
                    phone_extra: data?.phone_extra
                }
            }
            request(
                `${API_URL}organizations/organization_user/crud/create/`,
                "POST",
                JSON.stringify(createData)
                // formData,
                // {}
            )
                .then(res => {
                    dispatch(createUserData(res))
                    setActiveAddModal(false)
                    dispatch(onAddAlertOptions({
                        status: true,
                        type: "success",
                        msg: "Admin qo'shildi"
                    }))
                })
                .catch(err => console.log(err))
        }
    }

    console.log(userProfileImage , "dasd")
    const onChange = (data) => {
        if (newImageFile) {
            formData.append("url", newImageFile)
            request(
                `${API_URL}organizations/organization_user/crud/update-file/${userProfile?.id}/`,
                "PATCH",
                formData,
                {}
            )
                .then(res => {
                    console.log(res)
                    dispatch(getOrganizationImage(res))
                    let obj;
                    if (data?.username !== userProfile?.user?.username) obj = {username: data?.username}
                    if (data?.phone_extra !== userProfile?.user?.phone_extra) obj = {...obj, phone_extra: data?.phone_extra}
                    if (data?.password === data?.confirm_password && data?.password?.length <= 8) {
                        const createData = {
                            user: {
                                file: res?.id,
                                name: data?.name,
                                surname: data?.surname,
                                password: data?.password,
                                ...obj
                            },
                            organization: id,
                            job: 1
                        }
                        request(
                            `${API_URL}organizations/organization_user/crud/update/${userProfile?.id}/`,
                            "PATCH",
                            JSON.stringify(createData)
                        )
                            .then(res => {
                                dispatch(createUserData(res))
                                setActiveAddModal(false)
                                dispatch(onAddAlertOptions({
                                    status: true,
                                    type: "success",
                                    msg: "Admin muvaffaqiyatli o'zgartirildi"
                                }))
                            })
                            .catch(err => console.log(err))
                    }
                })
            formData.delete("url")
        } else {
            let obj;
            if (data?.username !== userProfile?.user?.username) obj = {username: data?.username}
            if (data?.phone_extra !== userProfile?.user?.phone_extra) obj = {...obj, phone_extra: data?.phone_extra}
            if (data?.password === data?.confirm_password && data?.password?.length <= 8) {
                const res = {
                    user: {
                        name: data?.name,
                        surname: data?.surname,
                        password: data?.password,
                        ...obj
                    },
                    organization: id,
                    job: 1
                }
                request(
                    `${API_URL}organizations/organization_user/crud/update/${userProfile?.id}/`,
                    "PATCH",
                    JSON.stringify(res)
                )
                    .then(res => {
                        console.log(res)
                        dispatch(createUserData(res))
                        setActiveAddModal(false)
                        dispatch(onAddAlertOptions({
                            status: true,
                            type: "success",
                            msg: "Admin muvaffaqiyatli o'zgartirildi"
                        }))
                    })
                    .catch(err => console.log(err))
            }
        }
    }

    const onDelete = () => {
        request(
            `${API_URL}organizations/organization_user/crud/delete/${userProfile?.id}/`,
            "DELETE"
        )
            .then(res => {
                console.log(res)
                dispatch(onAddAlertOptions({
                    status: true,
                    type: "success",
                    msg: "Admin muvaffaqiyatli o'chirildi"
                }))
                dispatch(deleteUserData())
                setIsDelete(false)
            })
            .catch(err => console.log(err))

    }

    const onChangeUserName = (e) => {

        if (e.length >= 0) {
            request(`${API_URL}users/user/get/check-username/?username=${e}`, "GET", null, headers())
                .then(res => {
                    setCheckUserName(res.available)
                })
        } else {
            setCheckUserName(null)
        }
    }
    console.log(checkUsername)

    return (
        <>
            <OrganizationProfileInfo
                userRole={userRole}
                setActive={setActiveModal}
                isAdd={setActiveAddModal}
                isDel={setIsDelete}
            />
            <Modal
                active={activeModal}
                setActive={setActiveModal}
                extraClass={cls.info}
                title={"Ma’lumotni o’zgartirish"}
            >
                <div {...getRootProps()}
                     className={cls.info__imageArea}
                >
                    <input {...getInputProps()}/>
                    {
                        newImageFile
                            ? <img className={cls.info__image} src={URL.createObjectURL(newImageFile)} alt=""/>
                            : data?.img
                                ? <img className={cls.info__image} src={data?.img} alt=""/>
                                : <i className={classNames("fas fa-image", cls.info__imageIcon)}/>
                    }
                </div>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    extraClassname={cls.info__form}
                >
                    <Input
                        required
                        name={"name_organization"}
                        value={data?.name}
                        register={register}
                        extraClass={cls.info__input}
                        placeholder={"Name"}
                    />
                    <Select
                        defaultValue={data?.organization_type?.id}
                        onChangeOption={setSelectedType}
                        options={typesData}
                        extraClass={cls.info__input}
                        titleOption={"Organazation type"}
                    />
                    <Select
                        defaultValue={data?.region?.id}
                        onChangeOption={setSelectedRegion}
                        options={regionsData}
                        extraClass={cls.info__input}
                        titleOption={"Region"}
                    />
                    <Select
                        defaultValue={data?.district?.id}
                        onChangeOption={setSelectedDistrict}
                        options={district}
                        extraClass={cls.info__input}
                        titleOption={"District"}
                    />
                    <Input
                        // required
                        name={"locations"}
                        value={data?.locations}
                        register={register}
                        extraClass={cls.info__input}
                        placeholder={"Location"}
                    />
                    <Input
                        // required
                        name={"phone"}
                        value={data?.phone}
                        register={register}
                        extraClass={cls.info__input}
                        placeholder={"Telefon raqam"}
                    />
                    <Input
                        // required
                        name={"email"}
                        value={data?.email}
                        register={register}
                        extraClass={cls.info__input}
                        placeholder={"Email"}
                    />
                    <Input
                        // required
                        name={"address"}
                        value={data?.address}
                        register={register}
                        extraClass={cls.info__input}
                        placeholder={"Addres"}
                    />
                    <Input
                        // required
                        name={"website_link"}
                        value={data?.website_link}
                        register={register}
                        extraClass={cls.info__input}
                        placeholder={"Website Linki"}
                    />
                    <Input
                        // required
                        name={"youtube_link"}
                        value={data?.youtube_link}
                        register={register}
                        extraClass={cls.info__input}
                        placeholder={"Youtube Linki"}
                    />
                    <Input
                        // required
                        name={"telegram_link"}
                        value={data?.telegram_link}
                        register={register}
                        extraClass={cls.info__input}
                        placeholder={"Telegram Linki"}
                    />
                    <Input
                        // required
                        name={"instagram_link"}
                        value={data?.instagram_link}
                        register={register}
                        extraClass={cls.info__input}
                        placeholder={"Instagram Linki"}
                    />
                    <Input
                        // required
                        name={"facebook_link"}
                        value={data?.facebook_link}
                        register={register}
                        extraClass={cls.info__input}
                        placeholder={"Facebook Linki"}
                    />
                </Form>
            </Modal>
            <Modal
                active={activeAddModal}
                setActive={setActiveAddModal}
                extraClass={cls.addModal}
            >
                <h1 className={cls.addModal__title}>Ma’lumotni o’zgartirish</h1>
                <div className={cls.addModal__container}>
                    <div
                        className={classNames(cls.imageEdit, {
                            [cls.active]: newImageFile || data?.file?.url
                        })}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()}/>
                        {
                            newImageFile
                                ? <img
                                    className={cls.imageEdit__image}
                                    src={URL.createObjectURL(newImageFile)}
                                    alt=""
                                /> :
                                userProfileImage?.url
                                    ? <img
                                        className={cls.imageEdit__image}
                                        src={userProfileImage?.url}
                                        alt=""
                                    />
                                    : <i className={classNames("far fa-image", cls.imageEdit__icon)}/>
                        }
                    </div>
                    {
                        activeAddModal === "add" ?
                            <Form
                                extraClassname={cls.addModal__form}
                                onSubmit={handleSubmit(onCreate)}
                            >
                                <Input
                                    required
                                    register={register}
                                    name={"username"}
                                    placeholder={"Username"}
                                    extraClass={cls.addModal__input}
                                />
                                <Input
                                    required
                                    register={register}
                                    name={"name"}
                                    placeholder={"Name"}
                                    extraClass={cls.addModal__input}
                                />
                                <Input
                                    required
                                    register={register}
                                    name={"surname"}
                                    placeholder={"Surname"}
                                    extraClass={cls.addModal__input}
                                />
                                <Input
                                    required
                                    register={register}
                                    name={"phone_extra"}
                                    placeholder={"Phone"}
                                    extraClass={cls.addModal__input}
                                />
                            </Form> :
                            activeAddModal === "change" ?
                                <Form
                                    extraClassname={cls.addModal__form}
                                    onSubmit={handleSubmit(onChange)}
                                >
                                    <h3 style={{color: checkUsername ? checkUsername ? "green" : "red" : "black"}}>

                                        {checkUsername ? checkUsername ? "foydalanuvchi nomi bo'sh" : "foydalanuvchi nomi allaqachon mavjud" : "foydalanuvchi nomini kiriting"}
                                    </h3>

                                    <Input
                                        required
                                        value={userProfile?.user?.username}
                                        register={register}
                                        name={"username"}
                                        placeholder={"Username"}
                                        extraClass={cls.addModal__input}
                                        onChange={(e) => onChangeUserName(e.target.value)}
                                    />
                                    <Input
                                        required
                                        value={userProfile?.user?.name}
                                        register={register}
                                        name={"name"}
                                        placeholder={"Name"}
                                        extraClass={cls.addModal__input}
                                    />
                                    <Input
                                        required
                                        value={userProfile?.user?.surname}
                                        register={register}
                                        name={"surname"}
                                        placeholder={"Surname"}
                                        extraClass={cls.addModal__input}
                                    />
                                    <Input
                                        required
                                        value={userProfile?.user?.phone_extra}
                                        register={register}
                                        name={"phone_extra"}
                                        placeholder={"Phone"}
                                        extraClass={cls.addModal__input}
                                    />
                                    <Input
                                        type={"password"}
                                        placeholder={"Password"}
                                        name={"password"}
                                        register={register}
                                    />
                                    <Input
                                        type={"password"}
                                        placeholder={"Confirm password"}
                                        name={"confirm_password"}
                                        register={register}
                                    />
                                </Form> : null
                    }
                </div>
            </Modal>
            <ConfirmModal
                type={"danger"}
                setActive={setIsDelete}
                active={isDelete}
                onClick={onDelete}
            />
        </>
    );
})
