
import {ApplicationList} from "entities/application";

import cls from "pages/applicationPage/ui/applicationPage/applicationPage.module.sass";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchApplicationData} from "pages/applicationPage/model/thunk/applicationThunk";
import {ApplicationFilters} from "../applicationFilters/applicationFilters";
import {
    applicationDegreeSelectors,
    applicationFieldSelectors,
    applicationLanguageSelectors, applicationRequestsSelectors,
    applicationSearchSelectors,
    applicationShiftSelectors,
    applicationTypeSelectors
} from "../../model/selectors/applicationSelectors";

export const ApplicationPage = () => {

    const dispatch = useDispatch()


    const requests = useSelector(applicationRequestsSelectors)


    const search = useSelector(applicationSearchSelectors)
    const type = useSelector(applicationTypeSelectors)
    const degree = useSelector(applicationDegreeSelectors)
    const field = useSelector(applicationFieldSelectors)
    const shift = useSelector(applicationShiftSelectors)
    const language = useSelector(applicationLanguageSelectors)


    useEffect(() => {
        const data = {
            type_id: type,
            degree_id: degree,
            field_id:field,
            shift_id: shift,
            language_id: language,
            search
        }

        dispatch(fetchApplicationData(data))
    },[type, degree, field, shift, language,search])





    return (
        <div className={cls.applicationPage}>
            <div className={cls.applicationPage__header}>
                <h1 className={cls.applicationPage__title}>Barcha arizalar</h1>
                <ApplicationFilters/>
            </div>
            <ApplicationList list={requests?.results || []}/>
        </div>
    )
}
