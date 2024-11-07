const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {};

userSocketMap['key'] = 12;
userSocketMap['key1'] = 13;

console.log(getReceiverSocketId('key'));
