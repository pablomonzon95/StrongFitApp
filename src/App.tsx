
import './App.css'
import { useEffect } from 'react';
import { useSession } from './context/sessionToken';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer';
import NotFound  from './views/NotFound';
import PresentationPage from "./views/PresentationPage"
import {Login} from './views/Login';
import {Register} from './views/Register';
import Panel from './views/Panel';



function App() {

  
const [token] = useSession();

useEffect(() => {
  if (
    token  && token !== "null" &&
    (window.location.pathname.includes("login") ||
      window.location.pathname.includes("register") ||
      window.location.pathname === ("/"))
  ) {
    window.location.pathname = "/panel"; // No uso el navigate por estar fuera del provider de router
  } else if ((!token || token === "null" )&& window.location.pathname.includes("panel")) {
    window.location.pathname = "/";
  }
}, [token]);


  return (
  <div className='App'>
            <Header />
          
            <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path= "/" element={<PresentationPage/>} ></Route>  
                <Route path= "/login" element={<Login/>} ></Route> 
                <Route path= "/register" element={<Register/>} ></Route> 
                <Route path= "/panel" element={<Panel/>} ></Route> 
            </Routes>
           
            <Footer />
        </div>
  )
}

export default App