import React, { useEffect, useState } from "react";
import Layout from "./index";
import { useParams } from "react-router-dom";
import { PostApiService } from "../Apis/ApiService";
import userImg from '../../images/img_avatar.png';
import { useDispatch, useSelector } from "react-redux";

const UserChat = () => {

    const { chatId } = useParams();
    const senderId = sessionStorage.getItem('userId');
    const [chatList, setChatList] = useState([]);

    const dispatch = useDispatch();

    let userChat = useSelector((state) => {
        return state.usersData.chatList;
    });


    useEffect(() => {
        dispatch(getUserDataByChatId);
    }, [userChat]);


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
                getUserChatData(response[0]['user_id'],response[0]['chat_type_id'])

            }
        })
    }

    const getUserChatData = async (receiverId, menuId) => {
        const url = '/ProjectApis/v1/userChatData';
        const body = JSON.stringify({
            senderId: senderId,
            receiverId: receiverId,
            menuId: menuId,
            subMenuId: chatId
        });

        console.log('object', body)

        await PostApiService(url, body).then((data) => {
            // console.log("chats ", data.userChat)
            if (data.status === 1) {
                // setChatList(data.userChat);
                dispatch({ type: "CHATLIST", payload: data.userChat });
            } else {
                // setChatList([]);
                dispatch({ type: "CHATLIST", payload: [] });
            }
        });

        console.log("chat chatList", chatList)
    }

    

    console.log("userChat111", userChat);

    return (
        <>
            <Layout>
                {
                    userChat.length > 0 ? userChat.map((chat) => (
                        <div className="row">
                            <div className="col-1">
                                <img src={chat.image} alt="Avatar" style={{ width: "50px", height: "40px", borderRadius: "50%" }} />
                            </div>
                            <div className="col-5">
                                <div style={{ display: 'flex', gap: '10px' }}><span>{chat.full_name}</span><span style={{ opacity: '0.5' }}>{chat.chat_time}</span></div>
                                {
                                    chat.file_status === '0' ? (
                                        <p style={{ inlineSize: "670px", overflowWrap: "break-word" }}>{chat.message}</p>
                                    ) : (
                                        <embed type="application/pdf" src={chat.user_chat_file} width="500px" height="250px" alt="pdf" background-color="0xFF525659" top-toolbar-height="56" full-frame="" internalinstanceid="21" title="CHROME"></embed>

                                    )
                                }

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