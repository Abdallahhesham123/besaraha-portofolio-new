import React , { useState }from 'react'
import "./password.scss";
import {  TextField} from '@material-ui/core'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const PasswordInput = ({value ,onChange,error ,helperText ,placeholder ,name ,label}) => {
    const marginTop = { marginTop: 5 , marginBottom: 5}
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
      };
  return (
    <>
    <div className='password'>

    <TextField
                   label={label}
                   placeholder={placeholder} 
                    name={name}
                    type={showPassword ? "text" : "password"}
                    // variant="outlined" 
                    value={value}
                    onChange={onChange}
                    error={error}
                    helperText={helperText}
                    fullWidth
                    style={marginTop}
                   />
       <div className="icon" onClick={togglePassword}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>

    </div>



    </>
  )
}

export default PasswordInput