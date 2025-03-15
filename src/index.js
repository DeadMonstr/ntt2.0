import React from 'react';
import ReactDOM from 'react-dom/client';


import App from "./app/App";
import {StoreProvider} from "app/providers/storeProvider";

import "./app/styles/index.sass"
import {HelmetProvider} from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <StoreProvider>
                <App/>
            </StoreProvider>
        </HelmetProvider>
    </React.StrictMode>
);

