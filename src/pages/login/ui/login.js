import {Input} from "shared/ui/input";
import cls from "./login.module.sass"
import {Button} from "shared/ui/button/button";
import {Form} from "shared/ui/form";
import {useForm} from "react-hook-form";
import {API_URL, useHttp} from "shared/api/base";
import {useDispatch} from "react-redux";
import {getUserData} from "../model/loginSlice";
import {useNavigate} from "react-router";
import {onAddAlertOptions} from "features/alert/model/slice/alertSlice";
import {Alert} from "features/alert";
import logo from "shared/assets/logo/blue_logo.png"
import loginImg from "shared/assets/images/login.png"
import bg from "shared/assets/images/bg.svg"

export const Login = () => {

    const {register, handleSubmit} = useForm()

    const {request} = useHttp()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onPost = (data) => {
        console.log(data, "data")
        request(`${API_URL}token/`, "POST", JSON.stringify(data))
            .then(res => {
                dispatch(getUserData(res))
                if (res.status !== "False") {
                    navigate(`../admin`)
                } else {
                    dispatch(onAddAlertOptions({
                        status: true,
                        type: "error",
                        msg: res.detail
                    }))
                }

            })



    }

    return (
        <div className={cls.pcContainer}>
            <Alert/>
            <div className={cls.pcContainer__img}>
                <img src={loginImg} alt=""/>
                <img className={cls.pcContainer__img_posImg} src={bg} alt=""/>
            </div>

            <div style={{display: "flex", justifyContent: "center", width: "50%"}}>
                <div className={cls.pcContainer__content}>
                    <img src={logo} alt=""/>
                    <h1>Tizimga kirish!</h1>
                    <Form isChange={false}>
                        <Input style={{width: "50rem"}} extraClass={cls.pcContainer__content__form__input}
                               title={"Username"} register={register}
                               placeholder={"Username"} name={"phone"}/>
                        <Input style={{width: "50rem"}} extraClass={cls.pcContainer__content__form__input}
                               title={"Parol"} register={register}
                               placeholder={"Parol"} name={"password"} type={"password"}/>
                        <Button onClick={handleSubmit(onPost)}>Login</Button>

                    </Form>

                </div>
            </div>
        </div>
    );
};

