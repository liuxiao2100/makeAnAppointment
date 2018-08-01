// pages/home/home.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    calls: [
      { url: '../../resources/轮转图1.jpg' },
      { url: '../../resources/轮转图2.jpg' },
      { url: '../../resources/轮转图3.jpg' }
    ]  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  bindOpenMenu: function () {
    util.showModel('提示', '本功能暂未开放，敬请期待')
  },

  bindOpenOrder: function () {
    util.showModel('提示', '本功能暂未开放，敬请期待')
  },

  bindOpenSurvey: function (e) {
    console.log('yes');
    wx.switchTab({
      url: "/pages/survey/survey"
    })
  },

  bindOpenArticle1st: function (e) {
    let id = 1532080046991791;
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`,
    })
  },

  bindOpenArticle2nd: function (e) {
    let id = 1532081058019169;
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`,
    })
  },

  bindOpenArticle3rd: function (e) {
    let id = 1532081164885215;
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`,
    })
  },

  bindOpenCoupon: function () {
    util.showModel('提示', '本功能暂未开放，敬请期待')
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
  onShareAppMessage: function () {
  
  }
})