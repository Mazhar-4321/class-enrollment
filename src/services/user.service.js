import sequelize from '../config/database';
import { sendEmail } from '../utils/user.util';
import Jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');




export const newUser = async (body) => {

  const { QueryTypes } = require('sequelize');
  const expiry = Date.now();
  var otpResponse = await sequelize.query('select * from otp where otp=? and email=? and expiry>=?'
    , {
      replacements: [body.otp, body.email, expiry],
      type: QueryTypes.SELECT
    })
  console.log("otpResponse", otpResponse)
  if (otpResponse.length > 0) {
    body.password = bcrypt.hashSync(body.password, 10);
    var childTable = await sequelize.query(
      `insert into role(email,role_name)
  values(?,?)`,
      {
        replacements: [body.email, body.role],
        type: QueryTypes.INSERT
      }
    );
    var response = await sequelize.query(
      `insert into users(firstName,lastName,email,password)
  values(?,?,?,?)`,
      {
        replacements: [body.firstName, body.lastName, body.email, body.password],
        type: QueryTypes.INSERT
      }
    );
    console.log(response)
    return response;
  } else {

    throw new Error('Invalid OTP')
  }
};

export const getUser = async (body) => {
  const { QueryTypes } = require('sequelize');

  var response = await sequelize.query(
    `select U.firstName,U.lastName,U.email,U.password,R.role_name from users U
  inner join
  role R
  on U.email=R.email and U.email=? ;`,
    {
      replacements: [body.email],
      type: QueryTypes.SELECT
    }
  );
  console.log("response from db", response)
  if (response.length > 0) {
    const verified = bcrypt.compareSync(body.password, response[0].password)
    if (!verified) {
      logger.error(`Attempt To Login With Invalid Password ${body.email}`)
      throw new Error('Invalid Password')
    } else {
      var token = await Jwt.sign({ email: body.email }, process.env.SECRET_KEY);
      console.log("token", token)
      return response[0].role_name + "," + token
    }
  } else {

  }
  return response;
};