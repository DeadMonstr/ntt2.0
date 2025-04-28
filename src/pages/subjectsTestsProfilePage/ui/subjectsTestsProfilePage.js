import React, {useState} from 'react';


import cls from "pages/subjectsTestsProfilePage/ui/subjectsTestsProfilePage.module.sass"
import {Button} from "shared/ui/button/button";
import {Select} from "shared/ui/select";
import {Input} from "shared/ui/input";
import {Modal} from "shared/ui/modal";
import {useForm} from "react-hook-form";
import {Form} from "shared/ui/form";
import {Table} from "shared/ui/table";
import {useHref, useNavigate} from "react-router";
import {headers, useHttp} from "shared/api/base";
import {SubjectsTests} from "entities/subjectsTests/ui/subjectsTests";
import {SubjectsTestsFilter} from "../../../features/filters/ui/subjectsTestsFilter/subjectsTestsFilter";
import {SubjectsTestsProfile} from "entities/subjectsTestsProfile/ui/subjectsTestsProfile";

export const SubjectsTestsProfilePage = () => {

    const [isSchoolFilter, setIsSchoolFilter] = useState(false)


    const navigate = useNavigate()
    const onClickBtn = () => {
        navigate("../createTest")
    }


    return (
        <div className={cls.subjectsTests}>
            <div className={cls.header}>
                <h1>Testlar</h1>
            </div>

            <div className={cls.container}>
                <SubjectsTestsProfile active={isSchoolFilter} setActive={setIsSchoolFilter}/>
                <SubjectsTestsFilter active={isSchoolFilter} setActive={setIsSchoolFilter}/>
            </div>




        </div>
    );
};

