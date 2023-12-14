import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserChat from "./components/Layout/UserChat";
import Login from "./components/Login";

const App = () => {
    return (

        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/user-chat/:chatId" element={<UserChat />} />
                </Routes>
            </BrowserRouter>
        </div>



    );
}

export default App;