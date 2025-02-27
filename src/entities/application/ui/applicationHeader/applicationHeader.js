import cls from "./applicationHeader.module.sass"
import classNames from "classnames";
import {NavLink} from "react-router-dom";



export const ApplicationHeader = ({active , setActive , data}) => {

    const renderList = () => {
        return data.map(item => (
           <NavLink to={item.name}>
               <li
                   onClick={() => {
                       setActive(item.name)
                   }}
                   className={classNames({
                       [cls.active]: active === item.name
                   })}>
                   {item.label}
               </li>
           </NavLink>
        ))
    }

    return (
        <ul className={cls.menu}>
            {renderList()}
        </ul>
    );
};

