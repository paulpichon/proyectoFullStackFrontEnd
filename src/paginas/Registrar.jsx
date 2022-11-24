import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';

const Registrar = () => {
    //nombre
    const [nombre, setNombre] = useState('');
    //email
    const [email, setEmail] = useState('');
    //password
    const [password, setPassword] = useState('');
    //repetir password
    const [repetirPassword, setRepetirPassword] = useState('');
    //ALERTA
    const [alerta, setAlerta] = useState({});

    //funcion para el formulario
    const handleSubmit = e => {
        e.preventDefault();

        //validar que ningun campo este vacio
        if ([nombre, email, password, repetirPassword].includes('') ) {
            setAlerta({msg:'Hay campos vacios', error: true});
            return;
        }
        //validar que los password sean iguales
        if (password !== repetirPassword)  {
            setAlerta({msg:'Las contraseñas no son iguales', error: true});
            return;
        }
        //validar que el password tenga un minimo de 6 caracteres
        if (password.length < 6) {
            setAlerta({msg:'La contraseña es muy corta, debe tener minimo 6 caracteres', error: true});
            return;
        }

        //si todo esta bien lo regresamos a un objeto vacio
        setAlerta({});

    }
    //para verificar si hay un mensaje de alerta previo
    const { msg } = alerta;

    return (
      <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">
                Crea tu cuenta y administra 
                 <span className="text-black"> tus Pacientes</span>
            </h1>
        </div>

        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            
            { msg && <Alerta 
                alerta={alerta}
            />}

            <form
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Nombre
                    </label>
                    <input 
                        type="text"
                        placeholder="Tu nombre"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value) }
                    />
                </div>
                
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input 
                        type="email"
                        placeholder="Email de registro"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={ e => setEmail(e.target.value) }
                    />
                </div>
                
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Pasword
                    </label>
                    <input 
                        type="password"
                        placeholder="Tu contraseña"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={ e => setPassword(e.target.value) }
                    />
                </div>
                
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Repetir Password
                    </label>
                    <input 
                        type="password"
                        placeholder="Repite tu contraseña"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={repetirPassword}
                        onChange={ e => setRepetirPassword(e.target.value) }
                    />
                </div>

                <input 
                    type="submit"
                    value="Crear cuenta"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />

            </form>

            <nav className='mt-10 lg:flex lg:justify-between'>
                <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>

                <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/olvide-password">Olvide mi Password</Link>
            </nav>

        </div>

      </>
    )
  }
  
  export default Registrar;