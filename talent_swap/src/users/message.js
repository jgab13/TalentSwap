class Message {
    constructor(json=null) {
        this.timestamp = 0;
        this.senderId = 0;
        this.receiverId = 0;
        this.contents = "";
        Object.assign(
            this,
            typeof json === "string" ? JSON.parse(json) : json
        );
    }
}

export default Message;