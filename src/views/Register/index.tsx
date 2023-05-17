import "./style.css";
import swal from "sweetalert";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormLoginAndRegister } from "../../components/FormLoginAndRegister";

import { registerService } from "../../services/users";
import { RegisterData } from "../../interface/registerData";

// Es una vista que utilizamos para el registro del usuario 

export const Register = () => {

  const navigate = useNavigate();

  const [registerData, setregisterData] = useState<RegisterData>({
    email: "",
    password: "",
    repeatpassword: "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  const handleInputChangeRegister = (e:React.ChangeEvent<HTMLInputElement>) => {

    const { name, value, files } = e.target;
  if (name === "avatar" && files && files.length > 0) {
    setSelectedAvatar(files[0]);
  } else {
    const newData = { ...registerData, [name]: value };
    setregisterData(newData);
    console.log(newData);
  }
};
    
  

  const handleSubmitRegister = async (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    
    const { email, password, repeatpassword} = registerData;

    if (password === repeatpassword) {
        try {
          await registerService({
            email, password, avatar:selectedAvatar, repeatpassword:"" 
          });
  
          swal(
            "Register Successful",
            "please go to your email to activate your account",
            "success"
          );
  
          navigate(`/login`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          swal("An error has occurred", error.response.data.message, "error");
        }
      } else {
        swal("Passwords must be the same", "please check them out", "error");
      }
    };
  
  return (
    <div className="form_register">
      <h1>Register</h1>
      <FormLoginAndRegister 
        handleInputChangeFunction={handleInputChangeRegister}
        handleSubmitFunction={handleSubmitRegister}
        textoBoton="Register"
      >
        <div className="extra_input">
          <label htmlFor="repeatpasswordId"> Repetir Contraseña</label>
          <input onChange={handleInputChangeRegister}
            type="password"
            id="repeatpasswordId"
            name="repeatpassword"
          ></input>
          <div className="image_button">
          <label htmlFor="addImage">Add profile pic (optional)</label>
          <input
  className="upload_file"
  type="file"
  name="avatar"
  id="addImage"
  onChange={handleInputChangeRegister}
       ></input>
       {selectedAvatar ? (
              <img src={URL.createObjectURL(selectedAvatar)} style={{ width: "100px" }} />
            ) : null}
       </div>
        </div>
      </FormLoginAndRegister>

    </div>
  );
};
