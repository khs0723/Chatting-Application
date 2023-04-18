import React, {useState} from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {logout} from "../../../utils/auth";
import {useNavigate} from "react-router-dom";

export default function DropDownMenu() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState("");
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleToProfile = () => {
        navigate("/profile");
    };

    return (<div>
        <IconButton onClick={handleMenuOpen}
            style={
                {color: "#6A598C"}
        }>
            <MoreVertIcon/>
        </IconButton>
        <Menu id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={
                {"aria-labelledby": "basic-button"}
        }>
            <MenuItem onClick={logout}>Logout</MenuItem>
            <MenuItem onClick={handleToProfile}>Profile</MenuItem>
        </Menu>
    </div>);;
}
