// pages/survey/survey.js
var util = require('../../utils/util.js')
var test = require('../../utils/test.js')
var app = getApp()
var date_o = new Date()


Page({
  /**
   * 页面的初始数据
   */
  data: {
    tableID: app.globalData.tableOfSurveyID,
    uName: '',
    // uDate: util.formatDate(date_o),
    uDate: util.getDateStr(date_o, 2),
    // 从明天开始
    startDate: util.getDateStr(date_o, 2),
    // 预约一个月内的体检
    // endDate: "2018-08-20",
    endDate: util.getDateStr(date_o, 60),
    uID: '',
    uPhone: '',
    isMale: '',
    remark: '',
    radio_items: [{
        id: '1',
        value: '男'
      },
      {
        id: '0',
        value: '女'
      }
    ],
    objectArray: ['7:30~8:30', '8:30~9:30', '9:30~'],
    index: 0,
    time0ListNum: 0,
    time1ListNum: 0,
    time2ListNum: 0,
    timeControl: app.globalData.numberLimit
  },
  // 输入姓名
  unameInput: function(e) {
    this.setData({
      uName: e.detail.value
    })
  },
  // 输入日期
  bindDateChange: function(e) {
    console.log(e.detail.value);
    this.setData({
      uDate: e.detail.value
    });
  },
  // udateInput: function (e) {
  //   this.setData({ uDate: e.detail.value })
  // },
  // 选择时间段
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 输入身份证号
  uidInput: function(e) {
    this.setData({
      uID: e.detail.value
    })
    // console.log(util.IdentityCodeValid(e.detail.value).pass);
    // console.log(util.IdentityCodeValid(e.detail.value).tip);
  },
  // 输入手机号码
  uphoneInput: function(e) {
    this.setData({
      uPhone: e.detail.value
    })
  },
  // 性别，radio进行选择
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      isMale: e.detail.value
    })
  },
  // 留言
  remarkInput: function(e) {
    console.log("remark:", e.detail.value)
    this.setData({
      remark: e.detail.value
    })
  },
  // 点击“提交”按钮
  btnClick: function(e) {

    var varTemp = [0,0,0];
    for(var i = 0; i < varTemp.length; i++) {
      if (this.data.index == i) {
        varTemp[i] = 1;
      }
    }
    console.log("~~~~~~~~", varTemp)

    var that = this;
    let tableID = that.data.tableID;
    let Product = new wx.BaaS.TableObject(tableID);
    let product = Product.create();

    var reg = /^[1-9]+[0-9]*]*$/;
    var regName = /^[\u4e00-\u9fa5]{2,4}$/;

    if (that.data.uName.length == 0 || that.data.uID.length == 0 || that.data.uPhone.length == 0 || that.data.isMale.length == 0) {
      let msg = {
        name: that.data.uName,
        date: that.data.uDate,
        uid: that.data.uID,
        phone: that.data.uPhone,
        gender: that.data.isMale,
        remark: that.data.remark,
        index: that.data.index,
        when: that.data.objectArray[that.data.index]
      }
      util.showModel('提交预约失败', '信息填写不完整')
    } else if (!regName.test(that.data.uName)) {
      util.showModel('提交预约失败', '真实姓名填写有误')
    } else if (((that.data.time0ListNum + varTemp[0]) > that.data.timeControl.time_0) || ((that.data.time1ListNum + varTemp[1]) > that.data.timeControl.time_1) || ((that.data.time2ListNum + varTemp[2]) > that.data.timeControl.time_2)) {
      util.showModel('提交预约失败', '该预约时间段已约满，请选择其他时间段预约')
    }else if (!util.IdentityCodeValid(that.data.uID).pass) {
      tip = util.IdentityCodeValid(that.data.uID).tip;
      util.showModel('提交预约失败', tip)
    } else if (!reg.test(that.data.uPhone) || !util.PhoneValid(that.data.uPhone).pass) {
      var tip = "手机号码只能是数字";
      if (!util.PhoneValid(that.data.uPhone).pass) {
        tip = util.PhoneValid(that.data.uPhone).tip;
      }
      util.showModel('提交预约失败', tip)
    } else {
      let msg = {
        name: that.data.uName,
        date: that.data.uDate,
        uid: that.data.uID,
        phone: that.data.uPhone,
        gender: that.data.isMale,
        remark: that.data.remark,
        index: that.data.index,
        when: that.data.objectArray[that.data.index]
      }
      console.log(msg);

      product.set(msg).save().then(res => {
        // success
        console.log('Done!!!');
        util.showSuccess("提交成功");
        that.setData({
          form_info: '',
          uDate: util.formatDate(date_o),
          index: 0,
        });
        // 2秒后跳转到首页
        setTimeout(function() {
          wx.switchTab({
            url: '/pages/home/home',
          })
        }, 2000);
      }, err => {
        // err
        console.log('Fail 233');
        util.showModel('提交失败', err);
      })
    }
  },

  // fetchTimeList1() {
  //   var which = 1;
  //   test.getActivitys(this, which, (res) => {
  //     this.setData({
  //       time1List: res.data.objects // bookList array, mock data in mock/mock.js
  //     })
  //   });
  // },

  // fetchTimeList2() {
  //   var numOfTimeList = Object.getOwnPropertyNames(app.globalData.numberLimit).length; // -> 3
  //   var tempArr = new Array(); // 创建一个数组
  //   for (var i = 0; i < numOfTimeList; i++) {
  //     test.getActivitys(this, i, (res) => {
  //       this.setData({
  //         numOfTimeTemp: res.data.objects.length // bookList array, mock data in mock/mock.js
  //       })
  //     });
  //     tempArr.push(this.data.numOfTimeTemp)
  //   }
  //   console.log('!!!!!!', tempArr, '!!!!!!!')
  //   this.setData({
  //     currentTimeControlList: tempArr
  //   });

  // },

  fetchTimeList() {
    test.getActivitys(this, 0, (res) => {
      this.setData({
        time0ListNum: res.data.objects.length // bookList array, mock data in mock/mock.js
      })
    });
    test.getActivitys(this, 1, (res) => {
      this.setData({
        time1ListNum: res.data.objects.length // bookList array, mock data in mock/mock.js
      })
    });
    test.getActivitys(this, 2, (res) => {
      this.setData({
        time2ListNum: res.data.objects.length // bookList array, mock data in mock/mock.js
      })
    });
  },

  btnTest: function(){
    console.log('This is a Testing Button');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.fetchTimeList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    console.log('您点击了分享按钮')
  }
})