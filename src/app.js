import React from "react";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserChat from "./components/Layout/UserChat";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}/>
                    <Route path="/user-chat/:chatId" element={<UserChat />}/>
                </Routes>
            </BrowserRouter>
        </>


    );
}

export default App;