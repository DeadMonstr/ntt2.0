import React, {useEffect, useMemo} from 'react';
import {Table} from "shared/ui/table";
import {useDispatch, useSelector} from "react-redux";
import {fetchSubjectsTest} from "entities/subjectsTests/model/thunk/subjectsTestsThunk";
import {getSubjectsTests} from "entities/subjectsTests/model/selectors/subjectsTestsSelectors";
import {useNavigate} from "react-router";

export const SubjectsTests = ({selectedSubject,search}) => {

    const tests = useSelector(getSubjectsTests)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSubjectsTest())
    },[])


    const searchedTests = useMemo(() => {
        const filteredTests = tests.slice()
        return filteredTests.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) )
    }, [tests, search, selectedSubject]);


    const filterBySubject = useMemo(() => {
        const filteredTests = searchedTests.slice()
        return filteredTests.filter(item => item.subject === selectedSubject)
    }, [searchedTests, selectedSubject]);


    const navigate = useNavigate()

    const onClickTest = () => {
        navigate("../createTest")
    }

    return (
        <Table>
            <thead>
            <tr>
                <th>№</th>
                <th>Nomi</th>
                <th>Fan</th>
            </tr>
            </thead>
            <tbody>
            {
                filterBySubject.map((item,index) => {
                    return (
                        <tr onClick={onClickTest}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.subject}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </Table>
    );
};

