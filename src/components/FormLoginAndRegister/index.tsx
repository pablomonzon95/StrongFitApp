
import "./style.css";
import React from "react";

type LoginProps = {
    textoBoton: string;
    handleInputChangeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmitFunction: (event: React.FormEvent<HTMLFormElement>) => void;
    children?: React.ReactNode;
  }


//Formulario tanto usado para eel registro como para el login, recibe las funciones manejadores de cambio y de envio de formulario como 
//componentes.
export const FormLoginAndRegister = ({ textoBoton, children, handleInputChangeFunction, handleSubmitFunction }:LoginProps) => {

  return (
    <form className="form" onSubmit={handleSubmitFunction} >
      <label htmlFor="email">Email</label>
      <input onChange={handleInputChangeFunction} type="email" id="email" name="email" required></input>
      <label>Password</label>
      <input onChange={handleInputChangeFunction} type="password" id="passwordId" name="password" minLength={5} maxLength={20} required></input>
      <div className="children">{children}</div>
      <button>{textoBoton}</button>
    </form>
  );
};

