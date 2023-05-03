const controller = require('./controller');
const reqModel = require('./request_model');
const common = require('../../../helpers/common');

const signInAdmin = async(req, res) => {
  const payload = req.body;
  const validatePayload = await common.isValidPayload(payload, reqModel.signIn);
  const postRequest = async (result) => {
    if(result.err) {
      return result;
    }
    return controller.signInAdmin(result.data);
  };
  const sendResponse = async (result) => {
    if(result.err) {
      return res.status(200).json({
        success: false,
        data: '',
        message: result.err.message || 'Sign in fail',
        code: result.err.code || 500
      }); 
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: 'Sign in success',
      code: 200
    });
  };
  sendResponse(await postRequest(validatePayload));
};

const refreshTokenAdmin = async(req, res) => {
  const payload = req.body;
  const validatePayload = await common.isValidPayload(payload, reqModel.refreshToken);
  const postRequest = async (result) => {
    if(result.err) {
      return result;
    }
    return controller.refreshTokenAdmin(result.data);
  };
  const sendResponse = async (result) => {
    if(result.err) {
      return res.status(200).json({
        success: false,
        data: '',
        message: result.err.message || 'Refresh token fail',
        code: result.err.code || 500
      }); 
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: 'Refresh token success',
      code: 200
    });
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  signInAdmin,
  refreshTokenAdmin,
};