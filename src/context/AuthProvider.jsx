import { useState, useEffect, createContext } from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    //para verificar is tienen sesion en RUTA PROTEGIDA
    const [cargando, sertCargando] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            //obtener token de local storage
            const token = localStorage.getItem('token');

            //si no hay un TOKEN
            if (!token) {
                sertCargando(false);
                return;
            }

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

            sertCargando(false);


        }
        //llamr funcion
        autenticarUsuario();
    }, []);

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
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