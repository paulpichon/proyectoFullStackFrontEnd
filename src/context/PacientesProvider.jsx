import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';

const PacientesContext = createContext();

export const PacientesProvider = ({children}) => {

    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                //si no hay token
                if (!token) return;
                //config para hacer la peticion
                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                const { data } = await clienteAxios('/pacientes', config);

                setPacientes( data );



            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes();
    }, []);

    const guardarPaciente = async (paciente) => {
        if (paciente.id) {
            console.log("editando...");
        }else {
            console.log("nuevo");
        }
        return;
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const { data } = await clienteAxios.post('/pacientes', paciente, config);
            //crea un objeto sin esto campos
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

            setPacientes([pacienteAlmacenado, ...pacientes]);

        } catch (error) {
            console.log( error.response.data.msg);
        }
    }

    //funcion para editar un paciente
    const setEdicion = (paciente) => {
        setPaciente(paciente);
    };

    return(
        <PacientesContext.Provider
            value={{
                pacientes, 
                guardarPaciente,
                setEdicion,
                paciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;