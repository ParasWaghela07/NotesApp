import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Edit from './pages/Edit';
import Home from './pages/Home';
import AddNote from './pages/AddNote';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/edit' element={<Edit/>}/>
      <Route path='/addnote' element={<AddNote/>}/>
    </Routes>
  )
}

export default App
