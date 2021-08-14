/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { auth, database } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const Messeges = () => {

    const { chatId } = useParams();
    const [messages, setMessages] = useState(null);

    const isChatEmpty = messages && messages.length === 0;
    const canShowMessages = messages && messages.length > 0;

    useEffect(() => {
        const messageRef = database.ref('/messages');
        messageRef.orderByChild('roomId').equalTo(chatId).on('value', (snap) => {
            const data = transformToArrWithId(snap.val());

            setMessages(data);
        })

        return () => {
            messageRef.off('value');
        }

    }, [chatId]);


    const handleAdmin = useCallback(async (uid) => {
        const adminsRef = database.ref(`/rooms/${chatId}/admins`);

        let alertMsg;

        await adminsRef.transaction(admins => {

            if (admins) {
                if (admins[uid]) {
                    admins[uid] = null;
                    alertMsg = 'Admin permission removed';
                } else {
                    admins[uid] = true;
                    alertMsg = 'Admin permission granted';
                }
            }
            return admins;
        })
        Alert.info(alertMsg, 4000);

    }, [chatId]);

    const handleLike = useCallback(async (msgId) => {
        const { uid } = auth.currentUser;
        const messageRef = database.ref(`/messages/${msgId}`);

        let alertMsg;

        await messageRef.transaction(msg => {

            if (msg) {
                if (msg.likes && msg.likes[uid]) {
                    msg.likeCount -= 1;
                    msg.likeCount[uid] = null;
                    alertMsg = 'DisLiked';
                } else {
                    msg.likeCount += 1;
                    if (!msg.likes) {
                        msg.likes = [];
                    }
                    msg.likes[uid] = true;
                    alertMsg = 'Liked';
                }
            }
            return msg;
        })
        Alert.info(alertMsg, 4000)
    }, []);

    const handleDelete = useCallback(async (msgId) => {
        // eslint-disable-next-line no-alert
        if (!window.confirm('Delete this message?')) {
            return;
        }
        const isLast = messages[messages.length - 1].id === msgId;
        const updates = {};
        updates[`/messages/${msgId}`] = null;

        if (isLast && messages.length > 1) {
            updates[`/rooms/${chatId}/lastMessage`] = {
                ...messages[messages.length - 2],
                msgId: messages[messages.length - 2].id
            }
        }

        if (isLast && messages.length === 1) {
            updates[`/rooms/${chatId}/lastMessage`] = null;
        }

        try {
            await database.ref().update(updates);
            Alert.info('Message has been deleted');
        } catch (err) {
            Alert.err(err.message);
        }

    }, [chatId, messages]);

    return (
        <ul className="msg-list custom-scroll">
            {isChatEmpty &&
                <li>No Messeges yet</li>
            }
            {canShowMessages &&
                messages.map(msg =>
                    <MessageItem
                        key={msg.id}
                        message={msg}
                        handleAdmin={handleAdmin}
                        handleLike={handleLike}
                        handleDelete={handleDelete}
                    />)
            }
        </ul>
    )
}

export default Messeges
