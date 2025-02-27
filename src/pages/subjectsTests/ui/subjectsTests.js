import React, {useState} from 'react';


import cls from "./subjectsTests.module.sass"
import {Button} from "shared/ui/button/button";
import {Select} from "shared/ui/select";
import {Input} from "shared/ui/input";
import {Modal} from "shared/ui/modal";

export const SubjectsTests = () => {



    const [activeAdd,setActiveAdd] = useState(false)
    const [subjects,setSubjects] = useState([])
    const [search,setSearch] = useState("")
    const [selectedSubject,setSelectedSubject] = useState(null)








    return (
        <div className={cls.subjectsTests}>

            <div className={cls.header}>
                <div>
                    <Input
                        placeholder={"Search"}
                        onChange={setSearch}
                        value={search}
                    />
                    <Select options={subjects} onChangeOption={setSelectedSubject}/>
                </div>
                <div>
                    <Button onClick={setActiveAdd}>Add</Button>
                </div>
            </div>

            <div className={cls.container}>

            </div>


            <Modal active={activeAdd} setActive={setActiveAdd}>

            </Modal>

        </div>
    );
};

