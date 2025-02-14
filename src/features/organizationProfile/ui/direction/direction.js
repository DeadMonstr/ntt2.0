import {Box} from "../../../../shared/ui/box/box";

import cls from "../organizationProfile.module.sass"
import {useNavigate} from "react-router";

export const Direction = () => {

    const navigate = useNavigate()

    return (
        <div className={cls.direction__main}>

            <Box extraClass={cls.direction}>
                <h2>Buxgalteriya hisobi va moliya</h2>
                <ul>
                    <li>Ta'lim tili <span>Ingliz tili</span></li>
                    <li>Ta'lim shakli <span>Kunduzgi / Sirtqi</span></li>
                    <li>Talablar <span>Kirish imtihoni</span></li>
                    <li>Kontrakt to'lovi <span>9 860 000 so'mdan boshlab</span></li>

                    <li onClick={() => navigate(`../directionProfile/1`)}  className={cls.direction__link}>Taxrirlash </li>
                </ul>
            </Box>
            <Box extraClass={cls.direction}>
                <h2>Buxgalteriya hisobi va moliya</h2>
                <ul>
                    <li>Ta'lim tili <span>Ingliz tili</span></li>
                    <li>Ta'lim shakli <span>Kunduzgi / Sirtqi</span></li>
                    <li>Talablar <span>Kirish imtihoni</span></li>
                    <li>Kontrakt to'lovi <span>9 860 000 so'mdan boshlab</span></li>

                    <li className={cls.direction__link}>Taxrirlash </li>
                </ul>
            </Box>

            <Box extraClass={cls.direction}>
                <h2>Buxgalteriya hisobi va moliya</h2>
                <ul>
                    <li>Ta'lim tili <span>Ingliz tili</span></li>
                    <li>Ta'lim shakli <span>Kunduzgi / Sirtqi</span></li>
                    <li>Talablar <span>Kirish imtihoni</span></li>
                    <li>Kontrakt to'lovi <span>9 860 000 so'mdan boshlab</span></li>

                    <li className={cls.direction__link}>Taxrirlash </li>
                </ul>
            </Box>

            <Box extraClass={cls.direction}>
                <h2>Buxgalteriya hisobi va moliya</h2>
                <ul>
                    <li>Ta'lim tili <span>Ingliz tili</span></li>
                    <li>Ta'lim shakli <span>Kunduzgi / Sirtqi</span></li>
                    <li>Talablar <span>Kirish imtihoni</span></li>
                    <li>Kontrakt to'lovi <span>9 860 000 so'mdan boshlab</span></li>

                    <li className={cls.direction__link}>Taxrirlash </li>
                </ul>
            </Box>

        </div>
    );
};

