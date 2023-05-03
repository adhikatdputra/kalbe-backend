const controller = require('./controller');
const reqModel = require('./request_model');
const common = require('../../../helpers/common');

const getAll = async(req, res) => {
  const payload = {
    ...req.query,
  };
  const validatePayload = await common.isValidPayload(payload, reqModel.getAll);
  const postRequest = async (result) => {
    if(result.err) {
      return result;
    }
    return controller.getAll(result.data);
  };
  const sendResponse = async (result) => {
    if(result.err) {
      return res.status(200).json({
        success: false,
        data: '',
        message: result.err.message || 'Get data fail',
        code: result.err.code || 500
      }); 
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: 'Get data success',
      code: 200
    });
  };
  sendResponse(await postRequest(validatePayload));
};

const getById = async(req, res) => {
  const payload = {
    id: req.params.id,
  };
  const validatePayload = await common.isValidPayload(payload, reqModel.getById);
  const postRequest = async (result) => {
    if(result.err) {
      return result;
    }
    return controller.getById(result.data);
  };
  const sendResponse = async (result) => {
    if(result.err) {
      return res.status(200).json({
        success: false,
        data: '',
        message: result.err.message || 'Get data fail',
        code: result.err.code || 500
      }); 
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: 'Get data success',
      code: 200
    });
  };
  sendResponse(await postRequest(validatePayload));
};

const create = async(req, res) => {
  const payload = {
    ...req.body,
  };
  const validatePayload = await common.isValidPayload(payload, reqModel.create);
  const postRequest = async (result) => {
    if(result.err) {
      return result;
    }
    return controller.create(result.data);
  };
  const sendResponse = async (result) => {
    if(result.err) {
      return res.status(200).json({
        success: false,
        data: '',
        message: result.err.message || 'Create data fail',
        code: result.err.code || 500
      }); 
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: 'Create data success',
      code: 200
    });
  };
  sendResponse(await postRequest(validatePayload));
};

const update = async(req, res) => {
  const payload = {
    ...req.body,
    id: req.params.id,
  };
  const validatePayload = await common.isValidPayload(payload, reqModel.update);
  const postRequest = async (result) => {
    if(result.err) {
      return result;
    }
    return controller.update(result.data);
  };
  const sendResponse = async (result) => {
    if(result.err) {
      return res.status(200).json({
        success: false,
        data: '',
        message: result.err.message || 'Update data fail',
        code: result.err.code || 500
      }); 
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: 'Update data success',
      code: 200
    });
  };
  sendResponse(await postRequest(validatePayload));
};

const deleteOne = async(req, res) => {
  const payload = {
    id: req.params.id
  };
  const validatePayload = await common.isValidPayload(payload, reqModel.getById);
  const postRequest = async (result) => {
    if(result.err) {
      return result;
    }
    return controller.deleteOne(result.data);
  };
  const sendResponse = async (result) => {
    if(result.err) {
      return res.status(200).json({
        success: false,
        data: '',
        message: result.err.message || 'Delete data fail',
        code: result.err.code || 500
      }); 
    }
    return res.status(200).json({
      success: true,
      data: result.data,
      message: 'Delete data success',
      code: 200
    });
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};