import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from '@/pages/home/Home';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Forgot from '@/pages/auth/Forgot';
import Reset from '@/pages/auth/Reset';
import Dashboard from '@/pages/dashboard/Dashboard';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import Layout from '@/components/layout/Layout';
import AddProduct from '@/pages/products/addProduct/AddProduct';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getLoginStatus } from '@/api/authApi';
import { setLoggedInStatus } from '@/redux/features/auth/authSlice';
import ProductDetail from '@/components/product/product-detail/ProductDetail';
import EditProduct from '@/pages/products/editProduct/EditProduct';
import Profile from '@/pages/profile/ViewProfile';
import EditProfile from '@/pages/profile/EditProfile';

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
        <Route
          path='/product-detail/:id'
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path='/edit-product/:id'
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path='/profile'
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path='/edit-profile'
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}
