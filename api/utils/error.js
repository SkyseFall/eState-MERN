export const errorhandle = (statusCde, errMsg) => {
    const error = new Error();

    error.statusCode = statusCde;
    error.message = errMsg;
    return error;
}