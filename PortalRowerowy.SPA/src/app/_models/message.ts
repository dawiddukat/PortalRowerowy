export interface Message {
    id: number;
    senderId: number;
    senderUsername: string;
    senderPhotoUrl: string;
    recipientId: number;
    recipientUsername: string;
    recipientPhotoUrl: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    dateSent: Date;
}

// export interface Message {
//     id: string;
//     senderId: string;
//     senderUserName: string;
//     senderPhotoUrl: string;
//     recipientId: string;
//     recipientUserName: string;
//     recipientPhotoUrl: string;
//     content: string;
//     isRead: string;
//     dateRead: string;
//     dateSend: string;
// }