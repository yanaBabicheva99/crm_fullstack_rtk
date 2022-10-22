import axios from "axios";

export const ProductService = {
    create: async (content) => {
        const {data} = await axios.post('http://localhost:5000/api/products', content, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('userData')).token
            }
        });
        return data;
    },

    get: async () => {
        const {data} = await axios.get('http://localhost:5000/api/products', {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('userData')).token,
                "content-type": "application/json"
            }
        });
        return data;
    },

    delete: async (id, content) => {
        const {data} = await axios.patch('http://localhost:5000/api/products/remove/' + id, content, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('userData')).token
            }
        });
        return data;
    },

    change: async (id, content) => {
        const {data} = await axios.patch('http://localhost:5000/api/products/change/' + id, content, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('userData')).token
            }
        });
        return data;
    },

    update: async (id, content) => {
        const {data} = await axios.patch('http://localhost:5000/api/products/update/' + id, content, {
            headers: {
                Authorization: JSON.parse(localStorage.getItem('userData')).token
            }
        });
        return data;
    }
}