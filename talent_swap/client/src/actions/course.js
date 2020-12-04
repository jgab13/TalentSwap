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

export const deleteCourse = (id) => {
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

export const addReview = (id, review) => {
    // the URL for the request
    const url = "/api/courses/" + id;
    console.log(url)

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({
            user: review.user,
            date: review.date,
            description: review.description,
            rating: review.rating
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                    return res.json(); //this returns the entire course - probably better to only return the review
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const editReview = (id, revid, review) => {
    // the URL for the request
    const url = "/api/courses/" + id + "/" + revid;
    console.log(url)

    const request = new Request(url, {
        method: "patch",
        body: JSON.stringify({
            date: review.currentUser,
            description: review.description,
            rating: review.rating
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                    return res.json(); //this returns the entire course - probably better to only return the review
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const deleteReview = (id, revid) => {
    // the URL for the request
    const url = "/api/courses/" + id + "/" + revid;
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
                    return res.json(); //this returns the entire course - probably better to only return the review
            }
        })
        .catch(error => {
            console.log(error);
        });
};

//Use the enrollment API for enroll in course


