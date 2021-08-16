import React from 'react'
import { useParams } from 'react-router';
import { Button, Icon, IconButton, Modal } from 'rsuite'
import { useCurrentRoom } from '../../../context/Current-room-context'
import { useModalState } from '../../../misc/CustomHooks';
import { auth, database } from '../../../misc/firebase';

const AskFcmBtnModal = () => {

    const { chatId } = useParams();
    const isReceivingFcm = useCurrentRoom((v) => v.isReceivingFcm);
    const { isOpen, close, open } = useModalState();

    const onAccept = () => {
        database
            .ref(`/rooms/${chatId}/fcmUsers`)
            .child(auth.currentUser.uid)
            .set(true);
    }
    const onCancel = () => {

        database
            .ref(`/rooms/${chatId}/fcmUsers`)
            .child(auth.currentUser.uid)
            .remove();
    }


    return (
        <>
            <IconButton
                icon={<Icon icon="podcast" />}
                color="blue"
                size="sm"
                circle
                appearance={isReceivingFcm ? "default" : "ghost"}
                onClick={open}
            />

            <Modal show={isOpen} onHide={close} size="xs" backdrop="static">
                <Modal.Header>
                    <Modal.Title>Notification Permission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        isReceivingFcm ? (
                            <div className="text-center">
                                <Icon className="text-green mb-3" icon="check-circle" size="5x" />
                                <h6>You are subscribed to broadcast messages sent by admins of this rooms</h6>
                            </div>) : (
                            <div className="text-center">
                                <Icon className="text-blue mb-3"
                                    icon="question-circle"
                                    size="5x"
                                />
                                <h6>
                                    Do you want to subscribe to messages sent by admins of this room ?
                                </h6>
                            </div>
                        )}
                    <p className="mt-2">
                        To receive notification make sure you allow Notifications in your browser
                    </p>
                    <p>
                        Permission:{' '} {Notification.permission === 'granted' ? (
                            <span className="text-green">
                                Granted
                            </span>
                        ) : (
                            <span className="text-red">
                                Denied
                            </span>
                        )}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    {
                        isReceivingFcm ?
                            <Button color="green" onClick={onCancel}>
                                I Changed my mind
                            </Button> :
                            <Button color="green" onClick={onAccept}>
                                Yes, I do
                            </Button>
                    }
                    <Button onClick={close}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AskFcmBtnModal
