// Functions to help with user actions.
import User from "./../users/user"
// Send a request to check if a user is logged in through the session cookie
export const checkSession = async (app) => {
    const url = "/users/check-session";

    await fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const CheckUsername = (userInput) => {
    const url = "api/users/"+userInput.username

    return fetch(url)
         .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// export const getSearchedUsers = async (searchBoxComp, keyword) => {
export const getSearchResults = async (searchBoxComp, keyword) => {
    let url_user, url_course
    if (keyword){
        url_user = '/api/users/search/'+keyword
        url_course = "/api/courses/search/"+keyword
    } else {
        url_user = "/api/users"
        url_course = "/api/courses"
    }
    console.log(url_user, url_course)
    Promise.all([

        fetch(url_course),
        fetch(url_user)
      ]).then(([res_courses, res_users]) => {
        if (res_courses.status === 200 && res_users.status === 200) {
            return Promise.all([res_courses.json(), res_users.json()])
        } else if (res_courses.status === 200){
            return Promise.all([res_courses.json(), undefined])
        } else if (res_users.status === 200) {
            return Promise.all([undefined, res_users.json()])
        } else {
            alert(`No results found for "${keyword}". Please try another keyword.`);
        }
        
        // return [res_courses.json(), res_users.json()]
      }).then((json_list)=>{
        console.log("setting redirectObject for searchBox")
        const users = json_list[1] ? json_list[1] : undefined
        const courses= json_list[0] ? json_list[0].searchedCourses : undefined
        console.log("parsed users are ", users)
        console.log("parsed courses are ", courses)
        searchBoxComp.setState({
            redirectObject: {
                pathname: '/Search',
                search: keyword ? '?query=' + keyword : '',
                state: {
                    searchedCourses: courses,
                    searchedUsers: users,
                    searchKeyword: keyword
                }
            }
        })
      }).catch((err) => {
          console.log(err);
      });
  
  
};