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
    getUser: async () => {
        const {data} = await axios.get('http://localhost:5000/api/auth/get', {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('userData')).token,
                "content-type": "application/json"
            }
        });
        return data;
    }
}