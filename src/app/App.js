import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { useRoutes } from './routes';
import { ModalProvider } from './hooks/useModal';
import { AuthContext } from './context/AuthContext';
import { createStore } from './store/store';
import useAuth from './hooks/useAuth';

import './style/index.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore();

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
                    <Provider store={store}>
                            {routes}
                    </Provider>
                </AuthContext.Provider>
            </ModalProvider>
            <ToastContainer position="top-center"/>
        </div>
    );
}

export default App;
