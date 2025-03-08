import img from "shared/assets/images/Media.svg"
import img2 from "shared/assets/images/homeImg.svg"

import cls from "./onlineTestaEnter.module.sass"
import {Button} from "shared/ui/button/button";
import {useNavigate} from "react-router";

export const OnlineTestEnter = () => {
    const navigate = useNavigate()
    return (
        <div className={cls.main}>
            <div className={cls.main__container}>

                <div className={cls.main__container_box}>
                    <img src={img} alt=""/>

                    <div className={cls.main__container_box_title}>
                        Diagnostik test
                    </div>
                    <div className={cls.main__container_box_descr}>
                        30 ta test savoldan iborat blokli testlar Davlat imtihon standartlari asosida tuzilgan bo‘lib
                        mavzularning ketma-ketligi va savollarning qiyinchilik darajasi kirish imtihonlaridagi testlar
                        kabi tanlab olinadi.
                    </div>
                    <Button>Diagnostik test</Button>

                </div>
                <div className={cls.main__container_box}>
                    <img src={img2} alt=""/>

                    <div className={cls.main__container_box_title}>
                        Diagnostik test
                    </div>
                    <div className={cls.main__container_box_descr}>
                        30 ta test savoldan iborat blokli testlar Davlat imtihon standartlari asosida tuzilgan bo‘lib
                        mavzularning ketma-ketligi va savollarning qiyinchilik darajasi kirish imtihonlaridagi testlar
                        kabi tanlab olinadi.
                    </div>
                    <Button>Diagnostik test</Button>
                </div>
                <div className={cls.main__container_box}>
                    <img src={img2} alt=""/>

                    <div className={cls.main__container_box_title}>
                        Diagnostik test
                    </div>
                    <div className={cls.main__container_box_descr}>
                        30 ta test savoldan iborat blokli testlar Davlat imtihon standartlari asosida tuzilgan bo‘lib
                        mavzularning ketma-ketligi va savollarning qiyinchilik darajasi kirish imtihonlaridagi testlar
                        kabi tanlab olinadi.
                    </div>
                    <Button onClick={() => navigate(`onlineTestEnter`)}>Diagnostik test</Button>
                </div>
            </div>
        </div>
    );
};
