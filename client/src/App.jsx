import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from 'pinvent/pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forgot';
import Reset from './pages/auth/Reset';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpassword' element={<Forgot />} />
        <Route path='/resetpassword/:resetToken' element={<Reset />} />
      </Routes>
    </Router>
  );
}
