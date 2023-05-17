/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-function */
import swal from "sweetalert";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Contexto utilizado para el manejo de sesiones a través del jsonwebtoken
// También tiene una función de logout.
type SessionContextType = [string | null, (token: string | null) => void, () => void, (id: number | null) => void];
type SessionProviderProps = {
  children: React.ReactNode;
};

const SessionContext = createContext<SessionContextType>([
  null,
  () => {},
  () => {},
  () => {},
]);

const SessionProvider = ({ children }: SessionProviderProps) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [adminId, setAdminId] = useState<number | null>(Number(localStorage.getItem("id")));

  useEffect(() => {
    if (token !== null ) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (adminId !== null) {
      localStorage.setItem("id", adminId.toString());
    } else {
      localStorage.removeItem("id");
    }
  }, [adminId]);

  const logout = () => {
    swal("Thank you for using our app. See you later!!");
    setToken(null);
    setAdminId(null);

    setTimeout(() => {
      navigate(`/`);
    }, 500);
  };

  return (
    <SessionContext.Provider value={[token, setToken, logout, setAdminId]}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => {
  return useContext(SessionContext);
};

export { SessionProvider, useSession };