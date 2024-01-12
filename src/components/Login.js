import React, { useState } from "react";
import UserImg from '../images/user1.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import { PostApiService } from "./Apis/ApiService";

const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showMsg, setShowMsg] = useState(false);
    const [chatId, setChatId] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const url = '/ProjectApis/v1/loginWithMobNumOrUsrname';
            const body = JSON.stringify({
                mobnumber: "",
                username: userName,
                password: password,
            });

            await PostApiService(url, body).then((data) => {
                if (data.status === 1) {

                    const userData = data.userDetails;
                    sessionStorage.setItem("userId", userData.user_id);
                    sessionStorage.setItem("userName", userData.user_name);
                    sessionStorage.setItem("userRoleId", userData.user_role_id);
                    sessionStorage.setItem("userRole", userData.role_name);
                    sessionStorage.setItem("userImg", userData.image);
                    sessionStorage.setItem("empName", userData.emp_name);
                    sessionStorage.setItem("empNumber", userData.emp_number);

                    getChatIdByUserId(userData.user_id);
                } else {
                    setShowMsg(true);
                    navigate('/', { replace: true });
                }
            });

        } catch (error) {
            console.log(error.message)
        }
    }

    const getChatIdByUserId = async (id) => {

        const url = '/ProjectApis/v1/chatDataByUserId';
        const body = JSON.stringify({
            user_id: id
        });

        await PostApiService(url, body).then((data) => {
            console.log(data)
            var res = data.user;
            console.log("response", res)
            if (data.status === 1) {
                var chat_id = res[0]['id'];
                setShowMsg(false);
                navigate(`/user-chat/${chat_id}`, { replace: true });
                // navigate('/sample', { replace: true });
            }
        });
    }


    return (
        <>

            <div className="container">
                <div className="row m-5 no-gutters shadow-lg">
                    <div className="col-md-6 d-none d-md-block">
                        <img src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80" className="img-fluid" style={{ height: '509px', width: '495px' }} />
                    </div>
                    <div className="col-md-6 bg-white p-5">

                        <div className="form-style">
                            <img src={UserImg} alt="Avator" style={{ height: '117px' }} />
                            <form>
                                <div className="form-group pb-3">
                                    <input type="email"
                                        placeholder="Email or Username"
                                        className="form-control"
                                        id="username"
                                        name="username"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)} />
                                </div>
                                <div className="form-group pb-3">
                                    <input type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="pb-2">
                                    <button type="submit" className="btn btn-dark w-100 font-weight-bold mt-2" onClick={handleLogin}>Login</button>
                                </div>
                            </form>


                        </div>

                    </div>
                </div>

            </div>
        </>
    );
};

export default Login;