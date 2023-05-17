import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSession } from '../../context/sessionToken';
import { useEffect } from "react";


import './style.css'
import { useUsers } from '../../hooks/useUser';



 const Header = () => {
    const navigate = useNavigate()
    const [, , logout] = useSession();
    const { avatar, getUser} = useUsers()

    const currentId =localStorage.getItem("id") ?? ""
   
    useEffect(() => {
      if(window.location.pathname.includes("/panel")){
       getUser(parseInt(currentId))}
      
      }, []);
    

    return (
        <header className='header'>
            <nav >
            {window.location.pathname !== "/panel" ? 
               <img src='/gorila.png' alt='logo-gorila'></img> :
               <div className='avatarPencil'>
           <img className='avatar' src={`http://localhost:3002/uploads/${avatar}`} alt='avatar'></img> 
             <button><img className='editPencil' alt ="editPencil" src="/pencil.jpg"></img></button>
               </div>
             }
             {window.location.pathname !== "/panel" ?
              <button className='titleButton' onClick= {() => navigate(`/`)}> <h1>StrongFIT</h1> </button> :
              <h1 className='tituloPanel'>Strong Fit </h1> 
              }
            
             {window.location.pathname !== "/panel" ?

<div className='loginAndRegister'>
<div className='login'>
    <NavLink to='/login'><button>Login</button></NavLink>
</div>
<div className='register'>
    <NavLink to='/register'><button>Register</button></NavLink>
</div>
</div> :

             <button onClick={() => logout()} className='logout'>Log Out</button> 

              }
              
                
            </nav>
        </header>
    );
};

export default Header