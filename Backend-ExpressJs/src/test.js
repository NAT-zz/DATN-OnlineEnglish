const user = {
    "1": {
        "userName": "tuanoliver",
        "passWord": "tuan123",
        "fullName": "Nguyen Anh Tuan",
        "email": "tuanemail@gmail.com",
        "birthDate": "2001-13-10",
        "role": "STUDENT"
    },
    "2": {
        "userName": "tuanoliver11",
        "passWord": "tuan123",
        "fullName": "Nguyen Anh Tuan",
        "email": "tuanemail@gmail.com",
        "birthDate": "2001-13-10",
        "role": "STUDENT"
    }
}
const { indexOf } = require('lodash');

const test = [
    {
        title: "bro",
        content: "test test"
    },
    {
        title: "bro",
        content: "test test 1"
    }
]
test[test.indexOf(test.find(val => val.content=="test test 1"))].content = "helllo bith";

console.log(test);
// console.log(test.every(val => (val.title && val.content)));