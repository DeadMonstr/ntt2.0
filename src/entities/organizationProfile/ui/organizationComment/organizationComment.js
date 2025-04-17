import {useDispatch, useSelector} from "react-redux";
import {
    getOrganizationProfileComment,
    getOrganizationProfileUserData
} from "entities/organizationProfile/model/selector/organizationProfileSelector";
import cls from "./comment.module.sass"

import avatar from "shared/assets/icons/avatar.svg"
import {Button} from "shared/ui/button/button";
import {Modal} from "shared/ui/modal";
import {useState} from "react";
import {Form} from "shared/ui/form";
import {Textarea} from "shared/ui/textArea";
import {useForm} from "react-hook-form";
import {onAddComment} from "entities/organizationProfile/model/slice/organizationProfileSlice";
import {API_URL, headers, useHttp} from "shared/api/base";
import {getUserData} from "entities/userProfile/model/userProfileSelector";
import {useParams} from "react-router";

export const OrganizationComment = () => {
    const data = useSelector(getOrganizationProfileComment)


    const [active, setActive] = useState(false)

    console.log(data)
    const renderData = () => {
        return data.map(item => (
            <div className={cls.comment__box}>
                <div className={cls.comment__box_header}>
                    <div style={{ display: 'flex', gap: '4px' , alignItems: "center" }}>
                        {/*<img src={avatar} alt=""/>*/}
                        <h3>{item.name}</h3>
                        <h3>{item.surname}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <span
                                key={index}
                                style={{
                                    fontSize: '20px',
                                    color: index < item.rating ? 'gold' : '#e0e0e0',
                                }}
                            >
          ★
        </span>
                        ))}
                    </div>
                </div>
                <div className={cls.comment__box_text}>
                    {item.comment}
                </div>
                <div className={cls.comment__box_date}>
                    {item.date}
                </div>
            </div>
        ))
    }
    return (
        <div className={cls.comment}>
            {renderData()}
            {/*<Button onClick={() => setActive(true)} extraClass={cls.comment__add}>Izoh kiritish</Button>*/}

            <AddComment  setActive={setActive} active={active}/>
        </div>
    );
};

const AddComment = ({active, setActive }) => {

    const {register, handleSubmit , setValue} = useForm()


    const dispatch = useDispatch()
    const [rating, setRating] = useState(0);
    const handleStarClick = (index: number) => {
        setRating(index + 1);
    };
    console.log(rating)

    const {request} = useHttp()
    const dataUser = useSelector(getUserData)
    console.log(dataUser , "log")

    const {id} = useParams()
    const onAdd = (data) => {
        const res = {
            ...data,
            rating: rating,
            user: dataUser.id,
            organization: id
        }


        request(`${API_URL}comments/create/` , "POST", JSON.stringify(res) , headers())
            .then(res => {
                setValue("comment" , "")
                setRating(0)
                dispatch(onAddComment(res.comment))
                setActive(false)
            })
            .catch(err => {
                console.log(err)
            })


    }

    return (
        <Modal extraClass={cls.modal} active={active} setActive={setActive}>
            <h2>Komment</h2>

            <Form onSubmit={handleSubmit(onAdd)} extraClassname={cls.form}>
                <Textarea register={register} name={"comment"}/>

                <div className={cls.modal__star}>
                    <h2>Reyting</h2>
                    <div>
                        {Array.from({length: 5}).map((_, index) => (
                            <span
                                key={index}
                                onClick={() => handleStarClick(index)}
                                style={{
                                    fontSize: '30px',
                                    cursor: 'pointer',
                                    color: index < rating ? 'gold' : 'white',
                                    transition: 'color 0.2s',
                                }}
                            >
          ★
        </span>
                        ))}
                    </div>
                </div>
            </Form>
        </Modal>
    )
}
