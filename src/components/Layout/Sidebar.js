import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {

    return (
        <>
            <div class="sidebar-header">
                <h3>User Chat</h3>
            </div>

            <ul class="list-unstyled components">
                <p>Dummy Heading</p>
                <li class="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Groups</a>
                    <ul class="collapse list-unstyled" id="homeSubmenu">
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
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Indivisual</a>
                    <ul class="collapse list-unstyled" id="pageSubmenu">
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