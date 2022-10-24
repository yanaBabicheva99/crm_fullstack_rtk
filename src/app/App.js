import React from 'react';

import {useRoutes} from "./routes";
import './style/index.module.scss';
import {ProductsProvider} from "./hooks/useProducts";
import {ModalProvider} from "./hooks/useModal";
import UserProvider from "./hooks/useUser";
import useAuth from "./hooks/useAuth";
import {AuthContext} from "./context/AuthContext";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const {token, login, logout, userId, signUp, signIn} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);
    return (
        <div className="App">
            <ModalProvider>
                <AuthContext.Provider value={{
                    token, login, logout, userId, signUp, signIn, isAuthenticated
                }}>
                    <UserProvider>
                        <ProductsProvider>
                            {routes}
                        </ProductsProvider>
                    </UserProvider>
                </AuthContext.Provider>
            </ModalProvider>
            <ToastContainer position="top-center"/>
        </div>
    );
}

export default App;
