import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import MuiLink from "@mui/material/Link";
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const StyledOffline = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#555",
    color: "#555",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,

  }
}));


const Sidebar = (props) => {
  const{userdata}= props
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <Box>
        <Grid
          container
          sx={{
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <Grid item>
            <MuiLink
              component={Link}
              variant="button"
              underline="none"
              color="inherit"
              to={`/add/${userdata?._id}`}
            >
    {userdata?.status ==="Online" ? 
    <>
    
    <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar alt="Remy Sharp" src={userdata?.Profilepic ? PF+userdata.Profilepic :PF+`person/noAvatar.png`}/>
              </StyledBadge>
    
    </>
    
    :  
    
    <>
    
    <StyledOffline
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar alt="Remy Sharp" src={userdata?.Profilepic ? PF+userdata.Profilepic :PF+`person/noAvatar.png`}
                 sx={{filter:"blur(3px)"}}/>
              </StyledOffline>
    
    </>
    
    
    }       
            </MuiLink>
          </Grid>
          <Grid item>
            <Typography variant="body1" noWrap component="h1">
           {userdata?.username}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Sidebar;
