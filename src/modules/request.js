const obj = {
  get: function () {
    console.log("从服务器获取数据");
  },
  post: function () {
    console.log("向服务器提交数据");
  },
};

module.exports = obj;
