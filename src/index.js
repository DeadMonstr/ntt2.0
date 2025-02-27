import React from 'react';
import ReactDOM from 'react-dom/client';


import App from "./app/App";
import {StoreProvider} from "app/providers/storeProvider";

import "./app/styles/index.sass"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <StoreProvider>
            <App/>
        </StoreProvider>
    </React.StrictMode>
);

