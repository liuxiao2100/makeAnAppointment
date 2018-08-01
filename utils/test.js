//针对activity数据表的基础操作
let getActivitys = (ctx, which, cb) => {

  let tableId = getApp().globalData.tableOfSurveyID,
    activitys = new wx.BaaS.TableObject(tableId),
    query = new wx.BaaS.Query

  query.compare('index','=', which)

  activitys.setQuery(query).find()
    .then(res => cb(res))
    .catch(err => console.dir(err))
}

module.exports = {
  getActivitys,
}