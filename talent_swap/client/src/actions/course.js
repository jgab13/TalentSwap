export const CreateCourse = (userInput) => {

    const request = new Request("api/courses", {
        method: "post",
        body: JSON.stringify({
            topic: userInput.topic,
            teacher: userInput.teacher,
            starttime: new Date(userInput.date + "" + userInput.starttime),
            endtime: new Date(userInput.date + "" + userInput.endtime),
            credit: userInput.credit,
            capacity: userInput.capacity,
            area: userInput.area,
            description: userInput.description
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    console.log(request)

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                    return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
};