import cls from "./applicationFilters.module.sass";
import {Input} from "shared/ui/input";
import {Select} from "shared/ui/select";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchApplicationFiltersData} from "pages/applicationPage/model/thunk/applicationThunk";
import {
    applicationDegreeSelectors,
    applicationDegreesSelectors,
    applicationFieldSelectors,
    applicationFieldsSelectors,
    applicationLanguageSelectors,
    applicationLanguagesSelectors,
    applicationRequestsSelectors, applicationSearchSelectors,
    applicationShiftSelectors,
    applicationShiftsSelectors,
    applicationTypeSelectors,
    applicationTypesSelectors
} from "pages/applicationPage/model/selectors/applicationSelectors";
import {
    setDegree,
    setField,
    setLanguage,
    setSearch,
    setShift,
    setType
} from "pages/applicationPage/model/slice/applicationSlice";
import {Button} from "shared/ui/button/button";
import {Modal} from "shared/ui/modal";


export const ApplicationFilters = () => {
    const [settings, setSettings] = useState(false)


    const types = useSelector(applicationTypesSelectors)
    const degrees = useSelector(applicationDegreesSelectors)
    const fields = useSelector(applicationFieldsSelectors)
    const shifts = useSelector(applicationShiftsSelectors)
    const languages = useSelector(applicationLanguagesSelectors)

    const type = useSelector(applicationTypeSelectors)
    const search = useSelector(applicationSearchSelectors)
    const degree = useSelector(applicationDegreeSelectors)
    const field = useSelector(applicationFieldSelectors)
    const shift = useSelector(applicationShiftSelectors)
    const language = useSelector(applicationLanguageSelectors)

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchApplicationFiltersData({id: type}))
    }, [type])


    const onChangeSearch = (e) => {
        dispatch(setSearch(e.target.value))
    }


    const onChangeType = (e) => {
        dispatch(setType(e))
    }

    const onChangeDegree = (e) => {
        dispatch(setDegree(e))
    }

    const onChangeField = (e) => {
        dispatch(setField(e))
    }

    const onChangeShift = (e) => {
        dispatch(setShift(e))
    }

    const onChangeLanguage = (e) => {
        dispatch(setLanguage(e))
    }


    return (
        <div className={cls.filter}>
            <Button extraClass={cls.filter__button} onClick={() => setSettings(true)}>Filter</Button>


            <Modal setActive={setSettings} active={settings}>

                <h1>Filter</h1>
                   <div className={cls.filter__select}>
                       <Select defaultValue={type} options={types} onChangeOption={onChangeType} titleOption={'Turi'}/>
                       <Select defaultValue={degree} options={degrees} onChangeOption={onChangeDegree}
                               titleOption={'Daraja'}/>
                       <Select defaultValue={field} options={fields} onChangeOption={onChangeField}
                               titleOption={'Yo’nalish'}/>
                       <Select defaultValue={shift} options={shifts} onChangeOption={onChangeShift}
                               titleOption={'Ta’lim turi'}/>
                       <Select defaultValue={language} options={languages} onChangeOption={onChangeLanguage}
                               titleOption={'Ta’lim tili'}/>
                   </div>


            </Modal>

        </div>
    )
}
