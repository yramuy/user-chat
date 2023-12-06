import React, { useState } from "react";
import "../../components/style.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {

    const [isActive, setIsActive] = useState(false);

    const handleSidebarToggle = () => {
        setIsActive(prevState => !prevState);

    }

    return (
        <>
            <div className="wrapper">
                {/* <!-- Sidebar  --> */}
                <nav id="sidebar" className={isActive ? 'active' : ""}>
                    <Sidebar />
                </nav>

                {/* <!-- Page Content  --> */}
                <div id="content">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light header-menu">
                        <div className="container-fluid">

                            <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={handleSidebarToggle}>
                                <i className="fas fa-align-left"></i>
                                <span>Toggle Sidebar</span>
                            </button>
                            <button className="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fas fa-align-justify"></i>
                            </button>

                            <Header />
                        </div>
                    </nav>

                    <div className="user-content">
                        {children}
                    </div>

                    <div className="line"></div>

                    <div className="user-chat">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Please enter your message..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button" style={{ height: "65px" }}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;