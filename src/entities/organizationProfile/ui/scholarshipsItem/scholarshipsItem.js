import {memo, useCallback, useState} from 'react';
import {motion} from "framer-motion";
import classNames from "classnames";

import cls from "./scholarshipsItem.module.sass";
import {Input} from "../../../../shared/ui/input";

const text = "It is a long established fact that a reader will be distracted by " +
    "the readable content of a page when looking at its layout. lorem hello lorem" +
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. At autem corporis, debitis " +
    "delectus dolore dolorum earum, ex ipsam molestias nesciunt nulla quas quo quos ratione" +
    " repellendus reprehenderit suscipit tenetur velit?"

export const ScholarshipsItem = memo(({setActive, onDelete, item}) => {

    const [isMore, setIsMore] = useState(false)

    const onToggle = useCallback(() => setIsMore(!isMore), [isMore])

    return (
        <motion.div
            transition={{duration: 1}}
            className={cls.wrapper}
        >
            <div
                className={cls.item}
            >
                <div className={cls.item__header}>
                    <h3 className={cls.item__headerItem}>
                        1-Kurs
                        <span>(Kunduzgi)</span>
                    </h3>
                    <h3 className={cls.item__headerItem}>Matematika</h3>
                </div>
                <div className={cls.item__text}>
                    <div className={cls.item__wrapper}>
                        <h2 className={cls.item__user}>{item?.name_optional}</h2>
                        <p className={cls.item__info}>{item?.desc}</p>
                        {/*<p className={cls.item__info}>*/}
                        {/*    {*/}
                        {/*        isMore ? text : text.slice(0, 125) + "..."*/}
                        {/*    }*/}
                        {/*</p>*/}
                        <i
                            className={classNames(
                                `fas fa-arrow-${isMore ? "up" : "down"}`,
                                cls.item__icon
                            )}
                            onClick={onToggle}
                        />
                    </div>
                    <div className={cls.item__footer}>
                        <h3>Year: <span>2023-2024</span></h3>
                        <h3>Day: <span>2023-08-09</span></h3>
                    </div>
                    <div className={cls.item__footer}>
                        <h3>Ball: <span>100 Ball</span></h3>
                        <h3>Study year: <span>2023</span></h3>
                    </div>
                    <div className={cls.item__check}>
                        <Input
                            extraClass={cls.input}
                            type={"checkbox"}
                            checked={true}
                            disabled
                        />
                        <p>Grant</p>
                    </div>
                </div>
            </div>
            <div className={cls.wrapper__container}>
                <div className={cls.wrapper__edit}>
                    <div className={cls.wrapper__inner}>
                        <i
                            className={classNames(
                                "fas fa-pen",
                                cls.wrapper__icon
                            )}
                            onClick={setActive}
                        />
                    </div>
                </div>
                <div className={cls.wrapper__edit}>
                    <div className={cls.wrapper__inner}>
                        <i
                            className={classNames(
                                "fas fa-trash",
                                cls.wrapper__icon
                            )}
                            onClick={onDelete}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
})