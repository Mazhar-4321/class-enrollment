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