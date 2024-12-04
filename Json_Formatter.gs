function get_reserve() {
  const headers = {
  "Authorization": "Bearer " + API_KEY,
  "Content-Type": "application/json",
  "booking_start_from": `${TODAY}`,
  "page" : 30,
  "sort" : "booking_made_asc", 
  }

  const options = {
    headers: headers
  }

  let response = UrlFetchApp.fetch(URL, options)

  let json_data = JSON.parse(response)

  let format_datas = []

  for (let i = 0; i < json_data.reservations.length; i++) {
    let customer_data = json_data.reservations[i]
    let profile_data = customer_data.customer.profile_fields

    let questionnaires = []
    let profile = []

    try {
      for(let k = 0; k < customer_data.questionnaires.length; k++) {
        questionnaires.push(customer_data.questionnaires[k].answer)
      }
    } catch {}

    for(let j = 0; j < profile_data.length; j++ ){
      profile.push(profile_data[j].answer)
    }

    // Logger.log(questionnaires)
    // Logger.log(questionnaires.length)
    // Logger.log(profile)
    format_datas.push(data_formatter(customer_data, profile, questionnaires))
  }

  // Logger.log(format_datas)

  let result_data = write_spreadsheet(format_datas)

  return result_data
}

function data_formatter(customer_data, profile, questionnaires) {
  // Logger.log(customer_data)

  let format_data

  let kids_cnt = []
  for(let i = 0; i < questionnaires.length; i++) {
    if (questionnaires[i] == "確認しました") {
      break;
    }
    kids_cnt.push(questionnaires[i])
  }

  // マイクラ・ビスケ判定
  let department = ""

  if (customer_data.booking_service_name.includes("マイクラ")) {
    department = "マイクラ"
  } else {
    department = "ビスケット"
  }

  // Logger.log(kids_cnt.length)

  for (let j = 0; j < kids_cnt.length; j++){
    questionnaires.shift()
  }

  // Logger.log(questionnaires)

  let time_no = new Date(customer_data.booking_start).getTime()

  if (questionnaires.length > 3) {
    format_data = {
      booking_id : customer_data.booking_service_canonical_id,
      booking_school : customer_data.booking_service_name,
      calendar_school : getSchoolName(customer_data.booking_service_name),
      department : department,
      last_change: customer_data.latest_changed_at,
      start_time : customer_data.booking_start,
      end_time : customer_data.checkout_at,
      time_no : time_no,
      reserver : customer_data.customer_name,
      phone_number : customer_data.customer.phone_number,
      email : customer_data.customer.email,
      customer_memo : customer_data.customer.customer_memo,
      first_grade : kids_cnt[0],
      first_name : profile[3],
      first_school : profile[1],
      reason : questionnaires[1],
      playtime : questionnaires[2],
      isBring : questionnaires[3].includes("持参する") ? "持参する" : "持参しない",
      note : questionnaires.length == 5 ? questionnaires[4] : null,
      status : customer_data.status,
      second_grade : kids_cnt.length  == 2 ? kids_cnt[1] : null,
      second_name : profile[5],
      second_school : profile[7],
      third_grade : kids_cnt.length == 3 ? kids_cnt[2] : null,
      third_name : profile[8],
      third_school : profile[10]
    }  
  } else if (questionnaires.length > 0) {
    format_data = {
      booking_id : customer_data.booking_service_canonical_id,
      booking_school : customer_data.booking_service_name,
      calendar_school : getSchoolName(customer_data.booking_service_name),
      department : department,
      last_change: customer_data.latest_changed_at,
      start_time : customer_data.booking_start,
      end_time : customer_data.checkout_at,
      time_no : time_no,
      reserver : customer_data.customer_name,
      phone_number : customer_data.customer.phone_number,
      email : customer_data.customer.email,
      customer_memo : customer_data.customer.customer_memo,
      first_grade : kids_cnt[0],
      first_name : profile[3],
      first_school : profile[1],
      reason : questionnaires[1],
      note : profile[4],
      status : customer_data.status,
      second_grade : kids_cnt.length  == 2 ? kids_cnt[1] : null,
      second_name : profile[5],
      second_school : profile[7],
      third_grade : kids_cnt.length == 3 ? kids_cnt[2] : null,
      third_name : profile[8],
      third_school : profile[10]
    }
  } else {
    format_data = {
      booking_id : customer_data.booking_service_canonical_id,
      booking_school : customer_data.booking_service_name,
      calendar_school : getSchoolName(customer_data.booking_service_name),
      department : department,
      last_change: customer_data.latest_changed_at,
      start_time : customer_data.booking_start,
      end_time : customer_data.checkout_at,
      time_no : time_no,
      reserver : customer_data.customer_name,
      phone_number : customer_data.customer.phone_number,
      email : customer_data.customer.email,
      customer_memo : customer_data.customer.customer_memo,
      first_grade : profile[0],
      first_name : profile[3],
      first_school : profile[1],
      reason : profile[2],
      note : profile[4],
      status : customer_data.status,
      second_grade : profile[6],
      second_name : profile[5],
      second_school : profile[7],
      third_grade : profile[9],
      third_name : profile[8],
      third_school : profile[10]
    }
  }

  Logger.log(format_data)

  return format_data
}

// function write_spreadsheet(data) {
//   const db = SpreadSheetsSQL.open(SS_ID, SS_NAME)

//   Logger.log("check in")

//   for(let i = 0; i < data.length; i++) {
//     Logger.log(data[i].reserver + ":" + data[i].email)
//     // Logger.log(data[i])
//     // Logger.log(db.select(["booking_id"]).filter(`booking_id = ${data[i].booking_id}`).result())
//     // Logger.log(!db.select(["last_change"]).filter(`last_change = ${data[i].last_change}`).result())
    
//     /*
//     汚いコードですが、IDが固有のものではなさそうなので電話番号とemailが一致し、last_changeが一致しないデータは置き換え対象としています。
//     */
//     if((db.select(["email", "phone_number"]).filter(`email = ${data[i].email} AND phone_number = ${data[i].phone_number}`).result().length) 
//       && (db.select(["last_change"]).filter(`last_change = ${data[i].last_change}`).result().length)) 
//     {
//       Logger.log("case 0")
//       continue
//     } 
//     else if ((db.select(["email", "phone_number"]).filter(`email = ${data[i].email} AND phone_number = ${data[i].phone_number}`).result().length) 
//       && (!db.select(["last_change"]).filter(`last_change = ${data[i].last_change}`).result().length)) 
//     {
//       db.updateRows(data[i], `booking_id = ${data[i].email} AND phone_number = ${data[i].phone_number}`)
//       Logger.log("case 1")
//     }
//     else 
//     {
//       db.insertRows([data[i]])
//       Logger.log("case 2")
//     }
//   }
// }