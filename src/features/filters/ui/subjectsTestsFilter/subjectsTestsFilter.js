import React from 'react';
import {Modal} from "shared/ui/modal";
import cls from './subjectsTestsFilter.module.sass'
import {Select} from "shared/ui/select";
export const SubjectsTestsFilter = ({setActive, active}) => {
    return (
        <Modal
            active={active}
            setActive={setActive}
            title={"Filter"}
            extraClass={cls.filterModal}
        >
            <Select title={"Soha"} extraClass={cls.filterModal__select}/>
            <Select title={"Fan"} extraClass={cls.filterModal__select}/>

        </Modal>
    );
};

