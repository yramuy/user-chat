import React, { useState } from "react";
import "../../components/style.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./UserChat";

const Layout = ({ children }) => {

    const [isActive, setIsActive] = useState(false);

    const handleSidebarToggle = () => {
        setIsActive(prevState => !prevState);

    }

    return (
        <>
            <div class="wrapper">
                {/* <!-- Sidebar  --> */}
                <nav id="sidebar" className={isActive ? 'active' : ""}>
                    <Sidebar />
                </nav>

                {/* <!-- Page Content  --> */}
                <div id="content">

                    <nav class="navbar navbar-expand-lg navbar-light bg-light header-menu">
                        <div class="container-fluid">

                            <button type="button" id="sidebarCollapse" class="btn btn-info" onClick={handleSidebarToggle}>
                                <i class="fas fa-align-left"></i>
                                <span>Toggle Sidebar</span>
                            </button>
                            <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i class="fas fa-align-justify"></i>
                            </button>

                            <Header />
                        </div>
                    </nav>

                    <div className="user-content">
                        {children}
                    </div>

                    <div class="line"></div>

                    <div className="user-chat">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Please enter your message..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" style={{ height: "65px" }}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;