import React, { useEffect, useRef, useState } from "react";
import "../../components/style.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { PostApiService, PostAttachmentService } from "../Apis/ApiService";
import UserChat from "./UserChat";

const Layout = ({ children }) => {

    const [isActive, setIsActive] = useState(false);
    const [message, setMessage] = useState("");
    const { chatId } = useParams();
    const senderId = sessionStorage.getItem('userId');
    const [receiverId, setReceiverId] = useState(0);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [fileStatus, setFileStatus] = useState(0);
    const [fileObject, setFileObject] = useState({ "obj": "" });
    const [file, setFile] = useState();


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
                setReceiverId(response[0]['user_id']);
                setUserName(response[0]['fullName']);
            }
        })
    }

    const handleSidebarToggle = () => {
        setIsActive(prevState => !prevState);

    }

    const handleChange = (e) => {
        setMessage(e.target.value);

        if (e.target.value === "") {
            setFileStatus(0);
        }
    }

    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    console.log("window height ", windowSize.current[1])

    const fileStyle = {
        height: "4.2rem"
    }

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleFileChange = event => {


        setFile(event.target.files[0])

        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        // 👇️ reset file input
        event.target.value = null;

        setMessage(fileObj.name);

        if (fileObj.name !== "") {
            setFileStatus(1);
        }
    };

    console.log("file object", file)

    const handleMessagePost = async (e) => {
        e.preventDefault();

        // Create an object of formData

        var formData = new FormData();
        formData.append('sender_id', senderId);
        formData.append('chat_id', chatId);
        formData.append('receiver_id', receiverId);
        formData.append('message', message);
        formData.append('file', file);
        // formData.append('fileName', file.name);
        formData.append('fileStatus', fileStatus);

        const url = "/ProjectApis/v1/saveUserChat";

        await PostAttachmentService(url, formData).then((data) => {

            if (data.status === 1) {

                window.location.reload(`/user-chat/${chatId}`);

                setMessage("");
                console.log(data.message);
            } else {
                console.log(data.message);
            }
        });

        // if (fileStatus === 0) {

            // const body = JSON.stringify({
            //     sender_id: senderId,
            //     chat_id: chatId,
            //     receiver_id: receiverId,
            //     message: message

            // });
            // await PostApiService(url, body).then((data) => {

            //     if (data.status === 1) {
            //         // navigate(`/user-chat/${chatId}`);
            //         window.location.reload(`/user-chat/${chatId}`);
            //         // window.Location.replace(`/user-chat/${chatId}`);
            //         setMessage("");
            //         console.log(data.message);
            //     } else {
            //         console.log(data.message);
            //     }
            // });
            // const url = "/ProjectApis/v1/saveUserChat";
            // const body = {file: file,sender_id: senderId,chat_id: chatId,receiver_id: receiverId,message: message};

            // fetch('/ProjectApis/v1/saveUserChat', {
            //     method: 'POST',
            //     body: {file: file,sender_id: senderId,chat_id: chatId,receiver_id: receiverId,message: message},
            //     // 👇 Set headers manually for single file upload
            //     headers: {
            //         "Authorization": "b8416f2680eb194d61b33f9909f94b9d",
            //         "Content-Type": "multipart/form-data",
            //     }
            // }).then((res) => res.json()).then((data) => console.log(data)).catch((err) => console.error(err));
        // } else {
            // fetch('/ProjectApis/v1/saveUserChatMediaData', {
            //     method: 'POST',
            //     body: {file: file,sender_id: senderId,chat_id: chatId,receiver_id: receiverId,message: message},
            //     // 👇 Set headers manually for single file upload
            //     headers: {
            //         "Authorization": "b8416f2680eb194d61b33f9909f94b9d",
            //         "Content-Type": "multipart/form-data",
            //     }
            // })
            //     .then((res) => res.json())
            //     .then((data) => console.log(data))
            //     .catch((err) => console.error(err));
        // }

    }



    return (
        <>
            <div className="wrapper">
                {/* <!-- Sidebar  --> */}
                <nav id="sidebar" className={isActive ? 'active' : ""}>
                    {/* <div className="sidebar-title">
                        <h3>User Chat</h3>
                    </div> */}

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
                            <h4>{senderId !== receiverId ? userName : userName + " (You)"}</h4>
                        </div>


                        <Header />

                    </nav>

                    <div className="user-content">
                        {children}
                    </div>

                    {/* <div className="line"></div> */}

                    <div className="user-chat">
                        {/* /<form encType="multipart/form-data"> */}
                        <input
                            style={{ display: 'none' }}
                            ref={inputRef}
                            type="file"
                            onChange={handleFileChange}
                        />

                        <input
                            type="hidden"
                            name="fileStatus"
                            value={fileStatus}
                        />

                        <input
                            type="hidden"
                            name="sender"
                            value={senderId}
                        />

                        <input
                            type="hidden"
                            name="receiver"
                            value={receiverId}
                        />

                        <input
                            type="hidden"
                            name="chatId"
                            value={chatId}
                        />


                        <div className="input-group mb-3">
                            <input type="text"
                                className="form-control"
                                name="message"
                                placeholder="Write your message..."
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={(e) => handleChange(e)}
                                value={message}
                            />
                            <div class="input-group-btn">
                                <button class="btn btn-default" type="submit" style={fileStyle} onClick={handleClick}><i class="fa-solid fa-paperclip"></i></button>
                            </div>
                            <div className="input-group-append">
                                {
                                    message !== "" ? (<button type="submit" class="btn btn-success" style={{ height: "65px" }} onClick={handleMessagePost}>Send</button>) : (<button type="button" class="btn btn-success send-btn" style={{ height: "65px", cursor: "not-allowed", opacity: "0.6" }} disabled>Send</button>)
                                }

                            </div>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;