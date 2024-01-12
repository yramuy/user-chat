import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserChat from "./components/Layout/UserChat";
import Login from "./components/Login";
import Sample from "./components/sample";
import AccountForm from "./components/AccountForm";

const App = () => {
    return (

        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/user-chat/:chatId" element={<UserChat />} />
                    {/* <Route path="/" element={<Sample />}/> */}
                    <Route path="/account" element={<AccountForm />}/>
                </Routes>
            </BrowserRouter>
        </div>



    );
}

export default App;