export const errorNames = {
    SUBJECT_ALREADY_EXISTS: 'CUSTOM_ERR_SUBJECT_ALREADY_EXISTS',
    SERVER_ERROR: 'CUSTOM_ERR_SERVER_ERROR'
}

export const errorTypes = {
    CUSTOM_ERR_SUBJECT_ALREADY_EXISTS: {
        message: 'Subject already exists',
        statusCode: 403
    },
    CUSTOM_ERR_SERVER_ERROR: {
        message: 'Something went wrong',
        statusCode: 500
    }
}