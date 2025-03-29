
import { Outlet, Route, Routes} from "react-router";
import {Notification} from "features/notification";
import {NotificationItem} from "entities/notification";

export const NotificationPage = () => {
    return (
        <div style={{display: "flex" , gap: "3rem"}}>
            <div>
                <Notification/>
            </div>


            <Outlet/>

            <Routes>

                <Route path={`item/:id`} element={<NotificationItem/>}/>

            </Routes>
        </div>
    );
};

