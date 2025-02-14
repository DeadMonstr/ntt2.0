import cls from "./box.module.sass"

export const Box = ({children , extraClass}) => {
    return (
        <div className={`${cls.box} ${extraClass}`}>
            {children}
        </div>
    );
};

