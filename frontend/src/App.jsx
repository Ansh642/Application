import './App.css'
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AboutUs from './pages/About';
import Contact from './pages/Contact';
import Policies from './pages/Policies';
import PolicyPage from './pages/PolicyPage';
import MyPolicies from './pages/User/Mypolicy';
import MyClaims from './pages/User/Myclaims';
import Private from './pages/User/Private';
import PrivateAdmin from './pages/Admin/Private';
import MyApprovals from './pages/Admin/Approvals';
import NotFound from './pages/NotFound';
import CreatePolicy from './pages/Admin/CreatePolicy';
import Dashboard from './pages/Admin/Dashboard';
import ForgotPass from './pages/ForgotPass';
import AIPromptPage from './pages/AI';

function App() {

  return (
    <div className='overflow-auto outfit-ansh'>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/contact' element={<Contact/>}/>
       <Route path='/login' element={<Login/>}/>    
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/forgot-password' element={<ForgotPass/>}/>  
       <Route path='/policies' element={<Policies/>}/>   
       <Route path='/policies/:id' element={<PolicyPage/>}/>
       <Route path='/ask-ai' element={<AIPromptPage/>}/>
       <Route path='*' element={<NotFound/>} />

       <Route path="/" element={<Private/>}> 
       <Route path='/my-policies' element={<MyPolicies/>} />
       <Route path='/my-claims' element={<MyClaims/>} />
       </Route>

       <Route path="/" element={<PrivateAdmin/>}> 
       <Route path='/my-approvals' element={<MyApprovals/>} />
       <Route path='/create-policy' element={<CreatePolicy/>} />
       <Route path='/dashboard' element={<Dashboard/>} />
       </Route>

      </Routes>
      <Toaster />
    </div>
  )
}
 
export default App
