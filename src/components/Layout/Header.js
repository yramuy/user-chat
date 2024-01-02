import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { GetApiService, PostApiService } from "../Apis/ApiService";

const Header = () => {

    const userLoginImg = sessionStorage.getItem('userImg');
    const navigate = useNavigate();
    const loginIUserId = sessionStorage.getItem('userId');

    const [open, setOpen] = useState(false);
    const [menu, setMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [menus, setMenus] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersList, setUsersList] = useState([{ user: "" }]);
    const [groupMenu, setGroupMenu] = useState("");
    const { chatId } = useParams();

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

        if (e.target.value === '1') {
            setUsersList([{ user: "" }]);
        }

        setGroupMenu("");

        console.log('selected value : ', e.target.value)
    }

    const mystyle1 = {
        display: "flex",
        marginLeft: "12rem",
        marginTop: "-1.7rem"
    };
    const mystyle2 = {
        display: "flex",
        marginLeft: "12rem",
        marginTop: "1.3rem"
    };

    console.log('default checked : ', { selectedValue })

    const addRow = () => {
        setUsersList([...usersList, { user: "" }]);
    }

    const handleUserChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...usersList];
        list[index][name] = value;
        setUsersList(list);
    }

    console.log("userslist : ", usersList)

    const removeRow = (index) => {

        const list = [...usersList];
        // console.log("index", index)
        console.log("List", list)
        // // At position 2, remove 2 items: 
        list.splice(index, 1);
        // const newList = list.filter((item, index) => index !== index1);
        setUsersList(list);
    }

    const handleSave = async (e) => {

        e.preventDefault();

        const url = '/ProjectApis/v1/saveMenu';
        const body = JSON.stringify({
            menuId: selectedValue,
            groupMenu: groupMenu,
            loginId: loginIUserId,
            individualMenu: usersList

        });

        console.log(body)

        await PostApiService(url, body).then((data) => {

            if (data.status === 1) {
                window.location.replace(`/user-chat/${chatId}`);
            }
        });

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
                            selectedValue === '1' && (
                                <div class="row mt-3">
                                    <div class="col-4"><label for="exampleDataList" class="form-label">Group Menu</label></div>
                                    <div class="col-5">
                                        <input class="form-control"
                                            id="exampleDataList"
                                            placeholder="Enter Submenu name"
                                            value={groupMenu}
                                            onChange={(e) => setGroupMenu(e.target.value)}
                                        />
                                    </div>
                                </div>

                            )
                        }

                        <div class="row mt-3">
                            <div class="col-4"><label for="exampleDataList" class="form-label">Users</label></div>

                            {
                                usersList.map((singleUser, index) => (
                                    <div className="services" style={index === 0 ? mystyle1 : mystyle2}>
                                        <div class="col-7 first-division">
                                            <select class="form-control" name="user_id" onChange={(e) => handleUserChange(e, index)}>
                                                <option value="">--Select User--</option>
                                                {
                                                    users.map((user) => (
                                                        <option value={user.id}>{user.full_name}</option>
                                                    ))
                                                }
                                            </select>


                                        </div>
                                        {
                                            index === 0 ? (<div class="col-2 first-division">
                                                <button
                                                    type="button"
                                                    onClick={addRow}
                                                    className="btn-success"
                                                >
                                                    <span><i class="fa-solid fa-plus"></i></span>
                                                </button>
                                            </div>) : (
                                                <div class="col-2 second-division">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeRow(index)}
                                                        className="remove-btn"
                                                    >
                                                        <span><i class="fa-solid fa-minus"></i></span>
                                                    </button>
                                                </div>
                                            )
                                        }

                                    </div>
                                ))
                            }



                        </div>




                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button type="button" class="btn btn-success" onClick={handleSave} autoFocus>Save</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCancel}>Cancel</button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default Header;