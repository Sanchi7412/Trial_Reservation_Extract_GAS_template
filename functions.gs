// STORESからの予約を確認する
function check_reserve() {
  Logger.log("==START RESERVE CHECK==")

  let tmp = get_reserve()
  
  let data = get_termsData("insert")

  // Logger.log(data)

  main_func(data)
}

// 情報に変更があったかどうかを確認し書き換える
function change_reserve() {
  Logger.log("==START CHANGE CHECK==")

  let data = get_termsData("change")

  // Logger.log(data)

  main_func(data)
}

function main_func(data) {
  for (let i = 0; i < data.length; i++) {
    let result = description_generator(
      isIncludesName(data[i].start_time, data[i].end_time, data[i].calendar_school, CALENDAR_ID, CALENDAR_TRIAL_ID),
      data[i], 
      data[i].change
      )

    Logger.log(result)

    // Logger.log(data[i])

    write_calendar(data[i], result)
    updateData(data[i])

    data[i].change = false
  }
}
