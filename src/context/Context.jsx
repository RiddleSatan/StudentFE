import { createContext, useState } from "react";


export const MyContext=createContext();

export const ContextProvider = ({ children }) => {
    const [value, setValue] = useState([]);
    const [edit,setEdit]=useState({
         name: "",
    age: "",
    email: "",
    course: "",
    });

    return (
        <MyContext.Provider value={{ setValue, value,edit,setEdit }}>
            {children}
        </MyContext.Provider>
    );
}

