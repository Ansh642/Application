import './App.css'
import { Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AboutUs from './pages/About';
import Contact from './pages/Contact';
import Policies from './pages/policies';

function App() {

  return (
    <div className='overflow-auto outfit-ansh'>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/contact' element={<Contact/>}/>
       <Route path='/login' element={<Login/>}/>    
       <Route path='/signup' element={<Signup/>}/>  
       <Route path='/policies' element={<Policies/>}/>   
      </Routes>
      <Toaster />
    </div>
  )
}
 
export default App