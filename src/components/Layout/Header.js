import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { GetApiService } from "../Apis/ApiService";

const Header = () => {

    const userLoginImg = sessionStorage.getItem('userImg');
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [menus, setMenus] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        GetMenus();
        GetUserList();
    }, []);

    const GetMenus = async () => {
        const url = '/ProjectApis/v1/menuList';

        await GetApiService(url).then((data) => {
            console.log('menus : ', data.menu)
            setMenus(data.menu);
        });
    }

    const GetUserList = async () => {
        const url = '/ProjectApis/v1/usersList';
        await GetApiService(url).then((data) => {
            console.log('users : ', data.users)
            setUsers(data.users);
        });
    }

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
        setSelectedValue('1');
    }

    const handleCancel = () => {
        setMenu(false);
        setSelectedValue('');
    }

    const handleRadioButton = (e) => {
        setSelectedValue(e.target.value);

        console.log('selected value : ', e.target.value)
    }

    console.log('default checked : ', { selectedValue })

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
                aria-describedby="alert-dialog-description" id="menu-dialog">
                <DialogTitle id="alert-dialog-title">
                    {"Add Menu"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div class="row mt-3">
                            <div class="col-4">
                                <label for="exampleDataList" class="form-label">Menu</label>
                            </div>
                            <div class="col-5">
                                {
                                    menus.map((res) => (
                                        <div class="form-check form-check-inline" key={res.id}>
                                            <input class="form-check-input"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                value={res.id}
                                                checked={selectedValue === res.id}
                                                onChange={handleRadioButton}
                                            />
                                            <label class="form-check-label" for="inlineRadio1">{res.name}</label>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                        {
                            selectedValue === '1' ? (
                                <div class="row mt-3">
                                    <div class="col-4"><label for="exampleDataList" class="form-label">Group Menu</label></div>
                                    <div class="col-5">
                                        <input class="form-control" id="exampleDataList" placeholder="Enter Submenu name" />
                                    </div>
                                </div>

                            ) : (
                                <div class="row mt-3">
                                    <div class="col-4"><label for="exampleDataList" class="form-label">Individual Menu</label></div>
                                    <div class="col-5 first-division">
                                        <select class="form-control" name="user_menu">
                                            <option value="">--Select User--</option>
                                            {
                                                users.map((user) => (
                                                    <option value={user.id}>{user.full_name}</option>
                                                ))
                                            }
                                        </select>
                                        <button
                                            type="button"
                                            onClick={{}}
                                            className="add-btn"
                                        >
                                            <span>Add User</span>
                                        </button>
                                    </div>
                                    <div class="col-2 second-division">
                                        <button
                                            type="button"
                                            onClick={{}}
                                            className="remove-btn"
                                        >
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                </div>
                            )
                        }



                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button type="button" class="btn btn-success" onClick={handleYes} autoFocus>Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancel}>Cancel</button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default Header;