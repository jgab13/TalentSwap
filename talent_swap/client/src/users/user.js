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
        this.username = ""; // username
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

    getContactUsernames = async () => {
        const request = new Request("/api/message-contacts", {
            method: "get"
        });
        try {
            const res = await fetch(request);
            if (res.status === 200) {
                return res.json();
            }
        } catch (error) {
            console.log(error);
        }
    }

    getMessagesFromContact = async (contactUsername) => {
        const request = new Request(`/api/messages/${contactUsername}`, {
            method: "get"
        })
        try {
            const res = await fetch(request);
            if (res.status === 200) {
                return res.json();
            }
        } catch (error) {
            console.log(error);
        }
    }

    sendMessage = (username, contents) => {
        // Needs server call
        hardCodedMessages.push(
            new Message({
                timestamp: Date.now(),
                senderName: this.username,
                receiverName: username,
                contents: contents
            })
        )
    }
}

export default User;