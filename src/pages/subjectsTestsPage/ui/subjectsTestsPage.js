import React, {useState} from 'react';


import cls from "./subjectsTestsPage.module.sass"
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

export const SubjectsTestsPage = () => {

    const [subjects,setSubjects] = useState([])
    const [search,setSearch] = useState("")
    const [selectedSubject,setSelectedSubject] = useState(null)


    const navigate = useNavigate()
    const onClickBtn = () => {
        navigate("../createTest")
    }


    return (
        <div className={cls.subjectsTests}>
            <div className={cls.header}>
                <div>
                    <Input
                        placeholder={"Qidiruv"}
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <Select options={subjects} onChangeOption={setSelectedSubject}/>
                </div>
                <div>
                    <Button onClick={onClickBtn}>Qo'shmoq</Button>
                </div>
            </div>

            <div className={cls.container}>
                <SubjectsTests search={search} selectedSubject={selectedSubject}/>
            </div>




        </div>
    );
};

