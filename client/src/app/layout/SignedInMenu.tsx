import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/acoountSlice";
import { clearBasket } from "../../features/basket/basketSlice";

export default function SignedInMenu(){
  const disptach = useAppDispatch();
  const {user} = useAppSelector(state => state.account)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button 
        color="inherit"
        sx={{typography: 'h6'}}
        onClick={handleClick}>
        {user?.email}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My orders</MenuItem>
        <MenuItem onClick={() =>{
          disptach(signOut());
          disptach(clearBasket());
        }} >Logout</MenuItem>
      </Menu>
    </>
  );
}