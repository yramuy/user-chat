import React from "react";
import Layout from "./index";
import { useParams } from "react-router-dom";

const UserChat = () => {

    const { chatId } = useParams();

    return (
        <>
            <Layout>
                <h2>Collapsible Sidebar Using Bootstrap 4 Chat Id : {chatId}</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            </Layout>
        </>
    );
};

export default UserChat;