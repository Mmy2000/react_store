import { createContext, useEffect, useState } from "react";

export let UserContext = createContext()

export default function UserContextProvider(props) {

    const [userLogin, setUserLogin] = useState(null);
    useEffect(() => {
        
        if (localStorage.getItem('userTaken') !== null) {
            setUserLogin(localStorage.getItem('userTaken'))
        }
        
    }, []);

    return <UserContext.Provider value={{userLogin , setUserLogin}}>
        {props.children}
    </UserContext.Provider>
}