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
import Sidebar from 'pinvent/components/sidebar/Sidebar';
import Layout from 'pinvent/components/layout/Layout';
import AddProduct from 'pinvent/pages/addProduct/AddProduct';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLoginStatus } from './api/authApi';
import { setLoggedInStatus } from 'pinvent/redux/features/auth/authSlice';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(setLoggedInStatus(status.data));
    }
    loginStatus();
  }, [dispatch]);

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
        <Route
          path='/add-product'
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
