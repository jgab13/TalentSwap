
export const FilterCourseLevels = (curr_courses, filters) => {
    let r_courses = [];
    filters.forEach(f => {
        r_courses = r_courses.concat(curr_courses.filter(course =>
            course.level === f))
    })
    return r_courses;
}

export const FilterCourseDates = (curr_courses, filters) => {
    let r_courses = [];
    filters.forEach(f => {
        r_courses = r_courses.concat(curr_courses.filter(course => {
            let conv = new Date(course.starttime)
            return f === "Upcoming"
            ? conv > Date.now()
            : conv <= Date.now()
        }))
           
    })
        
    return r_courses;
}

export const FiltersCourseSizes = (curr_courses, filters) => {
    let r_courses = [];
    filters.forEach(f => {
        let match = curr_courses.filter(course => 
            {switch(f){
                case 'One-on-One': 
                    return course.capacity === 1
                case 'Small (2-8)':
                    return 1 < course.capacity && course.capacity < 9
                case 'Medium (9-20)':
                    return 8 < course.capacity && course.capacity < 21
                case 'Large (20+)':
                    return course.capacity > 20
            }
        })
        r_courses = r_courses.concat(match)
    })
    return r_courses;
}

export const FilterTeachers = (users, keyword) => {
    if (!keyword) return users
    return users.filter(user => user.expertise.toLowerCase().match(keyword))
}