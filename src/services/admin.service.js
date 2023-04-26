import sequelize from '../config/database';

export const addCourse = async (body) => {
    const { QueryTypes } = require('sequelize');
    const course_id = Date.now();
    var courseInsertResponse = await sequelize.query(
        `insert into course(c_id,name,lastDate,duration,seatsLeft,course_description,url)
    values(?,?,?,?,?,?,?)`,
        {
            replacements: [course_id, body.name, body.lastDate,
                body.duration, body.seatsLeft,
                body.course_description, body.url],
            type: QueryTypes.INSERT
        }
    );
    var courseInstructorResponse = await sequelize.query(
        `insert into course_notes(c_id,notes)
    values${getMultipleValues(course_id, body.notes)}`,
        {
            type: QueryTypes.INSERT
        }
    );
    var courseInstructorResponse = await sequelize.query(
        `insert into course_instructor(c_id,instructor)
    values(?,?)`,
        {
            replacements: [course_id, body.instructor],
            type: QueryTypes.INSERT
        }
    );

}

const getMultipleValues = (c_id, notesArray = []) => {
    var string = ''
    for (var i = 0; i < notesArray.length; i++) {
        if (i == notesArray.length - 1)
            string += `('${c_id}','${notesArray[i]}')`
        else
            string += `('${c_id}','${notesArray[i]}'),`
    }
    return string;
}

export const deleteCourse = async(courseId)=>{
    const { QueryTypes } = require('sequelize');
    var courseInsertResponse = await sequelize.query(
        `delete from course where c_id=?`,
        {
            replacements: [courseId],
            type: QueryTypes.DELETE
        }
    );
}