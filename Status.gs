function get_Status(res) {
  const status = {
    "no_vacancy_notified" : "満席連絡済",
    "slot_full" : "満席",
    "pending" : "未承認",
    "accepted" : "確定済",
    "canceled_by_host" : "マーチャントによるキャンセル",
    "canceled_by_customer" : "顧客によるキャンセル",
  }

  Logger.log(res)

  if (res in status) {
    Logger.log(res)
    return status[res]
  }
}

function test() {
  console.log(get_Status("accepted"))
}