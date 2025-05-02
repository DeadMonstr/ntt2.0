import React, {useEffect, useState} from 'react';

import cls from "./crudComponents.module.sass"
import classNames from "classnames";
import {Image, Text} from "entities/newsProfile";
import {set} from "react-hook-form";
import {useHttp} from "shared/api/base";


const types = [
    "text",
    "image"
]


export const CrudComponents = () => {

    const [activeChange, setActiveChange] = useState(false)
    const [components, setComponents] = useState([])
    const [canAdd, setCanAdd] = useState(true)


    useEffect(() => {
        if (components.length && !components[components.length - 1].completed) {
            setCanAdd(false)
        } else {
            setCanAdd(true)
        }
    },[components])


    const switchChange = () => {
        setActiveChange(state => !state)
    }

    console.log(components)
    const onCreateComponent = (type) => {

        let data

        switch (type) {
            case "text":

                data = {
                    index: components.length + 1,
                    text: "",
                    completed: false,
                    type,
                }

                setComponents(state => [...state, data])

                break;
            case "image":

                data = {
                    index: components.length + 1,
                    image: "",
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
                case "text":
                    return <Text

                        component={item}
                        onDelete={onDeleteComponent}
                        onComplete={onCompleteComponent}
                        onEdit={onEditComplete}
                    />
                case "image":
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
        setComponents(components => components.filter(item => item.index !== index))

        // request()

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

