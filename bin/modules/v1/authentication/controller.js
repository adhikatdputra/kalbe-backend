const jsonwebtoken = require('jsonwebtoken');
const common = require('../../../helpers/common');
const jwtAuth = require('../../../helpers/authentication');
const adminModel = require('../admin/model');

const signInAdmin = async (payload) => {
  const checkAdmin = await adminModel.findByEmail(payload)
  if(checkAdmin.err) {
    return checkAdmin;
  }

  if(await common.decryptHash(payload.password, checkAdmin.data.password)) {
    const tokenData = {
      id: checkAdmin.data.id,
      role: checkAdmin.data.role,
    };
    const token = await jwtAuth.generateToken(tokenData);
    const refresh_token = await jwtAuth.generateRefreshToken(tokenData);
    const exp_token = jsonwebtoken.decode(token).exp;
    const exp_refresh_token = jsonwebtoken.decode(refresh_token).exp;
    const { id, email, fullname, role } = checkAdmin.data;
    const data = { id, email, fullname, role, token, exp_token, refresh_token, exp_refresh_token };
    return {
      err: null,
      data: data
    }
  }

  return {
    err: { message: 'Email or password is wrong!', code: 401 },
    data: null
  }
}

const refreshTokenAdmin = async (payload) => {
  const checkRefreshToken = await jwtAuth.verifyRefreshToken(payload);
  if(checkRefreshToken.err) {
    return checkRefreshToken;
  }

  const tokenData = {
    id: checkRefreshToken.data.id,
    role: checkRefreshToken.data.role,
  };
  const token = await jwtAuth.generateToken(tokenData);
  const refresh_token = await jwtAuth.generateRefreshToken(tokenData);
  const exp_token = jsonwebtoken.decode(token).exp;
  const exp_refresh_token = jsonwebtoken.decode(refresh_token).exp;
  const data = { token, exp_token, refresh_token, exp_refresh_token };
  return {
    err: null,
    data: data
  }
}

module.exports = {
  signInAdmin,
  refreshTokenAdmin,
}