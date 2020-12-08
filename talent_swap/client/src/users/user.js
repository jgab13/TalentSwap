import Message from "./message";

async function fetchPatch(payload) {
    const request = new Request("/api/users", {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    try {
        console.log("HI")
        const res = await fetch(request);
        console.log(res)
        if (res.status === 200) {
            return res.json();
        }
    } catch (error) {
        console.log(error);
    }
}

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

    changeName = async (newName) => {
        this.name = newName;
        await fetchPatch({name: newName});
    };

    changeBio = async (newBio) => {
        this.bio = newBio;
        await fetchPatch({bio: newBio});
    };

    changeExpertise = async (newExpertise) => {
        this.expertise = newExpertise;
        await fetchPatch({expertise: newExpertise});
    };

    changeDevelopment = async (newDevelopment) => {
        this.development = newDevelopment;
        await fetchPatch({development: newDevelopment});
    };

    changePicture = async (newPicture) => {
        // newPicture is of type File (from input type="file")
        const reader = new FileReader();
        reader.onload = async () => {
            const result = reader.result;
            const base64string = btoa(result);
            await fetchPatch({pic: base64string});
            window.location.reload();
        };
        reader.onerror = error => console.log(error);
        reader.readAsBinaryString(newPicture);
    }

    getContactUsernames = async () => {
        const request = new Request("/api/message-contacts", {
            method: "GET"
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
            method: "GET"
        })
        try {
            const res = await fetch(request);
            if (res.status === 200) {
                const messagesArray = await res.json();
                return messagesArray.map(message => new Message(message));
            }
        } catch (error) {
            console.log(error);
        }
    }

    sendMessage = async (username, contents) => {
        const request = new Request("/api/messages", {
            method: "POST",
            body: JSON.stringify({
                target: username,
                contents: contents
            }),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
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
}

export default User;