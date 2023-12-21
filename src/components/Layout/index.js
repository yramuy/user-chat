import React, { useEffect, useState } from "react";
import "../../components/style.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { PostApiService } from "../Apis/ApiService";
import UserChat from "./UserChat";

const Layout = ({ children }) => {

    const [isActive, setIsActive] = useState(false);
    const [message, setMessage] = useState("");
    const { chatId } = useParams();
    const senderId = sessionStorage.getItem('userId');
    const [receiverId, setReceiverId] = useState(0);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

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
            if(data.status === 1){
                setReceiverId(response[0]['user_id']);
                setUserName(response[0]['fullName']);
            }
        })
    }

    const handleSidebarToggle = () => {
        setIsActive(prevState => !prevState);

    }

    const handleMessagePost = async (e) => {
        e.preventDefault();

        const url = "/ProjectApis/v1/saveUserChat";
        const body = JSON.stringify({
            sender_id:senderId,
            chat_id:chatId,
            receiver_id:receiverId,
            message:message

        });
        console.log("body ",body)
        await PostApiService(url, body).then((data) => {

            if (data.status === 1){
                // navigate(`/user-chat/${chatId}`);
                window.location.reload(`/user-chat/${chatId}`);
                // window.Location.replace(`/user-chat/${chatId}`);
                setMessage("");                
                console.log(data.message);
            }else{
                console.log(data.message);
            }
        });

    }

    // const windowSize = useRef([window.innerWidth, window.innerHeight]);

    return (
        <>
            <div className="wrapper">
                {/* <!-- Sidebar  --> */}
                <nav id="sidebar" className={isActive ? 'active' : ""}>
                    <div className="sidebar-title">
                        <h3>User Chat</h3>
                    </div>

                    <Sidebar />
                </nav>

                {/* <!-- Page Content  --> */}
                <div id="content">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light header-menu">
                        

                            <button type="button" id="sidebarCollapse" className="btn btn-info" onClick={handleSidebarToggle}>
                                <i className="fas fa-align-left"></i>
                                {/* <span>Toggle Sidebar</span> */}
                            </button>

                            <div className="user-div">
                                <h4>{senderId !== receiverId ? userName : userName+" (You)"}</h4>
                            </div>


                            <Header />
                        
                    </nav>

                    <div className="user-content">
                        {children}
                    </div>

                    {/* <div className="line"></div> */}

                    <div className="user-chat">
                        <div className="input-group mb-3">
                            <input type="text"
                                className="form-control"
                                placeholder="Write your message..."
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={(e) => setMessage(e.target.value)}
                                value={message}
                            />
                            <div className="input-group-append">
                                {
                                    message !== "" ? (<button type="submit" class="btn btn-success" style={{ height: "65px" }} onClick={handleMessagePost}>Send</button>) : (<button type="button" class="btn btn-success send-btn" style={{ height: "65px", cursor: "not-allowed", opacity: "0.6" }} disabled>Send</button>)
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;