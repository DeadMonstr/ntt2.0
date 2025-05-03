import React, {useEffect, useState} from 'react';

import cls from "./crudComponents.module.sass"
import classNames from "classnames";
import {Image, Text} from "entities/newsProfile";
import {set} from "react-hook-form";
import {API_URL, headers, useHttp} from "shared/api/base";
import {useSelector} from "react-redux";
import {getNewsProfileData} from "entities/newsProfile/model/selector/newsProfileSelector";


const types = [
    "text",
    "image"
]


export const CrudComponents = () => {

    const [activeChange, setActiveChange] = useState(false)
    const [components, setComponents] = useState([])
    const [canAdd, setCanAdd] = useState(true)
    const data = useSelector(getNewsProfileData)

    // //
    // useEffect(() => {
    //     setComponents(data.blocks)
    // } , [data.blocks])
    //
    // console.log(components)


    useEffect(() => {
        if (components.length && !components[components.length - 1].completed) {
            setCanAdd(false)
        } else {
            setCanAdd(true)
        }
    }, [components])


    const switchChange = () => {
        setActiveChange(state => !state)
    }



    const onCreateComponent = (type) => {

        let data

        switch (type) {
            case "text":

                data = {
                    index: components.length + 1,
                    desc_json: "",
                    completed: false,
                    type,
                }

                setComponents(state => [...state, data])

                break;
            case "image":

                data = {
                    index: components.length + 1,
                    img: "",
                    completed: false,
                    type,
                }

                setComponents(state => [...state, data])
                break;
        }
    }

    const renderComponents = () => {
        return components.map(item => {
            switch (item.type) {
                case `text`:
                    return <Text
                        component={item}
                        onDelete={onDeleteComponent}
                        onComplete={onCompleteComponent}
                        onEdit={onEditComplete}
                    />
                case `image`:
                    return <Image
                        component={item}
                        onDelete={onDeleteComponent}
                        onComplete={onCompleteComponent}
                        onEdit={onEditComplete}
                    />
            }
        })
    }

    const {request} = useHttp()

    const onDeleteComponent = (data) => {


        const {index} = data
        setComponents(components => components.filter(item => item.id !== index))

        request(`${API_URL}organizations/news_block/${index}/`, "DELETE", null, headers())
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })

    }

    const onCompleteComponent = (data) => {

        setComponents(components => components.map(item => {
            if (item.index === data.index) {
                return {
                    ...item,
                    ...data,
                    completed: true
                }
            }
            return item
        }))

    }

    const onEditComplete = (index) => {
        if (components.every(item => item.completed)) {
            setComponents(state => state.map((item, i) => {
                if (item.index === index) {
                    return {...item, completed: false}
                }
                return item
            }))
        }
    }


    return (
        <div className={cls.create}>



            {renderComponents()}

            {
                canAdd &&
                <>
                    <div className={cls.add} onClick={switchChange}>
                        {activeChange ? <i className={"fa fa-times"}></i> : <i className={"fa fa-plus"}></i>}

                    </div>


                    <div className={classNames(cls.addComponents, {[cls.active]: activeChange})}>
                        {types.map(item => {
                            return (
                                <div className={cls.addComponents__item} onClick={() => onCreateComponent(item)}>
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                </>
            }


        </div>
    );
};

