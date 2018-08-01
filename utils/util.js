const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatMonth = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  return [year, month].map(formatNumber).join('-')
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  // const hour = date.getHours()
  // const minute = date.getMinutes()
  // const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}      
const formatDayTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  // const second = date.getSeconds()
  return [hour, minute].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    // content: JSON.stringify(content),
    content: content,
    showCancel: false
  })
}

var getDateStr = (today, addDayCount) => {
  var dd; 
  if (today) { 
    dd = new Date(today); 
  } else { 
    dd = new Date(); 
  } 
  dd.setDate(dd.getDate() + addDayCount);//获取AddDayCount天后的日期 
  var y = dd.getFullYear(); 
  var m = dd.getMonth() + 1;//获取当前月份的日期 
  var d = dd.getDate(); 
  if (m < 10) {
    m = '0' + m; 
  }; 
  if (d < 10) { 
    d = '0' + d; 
  }; 
  return y + "-" + m + "-" + d; 
}

var IdentityCodeValid = (code) => {
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
  var tip = "";
  var pass = true;

  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    tip = "身份证号格式错误";
    pass = false;
  }

  else if (!city[code.substr(0, 2)]) {
    tip = "身份证号地址编码错误";
    pass = false;
  }
  else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "身份证号校验位错误";
        pass = false;
      }
    }
  }
  // if (!pass) alert(tip);
  // return pass;
  return {
    pass,
    tip
  }
} 

var PhoneValid = (tel) => {
  var tip = "请填写有效的手机号";
  var pass = false;

  if (tel.length < 11) {
    tip = "手机号填写位数小于11位";
  } else if (tel.length >11) {
    tip = "手机号填写位数大于11位";
  }
  //移动号段
  var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
  if (regtel.test(tel)) {
    pass = true;
  }
  //电信号段
  regtel = /^((133)|(153)|(18[0|1|9])|(177))[\d]{8}$/;
  if (regtel.test(tel)) {
    pass = true;
  }
  //联通号段
  regtel = /^((13[0-2])|(145)|(15[5-6])|(176)|(18[5-6]))[\d]{8}$/;
  if (regtel.test(tel)) {
    pass = true;
  }

  return{
    pass,
    tip
  } 
}

// 获得本人预约列表
let getBooks = (uid, cb) => {
  let tableId = getApp().globalData.tableOfSurveyID,
    Books = new wx.BaaS.TableObject(tableId),
    query = new wx.BaaS.Query()

  query.compare('created_by', '=', uid)
  Books.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

// let getBooks = (ctx, cb) => {
//   let tableId = getApp().globalData.tableOfSurveyID,
//     Books = new wx.BaaS.TableObject(tableId)

//   Books.find()
//     .then(res => cb(res))
//     .catch(err => console.dir(err))
// }

let updateBook = (ctx, cb) => {
  let tableId = getApp().globalData.tableOfSurveyID,
    recordId = ctx.data.curRecordId,
    name = ctx.data.uName,
    date = ctx.data.uDate,
    uid = ctx.data.uID,
    phone = ctx.data.uPhone,
    gender = ctx.data.isMale,
    remark = ctx.data.remark,
    when = ctx.data.when

  let Books = new wx.BaaS.TableObject(tableId),
    Book = Books.getWithoutData(recordId)

  let data = {
    name,
    date,
    uid,
    phone,
    gender,
    remark,
    when
  }

  Book.set(data)
    .update()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

let deleteBook = (ctx, cb) => {
  let tableId = getApp().globalData.tableOfSurveyID,
    recordId = ctx.data.curRecordId

  let Books = new wx.BaaS.TableObject(tableId)

  Books.delete(recordId)
    .then(res => cb(res))
    .catch(err => console.dir(err))
}


module.exports = { formatTime, formatDate, formatDayTime, formatMonth, showBusy, showSuccess, showModel, getDateStr, IdentityCodeValid, PhoneValid, getBooks, updateBook, deleteBook}