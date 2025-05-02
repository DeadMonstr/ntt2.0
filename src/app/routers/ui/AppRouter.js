import React, {Suspense, useState} from 'react';
import {createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";

import {Layout} from "app/layout";
import {routersConfig} from "../config/routersConfig";

import "app/styles/index.sass"
import {Login} from "pages/login";
import {RequireAuth} from "./RequireAuth";
import {Home} from "pages/homePage";


export const AppRouter = () => {


    const router = createBrowserRouter(
        createRoutesFromElements(
            <>


                <Route
                    key={"admin/*"}
                    path={"/login"}
                    element={<Login/>}
                />

                <Route
                    element={<RequireAuth/>}
                >
                    <Route
                        key={"admin/*"}
                        path={"admin/*"}
                        element={<Layout/>}
                    >
                        {
                            routersConfig.map(item => {
                                    return (
                                        <Route
                                            key={item.path}
                                            path={item.path}
                                            element={item.element}
                                        />
                                    )
                                }
                            )
                        }
                    </Route>
                </Route>


                <Route
                    key={"/login"}
                    index
                    element={<Navigate to={"/login"}/>}
                />

            </>
        )
    );

    return (

        <Suspense>
            <RouterProvider router={router}/>
        </Suspense>

    );
};
