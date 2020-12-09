import React from "react";
import "./styles.css";
import {Badge, Form, Button} from "react-bootstrap";
import {uid} from "react-uid";


import Header from "./../Header"
import SearchTabs from "./../SearchTabs"
// import CourseFilter from "./../SearchCourseFilter"
// import UserFilter from "./../SearchUserFilter"
import CourseResults from "./../SearchCourseResults"
import UserResults from "./../SearchUserResults"

// prepare hardcoded user and course data to render on the search page
import {hardcodedCourses} from "./../../courses/testcourses.js"
import UserManager from "./../../users/user-manager.js"
const hardcodedUsers = ["user", "user2"].map(async username => await UserManager.getUserFromUsername(username));

function FilterCourseLevels(curr_courses, filters){
    let r_courses = [];
    filters.forEach(f => {
        r_courses = r_courses.concat(curr_courses.filter(course =>
            course.level === f))
    })
    return r_courses;
}

function FilterCourseDates(curr_courses, filters){
    let r_courses = [];
    filters.forEach(f => {
        r_courses = r_courses.concat(curr_courses.filter(course => {
            // console.log(course.starttime)
            let conv = new Date(course.starttime)
            // console.log(conv > Date.now())
            return f === "Upcoming"
            ? conv > Date.now()
            : conv <= Date.now()
        }))
           
    })
        
    return r_courses;
}

function FiltersCourseSizes(curr_courses, filters){
    let r_courses = [];
    // let conds
    // for (let f of filters) {
    //     switch(f) {
    //         case 'one': 
    //             conds = conds || course.capacity === 1
    //             break 
            
    //     }
    // }
    // for (let f of filters){
        // , , , 
    filters.forEach(f => {
        let match = curr_courses.filter(course => 
            {switch(f){
                case 'One-on-One': 
                    return course.capacity === 1
                    // break
                case 'Small (2-8)':
                    return 1 < course.capacity && course.capacity < 9
                    // return 1 < course.capacity && course.capacity < 9
                    // break

                case 'Medium (9-20)':
                    // 8 < course.capacity && course.capacity < 20
                    // break
                    return 8 < course.capacity && course.capacity < 21
                case 'Large (20+)':
                    // course.capacity > 19
                    // break
                    return course.capacity > 20
                // default:
                //     return course
            }
        })
        // console.log("matched", match)
        r_courses = r_courses.concat(match)
    })
        
        // r_courses = r_courses.concat(curr_courses.filter(course => {
        //     console.log("course.capacity type", typeof course.capacity)
        //     console.log("course capacity is ", course.capacity)
        //     {switch(f){
        //         case 'one': 
        //             return course.capacity === 1
        //         case 'small':
        //             return 1 < course.capacity && course.capacity < 9
        //         case 'medium':
        //             return 8 < course.capacity && course.capacity < 21
        //         case 'large':
        //             return course.capacity > 20
        //         default:
        //             return course
        //     }}
        // }
            // )
            // )
        
    
    return r_courses;
}


class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state = Object.assign({
            tab : "courses"

            // tab : "courses", 

            // cfilters: {
            //     level: [],
            //     availability: [],
            //     size: []
            // }
        }, this.updateState()); 
        this.handleTabSelect = this.handleTabSelect.bind(this);
        this.updateState = this.updateState.bind(this);
        this.handleCfilterCheck = this.handleCfilterCheck.bind(this);
        this.applyCfilters = this.applyCfilters.bind(this);
        this.clearCfilters = this.clearCfilters.bind(this);
    }

    applyCfilters = () => {
        // console.log("to be implemented")
        const cfilters = this.state.cfilters
        let displayedCourses = this.state.courses
        if (cfilters.level.length) {
            // displayedCourses = displayedCourses.concat(FilterCourseLevels(displayedCourses, cfilters.level))
            displayedCourses = FilterCourseLevels(displayedCourses, cfilters.level)
            console.log('displayedCourses after level filters ', displayedCourses)

        }

        if (cfilters.availability.length) {
            // displayedCourses = displayedCourses.concat(FilterCourseDates(displayedCourses, cfilters.availability))
            displayedCourses = FilterCourseDates(displayedCourses, cfilters.availability)
            console.log('displayedCourses after availability filters', displayedCourses)

        }

        if (cfilters.size.length) {
            // displayedCourses = displayedCourses.concat(FiltersCourseSizes(displayedCourses, cfilters.size))
            displayedCourses = FiltersCourseSizes(displayedCourses, cfilters.size)
            console.log('displayedCourses after size filters', displayedCourses)
        }

        this.setState({displayedCourses: displayedCourses})
    }

    clearCfilters = () => {
        const dummy = {...this.state}
        dummy.cfilters = {level: [], availability: [], size:[]}
        dummy.displayedCourses = dummy.courses
        this.setState(dummy)
        // const divs = Array.from(document.getElementsByClassName('cfilter'))
        // const checkboxes = document.getElementsByClassName('cfilter')

        // console.log(typeof checkboxes)
        // console.log(checkboxes.length)
        // console.log(divs[0])
        
        // const checkboxes = Array.from(divs, x =>x.Input)
        // console.log(checkboxes)
        // console.log(checkboxes[0])
        // console.log(typeof checkboxes[0])

        // checkboxes.forEach(cb => cb.checked= false)
        // TODO: need a way to update DOM: uncheck all the boxes
        // for (let b of checkboxes) {
        //     console.log('hi')
        //     // b.setState({checked:false})
        //     b.checked = false
        // }
        // checkboxes[0].checked = false
        // checkboxes.forEach((cb) => cb.checked = false)
        const idList = ["c1:Beginner", "c1:Intermediate", "c1:Advanced", "c1:All Level",
            "c2:Past", "c2:Upcoming", 
            'c3:One-on-One', 'c3:Small (2-8)', 'c3:Medium (9-20)', 'c3:Large (20+)']
        idList.forEach(id => {
            let cb = document.getElementById(id)
            cb.checked = false
        })
        // const cb1 = document.getElementById("c1:Beginner")
        // cb1.checked = false
        // console.log('cb1 got by id', cb1)
        // console.log(typeof cb1)
    }

    handleCfilterCheck = (e) => {
        const checkbox = document.getElementById(e.target.id)
        if (checkbox.checked) {
            console.log('checked')
        }
        const arr = e.target.id.split(':')
        const cat = arr[0], tag = arr[1]
        const dummy = {...this.state}
        let arrToChange
        switch(cat) {
            case 'c1': 
                arrToChange = dummy.cfilters.level
                break
            case 'c2':
                arrToChange = dummy.cfilters.availability
                break
            case 'c3':
                arrToChange = dummy.cfilters.size
                break
        }
        if (checkbox.checked) {
            arrToChange.push(tag)
        } else {
            arrToChange.splice(arrToChange.indexOf(tag), 1)
        }
        this.setState(dummy)

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const newState = this.updateState();
        // console.log("prevState", prevState);
        // console.log("newState", newState);
        if (newState.keyword !== prevState.keyword 
            // || (newState.courses.length !== prevState.courses.length
            //     || !newState.courses.every((value, index) => value === prevState.courses[index]))
                && newState.cfilters !== prevState.cfilters
            )
        {
            this.setState(newState);
            // this.clearCfilters();
            // const cb1 = document.getElementById("c1:Beginner")
            // cb1.checked = false
            const idList = ["c1:Beginner", "c1:Intermediate", "c1:Advanced", "c1:All Level",
            "c2:Past", "c2:Upcoming", 
            'c3:One-on-One', 'c3:Small (2-8)', 'c3:Medium (9-20)', 'c3:Large (20+)']
            idList.forEach(id => {
                let cb = document.getElementById(id)
                cb.checked = false
            })
        }
    }
    

    updateState = () => {
        
        console.log('updating search page...')
        // console.log(this.props);
        const keyword = this.props.location.state.searchKeyword
        const courses = this.props.location.state.searchedCourses

        // console.log(`inside updateState of SearchPage, keyword=`, keyword)
        // console.log("inside updateState of SearchPage, courses=", courses)
        return {
                keyword: keyword,
                courses: courses,
                // displayedCourses: courses
                displayedCourses: courses,
                
                cfilters: {
                    level: [],
                    availability: [],
                    size: []
                }
        }
    }
    // // the function below is not used for phase 2
    // updateState2 = () => {
    //     console.log(this.props);
    //     const keyword = this.props.location.state
    //         ? this.props.location.state.searchInput
    //         : undefined; // unnecessary, will only open search page via redirection from any other pages 
    //     let users = keyword // server call
    //         ? hardcodedUsers.filter((user) => // unnecessary, server response has searched users based on keyword 
    //              (user.name.toLowerCase().match(keyword.toLowerCase())) 
    //              || (user.development.toLowerCase().match(keyword.toLowerCase())) 
    //              || (user.expertise.toLowerCase().match(keyword.toLowerCase())) 
    //         )
    //         : hardcodedUsers; 
    //     let courses = keyword // server call
    //         ? hardcodedCourses.filter((course) =>  // unnecessary, server respond with searched courses based on keyword
    //             course.topic.toLowerCase().match(keyword.toLowerCase())
    //         )
    //         : hardcodedCourses;
    //     // apply course level filters, if any
    //     console.log("after search input changes to ", keyword, "courses include ", courses);
    //     const clfilters = this.props.location.state 
    //         ? this.props.location.state.levelFilters
    //         : undefined;
    //     // console.log("level filters include ", clfilters);
    //     courses = clfilters
    //         ? FilterCourseLevels(courses, clfilters)
    //         : courses;
    //     console.log("after applying level filters ", clfilters, "courses include ", courses);
    //     // apply course date filters, if any
    //     const cdfilters = this.props.location.state
    //         ? this.props.location.state.dateFilters
    //         : undefined;
    //     courses = cdfilters
    //         ? FilterCourseDates(courses, cdfilters)
    //         : courses;
    //     console.log("after applying date filters ", cdfilters, "courses include ", courses);
    //     // apply course size filters, if any
    //     const csfilters = this.props.location.state
    //         ? this.props.location.state.sizeFilters
    //         : undefined;
    //     courses = csfilters 
    //         ? FiltersCourseSizes(courses, csfilters)
    //         : courses
    //     console.log("after applying size filters ", csfilters, "courses include ", courses);
    //     return {
    //         keyword: keyword,
    //         users: users,
    //         courses: courses,
    //         cfilters: [].concat(clfilters).concat(cdfilters).concat(csfilters)
    //     };
    // }

    handleTabSelect = (eventKey) => {
        this.setState({tab: eventKey});
    }

    render(){
        // const users = this.state.users;
        const courses = this.state.displayedCourses;
        // console.log(`inside render of SearchPage, courses = ${courses}`)
        console.log('the states of SearchPage comp are', this.state)
        const tab = this.state.tab;
        // const courseFilters = this.state.cfilters;
        let filter, results;
        // filter = (tab === "courses") ? <CourseFilter /> : <UserFilter />;
        // filter = (tab === "courses") ? <CourseFilter /> : undefined;
        results = (tab === "courses") ? <CourseResults courses = {courses}/> : undefined;
        // results = (tab === "courses") ? <CourseResults courses = {courses}/> : <UserResults users = {users}/>;
        return(
            <div className="SearchPage">
                <Header />
                <SearchTabs id="tab" handleTabSelect = {this.handleTabSelect} /> 
                {/* can be simplified by moving handleTabSelect to SearchTabs  */}
                <p > 
                    <span id="filterHeader">Filter by  </span> <br></br>
                    {/* { courseFilters.map( (filter) => 
                        <Badge className ="filterLabel" variant = "success" >{filter}</Badge>
                        )
                    }  */}
                </p>
                <Form>
                    <div className="mb-3"> 
                    <span> Level </span>
                    {['Beginner', 'Intermediate', 'Advanced', 'All Level'].map( level => (
                        <Form.Check inline label={level} type={'checkbox'} className={'cfilter'}
                        id={`c1:${level}`} onClick={this.handleCfilterCheck}
                         />
                    ))}
                    </div>
                    <div className="mb-3"> 
                    <span> Availability </span>
                    {['Past', 'Upcoming'].map( a => (
                        <Form.Check inline label={a} type={'checkbox'} className={'cfilter'}
                        id={`c2:${a}`} onClick={this.handleCfilterCheck}/>
                    ))}
                    </div>
                    <div className="mb-3"> 
                    <span> Class Size </span>
                    {['One-on-One', 'Small (2-8)', 'Medium (9-20)', 'Large (20+)'].map( s => (
                        <Form.Check inline label={s} type={'checkbox'} className={'cfilter'}
                        id={`c3:${s}`} onClick={this.handleCfilterCheck}/>
                    ))}
                    </div>
                    <Button variant="success" id="apply-filter" onClick={this.applyCfilters}>
                    Apply Filters</Button>
                    <Button variant="secondary" id="clear-filter" onClick={this.clearCfilters}>
                    Clear Filters</Button>
                </Form>
                {/* {filter} */}
                {results}
            </div>
        )
    }
}




export default SearchPage;