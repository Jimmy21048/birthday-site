import { useState } from "react";

export default function ShowPassword({ setPwdType}) {
    const [showPassword, setShowPassword] = useState(false);
    const handleChangePassword = () => {
        setShowPassword(!showPassword);

        if(showPassword) {
            setPwdType('password')
        } else {
            setPwdType('text')
        }
    }
    return (
        <>
        {
            showPassword ? 
            <i className="fa-solid fa-eye-slash" onClick={handleChangePassword}></i>
            : 
            <i className="fa-solid fa-eye" onClick={handleChangePassword}></i>
        }    
        </>
    )
}