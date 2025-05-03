import React, {useEffect, useState} from 'react';
import {Image, Text} from "entities/newsProfile";
import cls from "features/newsProfile/ui/crudComponents/crudComponents.module.sass";



const types = [
    "text",
    "image"
]


export const ViewComponents = () => {
    const [components, setComponents] = useState([])


    useEffect(() => {


        // data = {
        //     index: components.length + 1,
        //     text: "",
        //     completed: false,
        //     type,
        // }




    },[])




    const renderComponents = () => {
        return components.map(item => {
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
    }




    return (
        <div className={cls.create}>

            {renderComponents()}
        </div>
    );
};

