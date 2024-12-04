function get_Events() {
  const sheetSettings = SPREADSHEET.getSheetByName("設定");
  const sheetResult = SPREADSHEET.getSheetByName("[シートの名前]");

  sheetResult.deleteRows(2, sheetResult.getLastRow())

  const result_db = SpreadSheetsSQL.open(SS_ID, SS_SCHOOL_RESULT) // 本当はけしからんがSS_SQLの操作定義

  const startDate = sheetSettings.getRange(4, 2).getValue(); // 取得開始日
  const endDate = sheetSettings.getRange(5, 2).getValue(); // 取得終了日

  const weekDay = ["日", "月", "火", "水", "木", "金", "土"];
  let datas = getData(startDate, endDate)

  console.log(datas)

  let result = []

  for(let i = 0; i < datas.length; i++) {
    let date = new Date(datas[i].start_time)

    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dof = weekDay[date.getDay()]

    let format_data = {
      "体験日" : `${month}/${day}`,  
      "申込者名" : datas[i].reserver,  
      "体験者氏名" : datas[i].first_name,  
      "学年" : datas[i].first_grade,  
      "体験者氏名②" : datas[i].second_name,
      "学年②" : datas[i].second_grade,
      "電話番号" : "'0" + datas[i].phone_number,
      "メールアドレス" : datas[i].email,
      "体験校舎" : datas[i].calendar_school,
      "曜日" : dof,
      "部" : "",
      "ビ・マ・英" : datas[i].department,  
      "担当" : "",  
      "申し込み方法" : "",  
      "備考" : "",
    }

    result_db.insertRows([format_data])
  }
}
