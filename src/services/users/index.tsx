import axios from "axios";
import { loginData } from "../../interface/LoginData";
import { RegisterData } from "../../interface/registerData";


export const LoginService = async(loginData: loginData) => {
  
    const response = await axios.post(
        `http://localhost:3002/login`,
        loginData
      );
      return response
   
}

export const registerService = async (registerData: RegisterData) => {
  const formData = new FormData();
  formData.append("email", registerData.email);
  formData.append("password", registerData.password);
  if(registerData.avatar){
  formData.append("avatar", registerData.avatar);
  }
 
  const response = await axios.post(
    `http://localhost:3002/users`,
    formData 
  );
  return response;
};

// eslint-disable-next-line react-refresh/only-export-components
export const getUserService = async (id:number) => {
  const token = `Bearer ${localStorage.getItem("token")}`;
 
  const response = await axios.get(
    `http://localhost:3002/users/${id}`, {
      headers: {
        authorization: token,
      },
    }
  );
  return response;
}