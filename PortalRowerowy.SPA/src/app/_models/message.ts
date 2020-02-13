export interface Message {
    id: number;
    senderId: number;
    senderUserName: string;
    senderPhotoUrl: string;
    recipientId: number;
    recipientUserName: string;
    recipientPhotoUrl: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    dateSend: Date;
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