const jwt = require('jsonwebtoken');
const config = require('../configs/config');

const generateToken = async (payload) => {
  const secretKey = config.secretKeyJwt;
  const verifyOptions = {
    issuer: 'goumee',
    expiresIn: '30 days'
  };
  const token = jwt.sign(payload, secretKey, verifyOptions);
  return token;
};

const generateRefreshToken = async (payload) => {
  const secretKey = config.secretKeyJwtRefresh;
  const verifyOptions = {
    issuer: 'goumee',
    expiresIn: '90 days'
  };
  const token = jwt.sign(payload, secretKey, verifyOptions);
  return token;
};

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyToken = async (req, res, next) => {
  const secretKey = config.secretKeyJwt;
  const verifyOptions = {
    issuer: 'goumee',
  };

  const token = getToken(req.headers);
  if (!token) {
    return res.status(200).json({
      success: false,
      data: '',
      message: 'Invalid token!',
      code: 403
    });
  }
  let decodedToken;
  try {
    decodedToken = await jwt.verify(token, secretKey, verifyOptions);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(200).json({
        success: false,
        data: '',
        message: 'Access token expired!',
        code: 401
      });
    }
    return res.status(200).json({
      success: false,
      data: '',
      message: 'Token is not valid!',
      code: 401
    });
  }
  req.decodedToken = decodedToken;
  next();
};

const verifyRefreshToken = async (payload) => {
  const secretKey = config.secretKeyJwtRefresh;
  const verifyOptions = {
    issuer: 'goumee',
  };

  if (!payload.refresh_token) {
    return {
      err: { message: 'Invalid token!', code: 403 },
      data: null
    };
  }
  let decodedToken;
  try {
    decodedToken = await jwt.verify(payload.refresh_token, secretKey, verifyOptions);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return {
        err: { message: 'Access token expired!', code: 401 },
        data: null
      };
    }
    return {
      err: { message: 'Token is not valid!', code: 401 },
      data: null
    };
  }
  return {
    err: null,
    data: decodedToken
  }
};

const isSuperadmin = async (req, res, next) => {
  const decodedToken = req.decodedToken;
  if(decodedToken.role !== 'superadmin') {
    return res.status(200).json({
      success: false,
      data: '',
      message: 'Access denied!',
      code: 403
    });
  }
  next();
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  verifyRefreshToken,
  isSuperadmin,
};
