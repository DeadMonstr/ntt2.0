import cls from "./homePage.module.sass"
import checkIcon from "shared/assets/icons/iconCheck.svg"
import homeImg from "shared/assets/images/homeImg.svg"
import {Button} from "shared/ui/button/button";


export const HomePage = () => {
    return (
        <div className={cls.main}>

            <div className={cls.main__container}>

                <div className={cls.main__container_infos}>
                    <div className={cls.main__container_infos_title}>
                        <h2>Nodavlat Ta’lim</h2>
                        <span>Orzuyingizdagi <br/> OTMni toping.</span>
                    </div>

                    <ul className={cls.main__container_infos_list}>
                        <li><img src={checkIcon} alt=""/>OTM — bu oliy ta’lim beruvchi muassasa.</li>
                        <li><img src={checkIcon} alt=""/>OTM — bu kasbiy bilim va malaka beruvchi <br/>  o‘quv maskani.</li>
                    </ul>
                    <div className={cls.main__container_infos_contact}>
                        <Button extraClass={cls.main__container_infos_contact_btn}><i className="fa-solid fa-phone"/> Biz bilan bog'laning</Button>
                        <div className={cls.main__container_infos_contact_text}>
                            <h2>OTM yoki ta’lim yo’nalishlarini </h2>
                            <Button>Qidiring</Button>
                        </div>
                    </div>
                </div>
                <div className={cls.main__container_aside}>
                    <img src={homeImg} alt=""/>
                </div>

            </div>

        </div>
    );
};

