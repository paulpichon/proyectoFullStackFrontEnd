//outlet
import { Outlet } from 'react-router-dom';


const AuthLayout = () => {
  return (
    <>
        <h1>ADMINISTRADOR DE PACIENTES DE VETERINARIA</h1>

        <Outlet />
    </>
  )
}

export default AuthLayout