import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

const Header = () => {

    const userLoginImg = sessionStorage.getItem('userImg');
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState(false);

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

    const handleAddMenu = () => {
        setMenu(true);
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
                                <a className="dropdown-item" href="#"><i class="fa-solid fa-user"></i> Profile</a>
                                <a className="dropdown-item" href="#" onClick={handleAddMenu}><i class="fa-solid fa-square-plus"></i> Add Menu</a>
                                <a className="dropdown-item" href="#" onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
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

            <Dialog
                open={menu}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Add Menu"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div class="row">
                            <div class="col-4">
                                <label for="exampleDataList" class="form-label">Menu</label>
                            </div>
                            <div class="col-5">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                    <label class="form-check-label" for="inlineRadio1">Groups</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                    <label class="form-check-label" for="inlineRadio2">Individual</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4"><label for="exampleDataList" class="form-label">Sub Menu</label></div>
                            <div class="col-5">

                                <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
                                <datalist id="datalistOptions">
                                    <option value="San Francisco" />
                                    <option value="New York" />
                                    <option value="Seattle" />
                                    <option value="Los Angeles" />
                                    <option value="Chicago" />
                                </datalist>
                            </div>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button type="button" class="btn btn-success" onClick={handleYes} autoFocus>Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancel</button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default Header;