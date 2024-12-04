// カレンダーに元から書いてある情報を残し、体験会情報だけ更新する

function description_generator(calendar_data, data, change) {
  try {
    let result = "\n##########体験予約##########\n"

    Logger.log(calendar_data)

    let description = calendar_data[0].description

    if(change) {
      // 変更が入ったときは、変更が入った場所のみを削除し最新のものに切り替える。
      Logger.log("CHANGE IN")

      reserver = description.indexOf(`\n#########体験予約##########\n予約者: ${data.reserver}`)

      // Logger.log("Debug: " + reserver + ":" + description.indexOf("///", reserver))

      let tmp = description.substring(reserver - 1, description.indexOf("///", reserver) + 3 )
      description = description.replace(tmp, "")
      updateData(data)
    }

    // Logger.log("Debug: " + description)
    // Logger.log("Debug: " + change)
    // Logger.log("Debug:" + get_Status(data.status) + " : " + data.status)
    
    let calendar_format = {
        "予約者" : data.reserver,
        "電話番号" : "0" + data.phone_number,
        "Email": data.email,
        "予約情報": data.customer_memo,
        "学年(1人目)": data.first_grade,
        "名前(1人目)": data.first_name,
        "学校名(1人目)": data.first_school,
        "学年(2人目)": data.second_grade,
        "名前(2人目)": data.second_name,
        "学校名(2人目)": data.second_school,
        "学年(3人目)": data.third_grade,
        "名前(3人目)": data.third_name,
        "学校名(3人目)": data.third_school,
        "プレイ時間": data.playtime,
        "機材貸出": data.isBring,
        "予約状況" : get_Status(data.status),
        "備考": data.note,
        "備考(staff用)" : data.staff_note
    }

    for(let key in calendar_format) {
      // Logger.log(calendar_format[key])
      if ((calendar_format[key] != "" )) {
        result += `${key}: ${calendar_format[key]}\n`
      }
    }

    Logger.log("Debug:" + result)

    return (description + result + "//#####///")
  } catch(e) {
    Logger.log("エラー発生: e")
    Logger.log("E debug:" + "\n calendar_data:" + calendar_data + "\n data:" + data + "\n reserve:" + data.reserver)

    return("エラー発生: 手動で書き込んでください" + "\n 予約者名: " + data.reserver)
  }
}

