import {Input} from "../../../shared/ui/input";
import cls from "./login.module.sass"
import {Button} from "../../../shared/ui/button/button";
import {Form} from "../../../shared/ui/form";
import {useForm} from "react-hook-form";
import {API_URL, useHttp} from "../../../shared/api/base";
import {useDispatch} from "react-redux";
import {getUserData} from "../model/loginSlice";
import {useNavigate} from "react-router";
import {onAddAlertOptions} from "../../../features/alert/model/slice/alertSlice";
import {Alert} from "../../../features/alert";

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
                if (res.status !== "False"){
                    navigate(`../admin`)
                }else {
                    dispatch(onAddAlertOptions({
                        status: true,
                        type: "error",
                        msg: res.detail
                    }))
                }

            })

    }

    return (
        <div className={cls.login}>
            <Alert/>
            <div className={cls.login__box}>
                <h1>Login</h1>
                <Form isChange={false} onSubmit={handleSubmit(onPost)}>


                    <Input required placeholder={"Enter your username"} register={register} name={"phone"}/>
                    <Input required placeholder={"Enter your password"} type={"password"} register={register} name={"password"}/>

                    <Button type={"submit"} extraClass={cls.login__button}>
                        Login
                    </Button>
                </Form>

            </div>
        </div>
    );
};

