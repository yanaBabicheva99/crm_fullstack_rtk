import axios from "axios";

export const UserService = {
    get: async (content) => {
        const {data} = await axios.post('http://localhost:5000/api/auth/login', content);
        return data;
    },
    create: async (content) => {
        const {data} = await axios.post('http://localhost:5000/api/auth/register', content);
        return data;
    },
    getUser: async (id) => {
        const {data} = await axios.get('http://localhost:5000/api/auth/get/' + id, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('userData')).token,
                "content-type": "application/json"
            }
        });
        return data;
    },
    updateUser: async (id, content) => {
        const {data} = await axios.patch('http://localhost:5000/api/auth/update/' + id, content, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('userData')).token
            }
        });
        return data;
    },
    changeUser: async (id, content) => {
        console.log('213213')
        const {data} = await axios.put('http://localhost:5000/api/auth/change/' + id, content, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('userData')).token
            }
        });
        console.log('213213 = ',data)
        return data;
    }
}