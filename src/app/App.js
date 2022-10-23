import React from 'react';

import {useRoutes} from "./routes";
import './style/index.module.scss';
import {ProductsProvider} from "./hooks/useProducts";
import {ModalProvider} from "./hooks/useModal";
import UserProvider from "./hooks/useUser";
import useAuth from "./hooks/useAuth";
import {AuthContext} from "./context/AuthContext";

function App() {
    const {token, login, logout, userId, signUp, signIn} = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);
    return (
        <ModalProvider>
            <AuthContext.Provider value={{
                token, login, logout, userId, signUp, signIn, isAuthenticated
            }}>
                <div className="App">
                    <UserProvider>
                        <ProductsProvider>
                            {routes}
                        </ProductsProvider>
                    </UserProvider>
                </div>
            </AuthContext.Provider>
        </ModalProvider>
    );
}

export default App;
