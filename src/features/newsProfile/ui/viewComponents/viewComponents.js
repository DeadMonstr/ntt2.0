import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text} from "entities/newsProfile";
import cls from "features/newsProfile/ui/crudComponents/crudComponents.module.sass";
import {useSelector} from "react-redux";
import {getNewsProfileData} from "entities/newsProfile/model/selector/newsProfileSelector";



const types = [
    "text",
    "image"
]


export const ViewComponents = () => {
    const [components, setComponents] = useState([])


    const data = useSelector(getNewsProfileData)


    useEffect(() => {
        if (data.blocks)

        setComponents(data.blocks)
    } , [data])



    // useEffect(() => {
    //
    //     let data
    //
    //     switch (types) {
    //         case "text":
    //
    //             data = {
    //                 index: components.length + 1,
    //                 text: "",
    //                 completed: false,
    //                 type : "text",
    //             }
    //
    //             setComponents(state => [...state, data])
    //
    //             break;
    //         case "image":
    //
    //             data = {
    //                 index: components.length + 1,
    //                 img: "",
    //                 completed: false,
    //                 type : "image",
    //             }
    //
    //             setComponents(state => [...state, data])
    //             break;
    //     }
    //
    //
    //
    // },[])


    const renderComponents = useCallback(() => {
        return components?.map(item => {
            switch (item.type) {
                case "text":
                    return <Text
                        isView={true}
                        component={item}

                    />
                case "image":
                    return <Image
                        component={item}
                        isView={true}
                    />
            }
        })
    },[components])




    return (
        <div className={cls.create}>
            {renderComponents()}
        </div>
    );
};

