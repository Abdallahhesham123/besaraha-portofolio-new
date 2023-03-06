
import React,{ useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import requests from "./../../apis/users/requests";
// AddPost
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState("Dashboard")
  const [user, setuser] = useState([]);
  useEffect(() => {
    const Fetchuser = async () => {
      const dataFetch = await requests.getOneUser();
      const { user } = dataFetch;
      // console.log(dataFetch);
      setuser(user);
    };
    Fetchuser();
    // window.location.reload();
    // console.log("hello world");
  }, [user]);
  return (
    <Box
    sx={{
      "& .pro-sidebar-inner": {
        background: `${colors.primary[400]} !important`,
        height:"120vh !important",
        position: "fixed"
      },
      "& .pro-icon-wrapper": {
        backgroundColor: "transparent !important",
        //  display:"none !important"
      },
      "& .pro-inner-item": {
        padding: "5px 15px 5px 20px !important",
       
      },
      "& .pro-inner-item:hover": {
        color: "#868dfb !important",
      },
      "& .pro-menu-item.active": {
        color: "#6870fa !important",
      }
 
    }}
  >

<ProSidebar collapsed={isCollapsed} >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h5" color={colors.grey[100]}>
                  BESARAHA_ABDALLAH
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="80px"
                  height="80px"
                  src={user?.Profilepic ? PF+user.Profilepic :PF+`person/noAvatar.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.FirstName ? user?.FirstName :user?.username}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  VP -{user?.role}
                </Typography>
              </Box>
            </Box>
          )}
           {/* menu-items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"} >
            <Item
              title= {isCollapsed ? "": "Dashboard"}
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />


            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title={isCollapsed ? "": "Home Page"}
              to="/"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={isCollapsed ? "": "Profile Page"}
              to="/profile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
                        <Item
              title={isCollapsed ? "": "Table Page"}
              to={`/messages/${user._id}`}
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
                                    {/* <Item
                title={isCollapsed ? "": "Add-Post"} 
              to="/add"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            <Item
             title={isCollapsed ? "": "Help"} 
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

           
          </Box>
        </Menu>
      </ProSidebar>
  </Box>
  )
}

export default Sidebar