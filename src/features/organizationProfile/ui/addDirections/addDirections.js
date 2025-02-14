import {Box} from "../../../../shared/ui/box/box";
import {Input} from "../../../../shared/ui/input";

import cls from "../organizationProfile.module.sass"
import {Select} from "../../../../shared/ui/select";
import {Textarea} from "../../../../shared/ui/textArea";
import {useForm} from "react-hook-form";
import {Button} from "../../../../shared/ui/button/button";

export const AddDirections = () => {

    const {register, handleSubmit} = useForm()

    const onAdd = (data) => {
        console.log(data)
    }

    return (
        <div className={cls.addDirections}>

            <Box extraClass={cls.box}>
                <h2>
                    Name
                </h2>
                <Input name={"name"} register={register}/>
            </Box>

            <Box extraClass={cls.box}>
                <h2>
                    Ta’lim tili
                </h2>
                <Select/>
            </Box>

            <Box extraClass={cls.box}>
                <h2>
                    Ta’lim shakli </h2>
                <Select/>
            </Box>

            <Box extraClass={cls.box}>
                <h2>
                    Kontrakt to’lov
                </h2>
                <Textarea/>
            </Box>

            <Box extraClass={cls.box}>
                <h2>
                    Talablar
                </h2>
                <Select/>
            </Box>
            <Box extraClass={cls.button}>
                <Button onClick={handleSubmit(onAdd)}>Add</Button>
            </Box>
        </div>
    );
};

