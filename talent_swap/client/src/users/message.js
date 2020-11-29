class Message {
    constructor(json=null) {
        this.timestamp = 0;
        this.senderName = "";
        this.receiverName = "";
        this.contents = "";
        Object.assign(
            this,
            typeof json === "string" ? JSON.parse(json) : json
        );
    }
}

export default Message;