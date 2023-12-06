import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {

    useEffect(() => {
        fetchMenus('/rest_apis/v1/sidebarMenus');
    }, []);

    const fetchMenus = async (url) => {

        try {
            await fetch(url, {
                method: 'GET',
                headers: {
                    "Authorization": "b8416f2680eb194d61b33f9909f94b9d",
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {

                if (data.status === 1) {

                    console.log(data);

                    // const userData = data.userDetails;
                    // sessionStorage.setItem("userId", userData.user_id);
                    // sessionStorage.setItem("userName", userData.user_name);
                    // sessionStorage.setItem("userRoleId", userData.user_role_id);
                    // sessionStorage.setItem("userRole", userData.role_name);
                    // sessionStorage.setItem("userImg", userData.image);
                    // sessionStorage.setItem("empName", userData.emp_name);
                    // sessionStorage.setItem("empNumber", userData.emp_number);

                    // setShowMsg(false);
                    // navigate('/home', { replace: true });
                } else {
                    // setShowMsg(true);
                    // navigate('/', { replace: true });
                }

                console.log(data.message);

            });
        } catch (error) {
            
        }

        // await ApiService(url).then((data) => {
        //     console.log(data)
        // });
    }

    return (
        <>
            <div className="sidebar-header">
                <h3>User Chat</h3>
            </div>

            <ul className="list-unstyled components">
                <p>Dummy Heading</p>
                <li className="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Groups</a>
                    <ul className="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <Link to="/user-chat/1">Home 1</Link>
                        </li>
                        <li>
                            <Link to="/user-chat/2">Home 2</Link>
                        </li>
                        <li>
                            <Link to="/user-chat/3">Home 3</Link>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Indivisual</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <a href="#">Page 1</a>
                        </li>
                        <li>
                            <a href="#">Page 2</a>
                        </li>
                        <li>
                            <a href="#">Page 3</a>
                        </li>
                    </ul>
                </li>

            </ul>
        </>


    );
};

export default Sidebar;