


import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth'

const ProtectedAdminRoute = ({children}) => {

    const {Userdata} = useContext(AuthContext)
if(Userdata?.role === "admin"){

    return children;
}else{

    return <Navigate to= "/"/>
}
}

export default ProtectedAdminRoute