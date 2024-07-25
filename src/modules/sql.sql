/**  */
db.admin.createUser({username:'admin',pwd:'admin',roles:['root']});

db.user.ensureIndex({ username: 1 });
db.user.getIndexes();

db.user.insert({
  uid: 1,
  username: "admin",
  password: "admin",
  email: "admin@admin.com",
  phone: "12345678901",
  age:43,
  role: "admin",
});
/** 循环插入用户 */
for(let i = 2; i <= 100; i++){
  db.user.insert({
    uid: i,
    username: "admin"+i,
    password: "admin",
    email: "admin@admin.com",
    phone: "12345678901",
    age:i,
    role: "admin",
  });
}
/**  查询 */
db.user.find({username:'admin2'})
/**  查询后过滤某些字段 */
db.user.find({username:'admin2'},{uid:1})
/**  查询后统计数量 */
db.user.find({username:/^admin/}).count()
/**  查询age大于等于10的数据 */
db.user.find({age:{$lte:10}})
/**  查询username 是admin开头的数据，并且分页 */
db.user.find({username:/^admin/}).skip(20).limit(10)
/**  查询username 是admin开头的数据，并且分页，并且按照age 升序，-1为降序排序 */
db.user.find({username:/^admin/}).skip(20).limit(10).sort({age:1})

/** 插入订单 和订单详情 ，一对多的关系 */
db.order.insert({
  order_id: 1,
  uid: 10,
  trade_no: "111",
  all_price: 100,
  all_num: 2,
});
db.order.insert({
  order_id: 2,
  uid: 7,
  trade_no: "222",
  all_price: 90,
  all_num: 2,
});
db.order.insert({
  order_id: 3,
  uid: 9,
  trade_no: "333",
  all_price: 20,
  all_num: 6,
});
db.order_item.insert({ order_id: 1, title: "商品鼠标1", price: 50, num: 1 });
db.order_item.insert({ order_id: 1, title: "商品键盘2", price: 50, num: 1 });
db.order_item.insert({ order_id: 2, title: "牛奶", price: 50, num: 1 });
db.order_item.insert({ order_id: 2, title: "酸奶", price: 40, num: 1 });
db.order_item.insert({ order_id: 3, title: "矿泉水", price: 2, num: 5 });
db.order_item.insert({ order_id: 3, title: "毛巾", price: 10, num: 1 });
db.order_item.insert({ order_id: 3, title: "牙刷", price: 0, num: 1 });


/** 表关联 */
/** $project 用来重命名、增加或者删除文档中的字段*/
db.order.aggregate([
    {
      $project:{order_id:1,trade_no:1,all_price:1}
    }
]);

/** $match 用于过滤文档。用法类似于 find方法中的参数 */
db.order.aggregate([
    {
      $project:{order_id:1,trade_no:1,all_price:1}
    },
    {
      $match:{all_price:{$gte:90}}
    }
]);
/** $group 用于统计聚合 */
db.order_item.aggregate([
    {
      $group:{_id:"$order_id",total:{$sum:1}}
    }
]);