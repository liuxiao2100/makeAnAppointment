// pages/myRecord/myRecord.js
// import utils from '../../utils/myRecord'
var utils = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    title: '我的预约',
    tableID: app.globalData.tableId,
    surveyListID: app.globalData.tableOfSurveyID,
    bookList: [],
    creatingBookName: '', // 当前正在创建的书名
    editingBookName: '', // 当前正在编辑的书名
    showModalStatus: false,
    curRecordId: '',

    uName: '',
    uDate: '',
    uID: '',
    uPhone: '',
    isMale: '',
    remark: '',
    objectArray: ['7:30~8:30', '8:30~9:30', '9:30~'],
    index: 0,
    when:''
  },

  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var bookId = e.currentTarget.dataset.bookId;
    console.log(currentStatu);
    console.log(bookId);

    this.util(currentStatu, bookId);
  },

  // 输入姓名
  unameInput: function (e) {
    console.log("name:",e.detail.value);
    this.setData({ uName: e.detail.value })
  },
  // 输入日期
  bindDateChange: function (e) {
    console.log("date:",e.detail.value);
    this.setData({uDate: e.detail.value});
  },
  // 选择时间段
  bindWhenChange: function (e) {
    this.setData({when: e.detail.value})
    console.log("when:", e.detail.value)
  },
  // 输入身份证号
  uidInput: function (e) {
    this.setData({ uID: e.detail.value })
    console.log("person id:", e.detail.value)
  },
  // 输入手机号码
  uphoneInput: function (e) {
    console.log("phone:", e.detail.value)
    this.setData({ uPhone: e.detail.value })
  },
  // 性别
  genderInput: function (e) {
    console.log("gender:", e.detail.value)
    this.setData({ isMale: e.detail.value })
  },
  // 留言
  remarkInput: function (e) {
    console.log("remark:", e.detail.value)
    this.setData({ remark: e.detail.value })
  },

  util: function(currentStatu, bookId) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: " linear", //线性  
      delay: 0 //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function() {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      let that = this
      let activeIndex = bookId
      let bookList = this.data.bookList

      for (var i = 0; i < bookList.length; i++) {
        if ((bookList[i]).id == activeIndex) {
          console.log((bookList[i]).name);
          this.setData({
            showModalStatus: true,
            curRecordId: bookId,
            uName: (bookList[i]).name,
            uDate: (bookList[i]).date,
            uID: (bookList[i]).uid,
            uPhone: (bookList[i]).phone,
            isMale: (bookList[i]).gender,
            remark: (bookList[i]).remark,
            when: (bookList[i]).when
          });
        }
      }

      // this.setData(
      //   {
      //     showModalStatus: true
      //   }
      // );
    }
  },

  onLoad(options) {
    wx.BaaS.login(false).then(() => {
      this.setData({
        profile: wx.BaaS.storage.get('userinfo')
      })
      this.fetchBookList()
    })
  },

  // 获取 bookList 数据
  fetchBookList() {
    utils.getBooks(wx.BaaS.storage.get('uid'), (res) => {
      this.setData({
        bookList: res.data.objects // bookList array, mock data in mock/mock.js
      })
    })
    // console.log(this.data.bookList)
  },

  // 绑定添加书目的输入框事件，设置添加的数目名称
  bindCreateBookNameInput(e) {
    let that = this
    let value = e.detail.value
    this.setData({
      creatingBookName: value
    })
  },

  // 绑定添加书目的提交按钮点击事件，向服务器发送数据
  createBook(e) {
    utils.addBook(this, (res) => {
      this.setData({
        createBookValue: '',
      })
      this.fetchBookList()
    })
  },

  // 绑定每一行书目的“编辑”按钮点击事件，控制输入框和文本显示
  editBookButtonClicked(e) {
    let that = this
    let activeIndex = e.currentTarget.dataset.index
    let bookList = this.data.bookList

    bookList.forEach((elem, idx) => {
      if (activeIndex == idx) {
        elem.isEditing = true
      } else {
        elem.isEditing = false
      }
    })

    that.setData({
      bookList
    })
  },

  // 绑定每一行书目的输入框事件，设定当前正在编辑的书名
  bindEditBookNameInput(e) {
    let bookName = e.detail.value
    this.setData({
      editingBookName: bookName,
    })
  },
  //!!!!!!!!!!!!!
  // 绑定修改书目的提交按钮点击事件，向服务器发送数据
  updateBook(e) {

    // this.setData({
    //   curRecordId: e.target.dataset.bookId,
    // })
    utils.updateBook(this, (res) => {
      this.fetchBookList()
      // this.setData({
      //   curRecordId: ''
      // })
    })
  },

  // 删除当前行的书目
  deleteBook(e) {
    this.setData({
      curRecordId: e.target.dataset.bookId,
    })
    utils.deleteBook(this, (res) => {
      this.fetchBookList()
      this.setData({
        curRecordId: ''
      })
    })
  },

})