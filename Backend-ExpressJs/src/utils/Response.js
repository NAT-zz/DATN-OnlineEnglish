const makeSuccessResponse = (res, status, data) => {
    return res.status(status).json({
        message: data?.message ? data.message : 'Success',
        data: data?.data ? data.data : {},
    });
};

export { makeSuccessResponse };
