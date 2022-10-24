import React, {useContext, useEffect, useState} from 'react';
import {getUserInfo} from "../utils/User";
import {UserService} from "../services/user.service";
import {AuthContext} from "../context/AuthContext";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({children}) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const {userId} = useContext(AuthContext);

    useEffect(() => {
       const getUser = async (id) => {
           try {
               const [data] = await UserService.getUser(id);
               console.log(data);
               setUser(data);
               setLoading(false);
           } catch(err) {
               console.log(err);
           }
       }
       if (userId) {
           getUser(userId);
       }
    }, [userId]);

    const updateUserInfo = async (id, content) => {
        try {
            const data = await UserService.updateUser(id, content);
            setUser(prevState => ({...prevState, ...data}));
        } catch(err) {
            console.log(err);
        }
    };

    const changeUserInfo = async (id, content) => {
        try {
            const data = await UserService.changeUser(id, content);
            setUser(prevState => ({...prevState, ...data}));
        } catch(err) {
            const {response: {data: {message}}} = err;
            return Promise.reject(message);
        }
    };

    return <UserContext.Provider value={{user, loading, updateUserInfo, changeUserInfo}}>
        {children}
    </UserContext.Provider>
};

export default UserProvider;