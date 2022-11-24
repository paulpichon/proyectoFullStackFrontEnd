//outlet
import { Outlet } from 'react-router-dom';


const AuthLayout = () => {
  return (
    <>
        <h1>DESDE AUTH LAYOUT</h1>

        <Outlet />
    </>
  )
}

export default AuthLayout