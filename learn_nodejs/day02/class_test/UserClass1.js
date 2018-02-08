function User(params) {
    this.name = params.name;
    this.age = params.age;
}

User.prototype.say = function () {
    console.log("我是" + this.name + ",今年" + this.age + "岁了.");
};

exports.User = User;