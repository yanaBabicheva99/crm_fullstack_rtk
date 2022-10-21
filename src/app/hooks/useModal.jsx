import React, {useContext, useState} from 'react';
const ModalContext = React.createContext();

export const useModal = () => {
   return useContext(ModalContext);
};

export const ModalProvider = ({children}) => {
    const [visible, setVisible] = useState({});

    return <ModalContext.Provider value={{visible, setVisible}}>
        {children}
    </ModalContext.Provider>

}