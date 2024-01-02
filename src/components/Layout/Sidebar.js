import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetApiService, PostApiService } from "../Apis/ApiService";

const Sidebar = () => {

    const [menuList, setMenuList] = useState([]);
    const [subMenuList, setSubMenuList] = useState([]);
    const loginUserId = sessionStorage.getItem("userId");
    const { chatId } = useParams();
    const [menuId, setMenuId] = useState("");

    useEffect(() => {
        fetchMenus('/ProjectApis/v1/chatMenus');
    }, []);

    useEffect(() => {
        getUserDataByChatId();
    }, [chatId]);

    const getUserDataByChatId = async () => {
        const url = '/ProjectApis/v1/userDataByChatId';
        const body = JSON.stringify({
            chat_id: chatId
        });

        await PostApiService(url, body).then((data) => {
            var response = data.chat;
            console.log("response", response)
            if (data.status === 1) {
                setMenuId(response[0]['chat_type_id']);
            }
        })
    }

    const fetchMenus = async (url) => {
        try {

            const body = JSON.stringify({
                user_id: loginUserId
            });

            await PostApiService(url, body).then((data) => {
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

                <ul className="list-unstyled components">
                    {
                        menuList.map((menu) => (
                            <li className="active" key={menu.id}>
                                <a href={`#${menu.name}`} data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">{menu.name}</a>
                                <ul className={menuId !== menu.id ? "collapse list-unstyled" : "list-unstyled"} id={menu.name}>
                                    {
                                        menu.sub_menus.map((submenu) => (

                                            <li key={submenu.sub_menu_id}>
                                                {
                                                    chatId === submenu.sub_menu_id ?
                                                        (<Link to={`/user-chat/${submenu.sub_menu_id}`} style={{ background: "darkslategray" }}>{loginUserId !== submenu.user_id ? submenu.sub_menu : submenu.sub_menu + " (You)"}</Link>) :
                                                        (<Link to={`/user-chat/${submenu.sub_menu_id}`} >{loginUserId !== submenu.user_id ? submenu.sub_menu : submenu.sub_menu + " (You)"}</Link>)
                                                }
                                            </li>


                                        ))
                                    }

                                </ul>

                            </li>
                        ))
                    }

                </ul>
            </div>


        </>


    );
};

export default Sidebar;