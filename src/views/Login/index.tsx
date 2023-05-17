import "./style.css";
import swal from "sweetalert";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormLoginAndRegister } from "../../components/FormLoginAndRegister";
import { useSession } from "../../context/sessionToken";
import { LoginService } from "../../services/users";
import { loginData } from "../../interface/LoginData";


// Es una vista que utilizamos para el inicio de sesion del usuario 

export  const Login = () => {

  

 
  const [loginData, setloginData] = useState<loginData>({
    email: "",
    password: "",
  });

  const [, setToken, , setAdminId] = useSession();
  
  const navigate = useNavigate();

  const handleInputChangeLogin = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newData = { ...loginData, [name]: value };
    setloginData(newData);
  };

  const handleSubmitLogin = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    
      const response = await LoginService(loginData);

      
      
      const tokenResponse = response.data.data.token;
     
      const adminId = response.data.id

      setToken(tokenResponse);
  
      setAdminId(adminId)
      
      navigate(`/panel`)
     

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

      swal("An error has occured", error.response.data.message, "error");

    }
  };

  return (
    <div className="form_login">
      <h1>Login</h1>

      <FormLoginAndRegister
              handleInputChangeFunction={handleInputChangeLogin}
              handleSubmitFunction={handleSubmitLogin}
              textoBoton="Login" children={undefined}      ></FormLoginAndRegister>
     
    </div>
  );
};

