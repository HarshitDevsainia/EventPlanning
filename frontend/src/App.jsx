import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Button} from 'flowbite-react';
import Header from './Components/Header';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import Signup from './Pages/Signup';

function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App