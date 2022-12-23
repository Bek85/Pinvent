import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from 'pinvent/pages/home/Home';
import Login from 'pinvent/pages/auth/Login';
import Register from 'pinvent/pages/auth/Register';
import Forgot from 'pinvent/pages/auth/Forgot';
import Reset from 'pinvent/pages/auth/Reset';
import Dashboard from 'pinvent/pages/dashboard/Dashboard';
import Sidebar from './components/sidebar/Sidebar';
import Layout from './components/layout/Layout';

axios.defaults.withCredentials = true;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpassword' element={<Forgot />} />
        <Route path='/resetpassword/:resetToken' element={<Reset />} />
        <Route
          path='/dashboard'
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
