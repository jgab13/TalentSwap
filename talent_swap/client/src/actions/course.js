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

    return fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateCourse = (attributes, values, id) => {
    const url = "/api/courses/update/" + id;
    const request = new Request(url, {
        method: "PATCH",
        body: JSON.stringify({
            attr: attributes,
            newValue: values
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

//Jonathan addes this route for get all
export const getCourses = (app) => {
    // the URL for the request
    const url = "/api/courses";
    // console.log(url)

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
            // console.log(json.courses)
            app.setState({
                courses: json.courses
            })
        })
        .catch(error => {
            console.log(error);
        });
};

export const getSearchedCourses = async (searchBoxComp, keyword) => {
    // the URL for the request
    let url
    if (keyword)
        url = "/api/courses/keyword="+keyword
    else 
        url = "/api/courses"
    console.log("searching the database...")

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert(`No courses found for "${keyword}". Please try another keyword.`);
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            // console.log(json.courses)
            // let allCourses = json.courses;
            // if (keyword) {
            //     console.log(`searching for ${keyword}`)
            //     const topicMatch = allCourses.filter(course =>
            //         course.topic.toLowerCase().match(keyword.toLowerCase()))
            //     const descMatch = allCourses.filter(course =>
            //         course.description.toLowerCase().match(keyword.toLowerCase()))
            //     allCourses = topicMatch.concat(descMatch)
            // }
            // app.setState({
            //     searchedCourses: allCourses,
            //     keyword: keyword
            // })
            console.log("setting redirectObject for searchBox")
            searchBoxComp.setState({
                redirectObject: {
                    pathname: '/Search',
                    search: keyword ? '?query=' + keyword : '',
                    state: {
                        searchedCourses: json.searchedCourses,
                        searchKeyword: keyword
                    }
                }
            });
            
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

export const editReview = (id, review) => {
    // the URL for the request
    const url = "/api/courses/" + id;
    console.log(url)

    const request = new Request(url, {
        method: "PATCH",
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
            } else {
                console.log(res.status)
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const deleteReview = (id, user) => {
    // the URL for the request
    const url = "/api/courses/review/" + id;
    console.log(url)

    const request = new Request(url, {
        method: "delete",
        body: JSON.stringify({
            user: user
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

//Use the enrollment API for enroll in course
export const enroll = (app, user, courseID) => {
    // the URL for the request
    const url = "/api/enrollment";

    const request = new Request(url, {
        method: "post",
        body: JSON.stringify({
            username: user,
            courseId: courseID
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json(); //this returns 
            }
            else if (res.status === 400){
                alert('Enrollment unsuccessful')
            } else if (res.status === 402){
                alert('User is already enrolled')
            } else {
                console.log(res.status)
                alert('Insufficient credits to enroll in course!')
            }
        }).then(json => {
            app.setState({
                enrolled: !app.state.enrolled,
                course: json.course,
                currUser: json.user.username,
                enrollment: json.course.enrolledUsers
            })
        })
        .catch(error => {
            console.log(error);
        });
};


