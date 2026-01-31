import logo from './logo.svg';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';  
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';

function App() {

  const[isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to = '/login'/>
  }

  return (

    <div className="App">
      <RefreshHandler setIsAuthenticated = {setIsAuthenticated}/>
      <Routes>
        <Route path='/' element = {<Navigate to ="/login"/>}/>
        <Route path='/home' element = {<PrivateRoute element={<Home/>}/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/signup' element = {<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
