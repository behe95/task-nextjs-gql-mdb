import {errorTypes} from '../constants/errors';

const getErrorCode = errorName => {
    return errorTypes[errorName];
};

export default getErrorCode;