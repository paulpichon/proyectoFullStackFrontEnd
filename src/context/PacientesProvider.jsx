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
        //token
        const token = localStorage.getItem('token');
        //configuracion
        const config = {
            headers: {
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        };

        if (paciente.id) {
            
            try {
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config);

                const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState );

                setPacientes( pacientesActualizado );

            } catch (error) {
                console.log(error);
            }

        }else {
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                //crea un objeto sin esto campos
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
    
                setPacientes([pacienteAlmacenado, ...pacientes]);
    
            } catch (error) {
                console.log( error.response.data.msg);
            }
        }
    }

    //funcion para editar un paciente
    const setEdicion = (paciente) => {
        setPaciente(paciente);
    };

    //funcion para eliminar un paciente
    const eliminarPaciente = async (id) => {
        const confirmar = confirm('¿Confirmas que deseas eliminar?');
        
        if (confirmar) {
            try {
                //token
                const token = localStorage.getItem('token');
                //configuracion
                const config = {
                    headers: {
                        "Content-Type":"application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);

                const pacientesActualizado = pacientes.filter( pacientesState => pacientesState._id !== id  );

                setPacientes( pacientesActualizado );

            } catch (error) {
                console.log( error );
            }
        }
    };

    return(
        <PacientesContext.Provider
            value={{
                pacientes, 
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;