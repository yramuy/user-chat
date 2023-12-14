import React, { useEffect, useState } from "react";
import Layout from "./index";
import { useParams } from "react-router-dom";
import { PostApiService } from "../Apis/ApiService";
import userImg from '../../images/img_avatar.png';

const UserChat = () => {

    const { chatId } = useParams();
    const senderId = sessionStorage.getItem('userId');
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        getUserDataByChatId();
    }, [chatId]);


    const getUserDataByChatId = async () => {
        console.log("calling---------------")
        const url = '/ProjectApis/v1/userDataByChatId';
        const body = JSON.stringify({
            chat_id: chatId
        });

        await PostApiService(url, body).then((data) => {
            var response = data.chat;
            console.log("response", response)
            if (data.status === 1) {
                getUserChatData(response[0]['user_id'],response[0]['chat_type_id']);
            }
        })
    }

    const getUserChatData = async (receiverId,menuId) => {
        const url = '/ProjectApis/v1/userChatData';
        const body = JSON.stringify({
            senderId: senderId,
            receiverId: receiverId,
            menuId: menuId,
            subMenuId: chatId
        });

        console.log('object', body)

        await PostApiService(url, body).then((data) => {
            console.log("chats ", data.userChat)
            if (data.status === 1) {
                setChatList(data.userChat);
            } else {
                setChatList([]);
            }
        });

        console.log("chat body", body)
    }

    return (
        <>
            <Layout>
                {
                    chatList.length > 0 ? chatList.map((chat) => (
                        <div className="row">
                            <div className="col-1">
                                <img src={chat.image} alt="Avatar" style={{ width: "50px", height: "40px", borderRadius: "50%"}}/>
                            </div>
                            <div className="col-5">
                                <div style={{display:'flex', gap:'10px'}}><span>{chat.full_name}</span><span style={{opacity: '0.5'}}>{chat.chat_time}</span></div>
                                <p style={{ inlineSize: "670px", overflowWrap: "break-word" }}>{chat.message}</p>
                            </div>
                            <div className="col-4">{chat.chat_date}</div>
                        </div>
                    )) : (
                        <div className="row">
                            <div className="col-11">No Chat Data found!</div>
                        </div>
                    )
                }


            </Layout>
        </>
    );
};

export default UserChat;