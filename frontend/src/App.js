
import './App.css';
import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Layout from './components/comp_layout/Layout/Layout';
import Notfound from './components/comp_layout/NotFound/Notfound';
import Home from './Pages/Home/Home';
import Signin from './Pages/Signin/Signin';
import Register from './Pages/Signup/Signup';
import  Dashboard  from './scenes/dashboard/index';
import Template from './Utility/Templete/Templete.jsx';
import Invoices from './components/invoices/index.jsx' ;
import Profile from './components/Profile/Profile.jsx';
import AddPost from './components/AddPost/AddPost.jsx';
import Update from './components/update/Update.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import VerifyEmail from './components/VerifyEmail/VerifyEmail.jsx';
import StatBox from './Utility/faq/index.jsx';
import Messages from './components/Messages/Messages.jsx';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import UpdateMessage from './components/UpdateMessage/UpdateMessage.jsx';
import SendingEmail from './components/forgetpassword/SendingEmail.jsx';
import ResetPasswordGeneration from './components/forgetpassword/ResetPasswordGeneration.jsx';
function App() {
  const [theme, colorMode] = useMode();
  let routes = createBrowserRouter([
  
    {path: "/", element: <Layout />,errorElement: <Notfound/>,children: [
      { index: true, element:<ProtectedRoute ><Template> <Home/></Template></ProtectedRoute>},
      { path: "dashboard", element:  <ProtectedRoute ><Template><Dashboard/></Template></ProtectedRoute> },
      { path: "invoices", element:  <ProtectedRoute ><Template><Invoices/></Template></ProtectedRoute> },
      { path: "profile", element:  <ProtectedRoute ><Template><Profile/></Template></ProtectedRoute> },
      { path: "add/:id", element:  <ProtectedRoute ><Template><AddPost/></Template></ProtectedRoute> },
      { path: "messages/:id", element:  <ProtectedRoute ><Template><Messages/></Template></ProtectedRoute> },
      { path: "faq", element:   <ProtectedRoute > <Template><StatBox/></Template></ProtectedRoute> },
      { path: "updateProfile/:id", element:   <ProtectedRoute > <Template><Update/></Template></ProtectedRoute> },
      { path: "reset-password", element:   <ProtectedRoute > <Template><ResetPassword/></Template></ProtectedRoute> },
      { path: "update-message/:id", element:  <ProtectedRoute ><Template><UpdateMessage/></Template></ProtectedRoute> },
      { path: "login", element: <Signin/>  },
      { path: "/sendpasswordresetemail", element:<SendingEmail />},
      { path: "reset-password/:id/:token", element:  <ResetPasswordGeneration/>},
      { path: "register", element: <Register/>  },
      { path: "/verification-email/:id", element:  <VerifyEmail/> },



    ]}

    ])
  return (
    <>
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={routes}/>
    </ThemeProvider>
  
    </ColorModeContext.Provider>


    </>
  );
}

export default App;
