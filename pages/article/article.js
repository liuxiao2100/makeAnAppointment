// pages/article/article.js
const wxParser = require('../../wxParser/index');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    createdAt: "", // 文章时间
    title: "", // 文章标题
    id: "" // 文章ID
  },

  // 格式化时间
  getLocalTime: function (ns) {
    return new Date(parseInt(ns) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 页面url传入文章ID
    let id = options.id;
    console.log(id,"!!!~~~!!!")

    wx.BaaS.getContent({ richTextID: id}).then((res) => {
      // 格式化时间
      let time = res.data.created_at;
      let localTime = that.getLocalTime(time);
      that.setData({
        createdAt: localTime,
        title: res.data.title,
        id: id
      })
      // 文章内容
      let html = res.data.content;
      // 渲染文章
      wxParser.parse({
        bind: 'richText',
        html: html,
        target: that
      }, (err) => {
        console.log('获取文章内容失败');
      });
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
  onShareAppMessage: function () {
    let title = this.data.tile;
    let id = this.data.id;
    let path = `/pages/article/article?id=${id}`;

    return {
      title: `分享《${title}》`,
      path: path
    }
  }
})