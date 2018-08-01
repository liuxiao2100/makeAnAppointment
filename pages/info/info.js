// pages/info/info.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentGroupID: app.globalData.articleListID,
    article_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 获取内容库内容列表
    let contentGroupID = that.data.contentGroupID;
    console.log(contentGroupID);
    let objects = { contentGroupID };
    wx.BaaS.getContentList(objects).then((res) => {
      that.setData({
        article_list: res.data.objects
      })
    }, (err) => {
      console.log('error！');
    });
  },

  bindOpenArticle: function (e) {
    let id = e.currentTarget.dataset.id;
    console.log("id: "+id);
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: "体检中心",
      path: '/pages/home/home'
    }
  }
})