import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetApiService, PostApiService } from "../Apis/ApiService";

const Sidebar = () => {

    const [menuList, setMenuList] = useState([]);
    const [subMenuList, setSubMenuList] = useState([]);

    useEffect(() => {
        fetchMenus('/ProjectApis/v1/chatMenus');
    }, []);

    const fetchMenus = async (url) => {
        try {

            await GetApiService(url).then((data) => {
                console.log("list", data);
                console.log("menus", data.menus);
                console.log("sub menus", data.menus[0].sub_menus);

                if (data.status === 1) {
                    setMenuList(data.menus);
                }
            });

        } catch (error) {

        }
    };

    return (
        <>
            <div className="sidebar-header">
                <h3>User Chat</h3>
            </div>

            <ul className="list-unstyled components">
                <p>Dummy Heading</p>
                {
                    menuList.map((menu) => (
                        <li className="active" key={menu.id}>
                            <a href={`#${menu.name}`} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">{menu.name}</a>
                            <ul className="collapse list-unstyled" id={menu.name}>
                                {
                                    menu.sub_menus.map((submenu) => (

                                        <li key={submenu.sub_menu_id}>
                                            <Link to={`/user-chat/${submenu.sub_menu_id}`}>{submenu.sub_menu}</Link>
                                        </li>


                                    ))
                                }

                            </ul>

                        </li>
                    ))
                }
                {/* <li className="active">
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
                </li> */}

            </ul>
        </>


    );
};

export default Sidebar;