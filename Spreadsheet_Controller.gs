/*
  GASをSQLライクに利用できるライブラリ -> spreadsheetSQL
  ドキュメント: https://github.com/roana0229/spreadsheets-sql
*/
const db = SpreadSheetsSQL.open(SS_ID, SS_NAME)
const schoolName_db = SpreadSheetsSQL.open(SS_ID, SS_SCHOOL_NAME)
const schoolRoot_db = SpreadSheetsSQL.open(SS_ID, SS_SCHOOL_ROOT)

function getData(start, end) {
  start = new Date(start).getTime()
  end = new Date(end).getTime()

  Logger.log(start + ":" + end)
  let result = db
        .select([
          "booking_school",
          "calendar_school", 
          "department",
          "reserver", 
          "phone_number", 
          "email", 
          "reason", 
          "first_grade", 
          "first_name", 
          "first_school", 
          "second_grade", 
          "second_name", 
          "second_school", 
          "third_grade", 
          "third_name", 
          "third_school", 
          "playtime", 
          "isBring", 
          "note", 
          "status",
          "customer_memo", 
          "start_time", 
          "end_time", 
          "last_change", 
          "time_no",
          "staff_note"
          ])
        .filter(`time_no >= ${start} AND time_no <= ${end}`)
        .orderBy(["time_no"])
        .result();

return result
} 

function get_termsData(term) {
  let result = ""

  switch(term) {
    case "change":
      result = db
        .select([
          "booking_id",
          "booking_school",
          "calendar_school", 
          "reserver", 
          "phone_number", 
          "email", 
          "reason", 
          "first_grade", 
          "first_name", 
          "first_school", 
          "second_grade", 
          "second_name", 
          "second_school", 
          "third_grade", 
          "third_name", 
          "third_school", 
          "playtime", 
          "isBring", 
          "note", 
          "status",
          "newData",
          "change",
          "customer_memo", 
          "start_time", 
          "end_time", 
          "last_change", 
          "time_no",
          "staff_note"
          ])
        .filter(`change = true`)
        .result();

        return result
    
    case "insert":
      result = db
        .select([
          "booking_id",
          "booking_school",
          "calendar_school", 
          "reserver", 
          "phone_number", 
          "email", 
          "reason", 
          "first_grade", 
          "first_name", 
          "first_school", 
          "second_grade", 
          "second_name", 
          "second_school", 
          "third_grade", 
          "third_name", 
          "third_school", 
          "playtime", 
          "isBring", 
          "note", 
          "status",
          "newData",
          "change",
          "customer_memo", 
          "start_time", 
          "end_time", 
          "last_change", 
          "time_no",
          "staff_note"
          ])
        .filter(`newData = true`)
        .result();
  }

  return result
} 

function updateData(data) {
  data.newData = false

  db.updateRows(data, `email = ${data.email} AND booking_id = ${data.booking_id}`)

  Logger.log("--Update--")
}

function insertData(data) {
  // Logger.log(data)
  db.insertRows([data])
  Logger.log("--Insert--")
}

function deleteData(data) {
  db.deleteRows(`email = ${data.email} AND booking_id = ${data.booking_id}`)
  Logger.log("--Delete--")
}

function getSchoolName(name) {
  Logger.log(name)
  let schoolId = schoolName_db
                .select(["stores_name", "name_id"])
                .filter(`stores_name = ${name}`)
                .result()

  Logger.log(schoolId)
              
  let calendar_name = schoolRoot_db
                    .select(["No", "Name"])
                    .filter(`No = ${schoolId[0].name_id}`)
                    .result()

  return calendar_name[0].Name
}

function write_spreadsheet(data) {
  /*
    case0: データのi番目が、スプレッドシートにあるデータに一致する & 最終変更時間が一致する -> continue
    case1: データのi番目が、スプレッドシートにあるデータに一致する & 最終変更時間が一致しない -> 最新データにupdate
    case2: データのi番目が、スプレッドシートにあるデータに一致しない -> insert
  */

  Logger.log("check in")


  for(let i = 0; i < data.length; i++) {
    // Logger.log(data)
    Logger.log(data[i].reserver + ":" + data[i].email)
    // Logger.log(data[i].calendar_school)
    // Logger.log(db.select(["reserver"]).filter(`reserver = ${data[i].reserver}`).result())
    // Logger.log(!db.select(["last_change"]).filter(`last_change = ${data[i].last_change}`).result())

    let customerFoundExist = db
                            .select(["phone_number", "booking_id"])
                            .filter(`phone_number = ${data[i].phone_number} AND booking_id = ${data[i].booking_id}`)
                            .result().length;

    let lastChangeExist = db
                            .select(["phone_number", "last_change"])
                            .filter(`phone_number = ${data[i].phone_number} AND last_change = ${data[i].last_change}`)
                            .result().length;

    if(customerFoundExist && lastChangeExist) 
    {
      Logger.log("case 0")
      continue // 必要がなければここで抜ける
    } 
    else if (customerFoundExist && !lastChangeExist) 
    {
      Logger.log("case 1")
      data[i].change = true
      updateData(data[i])
    }
    else 
    {
      Logger.log("case 2")
      data[i].change = false
      data[i].newData = true
      insertData(data[i])
    }

    let result = description_generator(isIncludesName(data[i].start_time, data[i].end_time, data[i].calendar_school, CALENDAR_ID, CALENDAR_TRIAL_ID), data[i], data[i].change)

    // Logger.log(result)
    // write_calendar(data[i], result)
  }

  return data
}

function change_false () {
  db.updateRows({change: "false"}, "change = true")
}

function test_1() {
    change_false()
}