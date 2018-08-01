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

let addBook = (ctx, cb) => {

  let tableId = getApp().globalData.tableOfSurveyID,
    Books = new wx.BaaS.TableObject(tableId),
    Book = Books.create(),
    bookName = ctx.data.creatingBookName

  let data = {
    bookName,
  }

  Book.set(data)
    .save()
    .then(res => cb(res))
    .catch(err => console.dir(err))

}

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

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
}