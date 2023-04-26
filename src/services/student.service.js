import sequelize from '../config/database';


export const availableCourses = async () => {
    const { QueryTypes } = require('sequelize');
    var response = await sequelize.query(`
    select c.name,ci.instructor,c.lastDate,c.duration,c.seatsLeft,c.course_description 
    from course c
    inner join course_instructor ci
    on c.c_id=ci.c_id
    and c.seatsLeft>0`
        , {
            type: QueryTypes.SELECT
        })

    return response;

}