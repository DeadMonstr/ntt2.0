import cls from "./homeNewsProfile.module.sass"
import {getHomeNewsProfileItem} from "entities/home/model/selector/homeNewsSelector";
import {useSelector} from "react-redux";
import profileImg from "shared/assets/images/profileImg.svg"
import {Button} from "shared/ui/button/button";
import {useNavigate} from "react-router";
import univerImg from "shared/assets/images/Ellipse 118.png"


export const HomeNewsProfile = () => {
    const data = useSelector(getHomeNewsProfileItem)

    const navigate = useNavigate()

    const renderData = () => {
        return data.map(item => (
            <div className={cls.profile__footer_container_box}>

                <div className={cls.profile__footer_container_box_header}>
                    <img src={univerImg} alt=""/>
                    <h2>{item.name}</h2>
                </div>
                <ul>
                    <li>Ta'lim tili <span>{item.lang}</span></li>
                    <li>Ta’lim shakli <span>{item.shift}</span></li>
                    <li>Talablar <span>{item.requirements}</span></li>
                    <li>Kontrakt to’lovi<span>{item.pay_sum}</span></li>
                </ul>

                <div className={cls.profile__footer_container_box_footer}>
                    <h2>
                        Yo'nalish haqida
                    </h2>
                    <p>{item.about}</p>
                </div>


            </div>
        ))
    }

    return (
        <div className={cls.profile}>
            <Button onClick={() => navigate(-1)}>Back</Button>
            <div className={cls.profile__container}>
                <div className={cls.profile__container_left}>
                    <div className={cls.profile__container_left_img}>
                        <img src={profileImg} alt=""/>
                    </div>
                    <div className={cls.profile__container_left_info}>
                        O’zbekistonda Oliy Ta’limni 7 tilda olish mumkin.
                    </div>
                </div>
                <div className={cls.profile__container_right}>
                    <div className={cls.profile__container_right_header}>
                        Ma’lumotlar
                    </div>
                    <div className={cls.profile__container_right_info}>
                        <ul>
                            <li>- Barcha ta’lim dasturlarining 80%i o‘zbek tilida beriladi;</li>
                            <li>- Rus tilida 13%;</li>
                            <li>- Boshqa tillarda 7%: jumladan, qozoq, turkman va qoraqalpoq tillarida.</li>
                        </ul>



                        <ul>
                            <li> Talabalar soni bo‘yicha qariyb 837 ming kishi o‘zbek tilida ta’lim olmoqda.</li>
                            <li>- 135 mingga yaqini rus tilini asosiy til sifatida tanlagan.</li>
                            <li>- 34 ming nafari qoraqalpoq tilini tanlagan.</li>
                        </ul>

                        <p>O‘tgan o‘quv yiliga nisbatan ushbu uch tildan birida tahsil olayotgan talabalar soni ko‘paydi.</p>

                        <p>Tojik, turkman yoki qirg‘iz tillarida o‘qishni xohlovchilar kamroq.</p>


                    </div>
                </div>
            </div>

            <div className={cls.profile__footer}>

                <div className={cls.profile__footer_title}>
                    E’lonlar
                </div>
                <div className={cls.profile__footer_container}>
                    {renderData()}
                </div>

            </div>
        </div>


    );
};

