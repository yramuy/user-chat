import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const Header = () => {

    const userLoginImg = sessionStorage.getItem('userImg');
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = () => {

        sessionStorage.setItem("userId", "");
        sessionStorage.setItem("userName", "");
        sessionStorage.setItem("userRoleId", "");
        sessionStorage.setItem("userRole", "");
        sessionStorage.setItem("userImg", "");
        sessionStorage.setItem("empName", "");
        sessionStorage.setItem("empNumber", "");

        navigate('/', { replace: true });
    }

    return (
        <>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="nav navbar-nav ml-auto">

                    <li className="nav-item">
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" style={{ borderRadius: '50%', background: 'lightgrey' }} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                <img src={userLoginImg} alt="Avatar" style={{ width: "20px", height: "30px" }} />
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{ left: '-6rem' }}>
                                <a className="dropdown-item" href="#">Profile</a>
                                <a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Logout Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure want to logout?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button type="button" class="btn btn-primary" onClick={handleYes} autoFocus>Yes</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>No</button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default Header;