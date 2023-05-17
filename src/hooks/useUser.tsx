import { getUserService } from "../services/users";
import { useState, useEffect } from "react";

export const useUsers = () => {

    
    const [avatar, setAvatar] = useState<File| null>(null)


    const getUser  = async (id:number) => {
    try {
      const response = await getUserService(id);
     
      setAvatar(response.data.data.avatar)
     

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e:any) {
      console.error(e.message);
    }
  };
  return {avatar, setAvatar, getUser} 
}


