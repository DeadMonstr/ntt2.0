import cls from "./dashboard.module.sass"

export const Dashboard = ({data}) => {

    const formatNumber = (number) => {
        return Number(number).toLocaleString();
    };
    const renderTable = () => {
        const mappedData = data?.map(item => {
            const key = Object.keys(item)[0];
            console.log(item[key], "key")
            return {
                text: item[key].text,
                count: item[key].count,
                color: item[key].color
            };
        });

        return mappedData?.map(item => (
            <div className={cls.box}>
                <h2>{item.text}</h2>
                <span>Barcha yo’nalishlar bo’yichar</span>
                <div style={{color: item.color}} className={cls.div}>
                    {formatNumber(item.count)}
                </div>
            </div>
        ))
    }

    return (
        <div className={cls.dashboard}>

            <h1>Dashboard</h1>
            <div className={cls.wrapper}>
                {renderTable()}

            </div>
        </div>
    );
};

