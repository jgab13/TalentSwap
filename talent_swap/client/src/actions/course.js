export const CreateCourse = (userInput) => {

    const request = new Request("api/courses", {
        method: "post",
        body: JSON.stringify({
            topic: userInput.topic,
            teacher: userInput.currentUser,
            starttime: new Date(userInput.date + " " + userInput.starttime),
            endtime: new Date(userInput.date + " " + userInput.endtime),
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

export const getCourse = (course, id) => {
    // the URL for the request
    const url = "/api/courses/" + id;
    console.log(url)

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not retrieve course");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            console.log(json.course)
            course.setState({
                course: json.course
            })
            // course.setState({ studentList: json.students });
        })
        .catch(error => {
            console.log(error);
        });
};

export const deleteCourse = (course, id) => {
    // the URL for the request
    const url = "/api/courses/" + id;
    console.log(url)

    const request = new Request(url, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

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
