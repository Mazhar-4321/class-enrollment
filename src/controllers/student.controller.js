import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';
import * as StudentService from '../services/student.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const availableCourses = async (req, res, next) => {
  try {
    const data = await StudentService.availableCourses();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All courses fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const myCourses = async (req, res, next) => {
    try {
      const data = await StudentService.myCourses(req.params.email);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All courses fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };


