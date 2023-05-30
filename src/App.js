import React from 'react';
import './App.css';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import ListarLibros, { ListaLibro } from './fragment/ListarLibros';

function App() {
  /*const Middeware = ({children}) =>{
    const autenticado = estaSesion();
    const location = useLocation();
    if(autenticado){
      return children;
    }else{
      return <Navigate to= '/sesion' state={location}/>;
    }
  }*/


  /*const MiddewareSesion = ({children}) =>{
    const autenticado = estaSesion();
    const location = useLocation();
    if(autenticado){
      return <Navigate to= '/inicio'/>;
      
    }else{
      return children;
    }
  }*/
  return (
    <div className="App">
      <Routes>
        <Route path='/libros' element={<ListaLibro/>}/>
      </Routes>
      </div>
  );
}

export default App;
