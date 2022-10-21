import React, {useContext, useEffect, useState} from 'react';
import {getUserInfo} from "../utils/User";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({address: ''});

    useEffect(() => {
        const userInfo = getUserInfo();
        const {name, lastName, companyName, email} = userInfo;

        setUser(prevState => (
            {
                ...prevState,
                name,
                lastName,
                companyName,
                email
            }));

    }, []);

    const changeUserInfo = (data) => {
        const {newPassword, oldPassword, ...newData} = data;

        const userInfo = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({...user, ...newData}));
        const usersInfo = JSON.parse(localStorage.getItem('users'));

       const updateUsersInfo = usersInfo.map(user => {
            if (user.email === userInfo.email) {
                return {
                    ...user,
                    ...newData
                }
            }
            return user;
        })

        localStorage.setItem('users', JSON.stringify(updateUsersInfo));

        setUser(prevState => (
            {
                ...prevState,
                ...newData
            }
        ))
    }

    return <UserContext.Provider value={{user, changeUserInfo}}>
        {children}
    </UserContext.Provider>
};

export default UserProvider;