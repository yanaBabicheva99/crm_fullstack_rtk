
export const addUser = () => {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
}
export const addUserNew = (data) => {
     const users = JSON.parse(localStorage.getItem('users'));
     const userFilterByEmail = users.find(item => item.email === data.email);


     if (userFilterByEmail === undefined) {
         localStorage.setItem('users', JSON.stringify([...users,
             {
                 id: Date.now(),
                 ...data
             }
         ]));
     } else {
         console.log('Пользователь с данной почтой существует');
     }
};

export const existenceCheckUser = (data) => {

    const users = JSON.parse(localStorage.getItem('users'));
    const userFindByEmail = users.find(item => item.email === data.email);

    if (userFindByEmail === undefined) {
        console.log('Пользователь с данной почтой не найден, проверьте введенные данные');
    } else if (userFindByEmail.password !== data.password){
        console.log('Неверный пароль');
    }
    else {
        localStorage.setItem('user', JSON.stringify(data));
        return true;
    }
}

export const getUserInfo = () => {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = JSON.parse(localStorage.getItem('user'));
    return users?.find(u => u.email === user.email) || {name: '', lastName: '', companyName: '', email: ''};
}