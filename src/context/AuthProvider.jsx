import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            //obtener token de local storage
            const token = localStorage.getItem('token');

            //si no hay un TOKEN
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : `Bearer ${token}`
                }
            }

            try {
                
                const {data} = await clienteAxios('/veterinarios/perfil', config)

                setAuth(data);

            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }



        }
        //llamr funcion
        autenticarUsuario();
    }, []);

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )

} 

export {
    AuthProvider
}

export default AuthContext;