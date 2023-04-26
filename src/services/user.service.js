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
