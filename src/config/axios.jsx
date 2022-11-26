import axios from 'axios';

//CREAR UNA URL DE BASE
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

export default clienteAxios;