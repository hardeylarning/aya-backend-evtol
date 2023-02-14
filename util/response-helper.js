export const responseMessage = (res, status, message) => {
    return res.json({
        status: status,
        message: message
    })
}