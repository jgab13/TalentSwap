import Message from "./message";
const hardCodedMessages = [
    new Message({
        timestamp: 1000,
        senderName: 1,
        receiverName: 2,
        contents: "Hi User 2!!!"
    }),
    new Message({
        timestamp: 9000,
        senderName: 2,
        receiverName: 1,
        contents: "Hello!!!"
    }),
    new Message({
        timestamp: 9001,
        senderName: 2,
        receiverName: 1,
        contents: "Yo"
    }),
    new Message({
        timestamp: 9002,
        senderName: 2,
        receiverName: 1,
        contents: "Wanna teach me some stuff"
    }),
    new Message({
        timestamp: 9003,
        senderName: 2,
        receiverName: 1,
        contents: "In exchange I will teach you some stuff"
    }),
]

class User {
    constructor(json=null) {
        this.id = ""; // username
        this.userType = "user";
        this.name = "";
        this.credits = 0;
        this.bio = "";
        this.expertise = "";
        this.development = "";
        this.coursesTeaching = [];
        this.coursesLearning = [];
        this.pic = "";
        Object.assign(
            this,
            typeof json === "string" ? JSON.parse(json) : json
        );
    }

    changeName = (newName) => {
        // Needs server call
        this.name = newName;
        return true;
    };

    changeBio = (newBio) => {
        // Needs server call
        this.bio = newBio;
        return true;
    };

    changeExpertise = (newExpertise) => {
        // Needs server call
        this.expertise = newExpertise;
        return true;
    };

    changeDevelopment = (newDevelopment) => {
        // Needs server call
        this.development = newDevelopment;
        return true;
    };

    getContactIds = () => {
        // Needs server call
        const sortedMessages = hardCodedMessages
            .sort(
                (message1, message2) => {
                    if (message1.timestamp > message2.timestamp) {
                        return -1;
                    }
                    if (message1.timestamp < message2.timestamp) {
                        return 1;
                    }
                    return 0;
                }
            );
        const receivers = sortedMessages
            .filter(message => message.senderName === this.id)
            .map(message => message.receiverName);
        const senders = sortedMessages
            .filter(message => message.receiverName === this.id)
            .map(message => message.senderName);
        return Array.from(new Set([...receivers, ...senders]));
    }

    getMessagesFromContact = (contactId) => {
        // Needs server call
        const sortByTimestamp = (message1, message2) => {
            if (message1.timestamp > message2.timestamp) {
                return 1;
            }
            if (message1.timestamp < message2.timestamp) {
                return -1;
            }
            return 0;
        };
        const sentMessages = hardCodedMessages
            .filter(message => message.senderName === this.id);
        const receivedMessages = hardCodedMessages
            .filter(message => message.receiverName === this.id);
        return Array.from(new Set([...sentMessages, ...receivedMessages])).sort(sortByTimestamp);
    }

    sendMessage = (userId, contents) => {
        // Needs server call
        hardCodedMessages.push(
            new Message({
                timestamp: Date.now(),
                senderName: this.id,
                receiverName: userId,
                contents: contents
            })
        )
    }
}

export default User;