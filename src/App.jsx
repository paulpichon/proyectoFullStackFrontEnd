//importar react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//importat authlayout
import AuthLayout from './layout/AuthLayout';
//importar LOGIN
import Login from './paginas/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
