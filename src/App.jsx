import { useState,useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import {Routes,Route} from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Login from './components/Login';
import Orders from './pages/Orders';


function App() {
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)
    console.log("token",token);
  },[token])

  return (
    <div className='bg-grey-50 min-h-screen'>
      <ToastContainer />
      {
        token === ''
        ? <Login setToken={setToken}/>
        : <>
        <Navbar token={token} setToken={setToken}/>
        <hr />
        <div className='flex w-full'>
          <Sidebar />
          <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base'>
          <Routes>
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token}/>}/>
            <Route path="/orders" element={<Orders token={token}/>}/>
           </Routes>

          </div>
        </div>
        </>
      }
    </div>
  )
}

export default App
