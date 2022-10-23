import React, {useContext, useEffect, useState} from 'react';
import {getUserInfo} from "../utils/User";
import {UserService} from "../services/user.service";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({children}) => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       const getUser = async () => {
           try {
               const [data] = await UserService.getUser();
               console.log(data);
               setUser(data);
               setLoading(false);
           } catch(err) {
               console.log(err);
           }
       }
       getUser();
    }, []);

    // const changeUserInfo = (data) => {
    //     const {newPassword, oldPassword, ...newData} = data;
    //
    //     const userInfo = JSON.parse(localStorage.getItem('user'));
    //     localStorage.setItem('user', JSON.stringify({...user, ...newData}));
    //     const usersInfo = JSON.parse(localStorage.getItem('users'));
    //
    //    const updateUsersInfo = usersInfo.map(user => {
    //         if (user.email === userInfo.email) {
    //             return {
    //                 ...user,
    //                 ...newData
    //             }
    //         }
    //         return user;
    //     })
    //
    //     localStorage.setItem('users', JSON.stringify(updateUsersInfo));
    //
    //     setUser(prevState => (
    //         {
    //             ...prevState,
    //             ...newData
    //         }
    //     ))
    // }

    return <UserContext.Provider value={{user, loading}}>
        {children}
    </UserContext.Provider>
};

export default UserProvider;