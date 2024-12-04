function time_Format(str_date) {
  let date = new Date(str_date)

  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDay()

  return `${year}${month}${day}`
}