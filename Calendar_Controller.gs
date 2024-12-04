function doGetCalendar(start, end, schoolName, id) {
  const calendar = CalendarApp.getCalendarById(id)

  let option = {
    search : schoolName
  }
  
  let events = calendar.getEvents(start, end, option)
  let arr = []

  // Logger.log(events)

  for(let event of events) {
    let obj = new Object();

    obj.title = event.getTitle()
    obj.description = event.getDescription()

    arr.push(obj)
  }

  return arr
}

function doGetCalendarForDay(date, schoolName, id) {
  const calendar = CalendarApp.getCalendarById(id)

  let option = {
    search : schoolName
  }
  
  let events = calendar.getEventsForDay(date, option)
  let arr = []

  for(let event of events) {
    let obj = new Object();

    obj.title = event.getTitle()
    obj.description = event.getDescription()
    obj.end = event.getEndTime()

    arr.push(obj)
  }

  return arr
}

function isIncludesName(starttime, endtime, schoolName, id, trial_id) {
  starttime = new Date(starttime)
  endtime = new Date(endtime)

  let schedules = doGetCalendarForDay(endtime, schoolName, id)

  let matched = schedules.filter(word => word.end == endtime.toString())

  // Logger.log("Debug: " + matched)

  if (!matched.length) {
    matched = doGetCalendar(starttime, endtime, schoolName, trial_id)
  }

  return matched
}

function write_calendar(data, description) {
  let starttime = new Date(data.start_time)
  let endtime = new Date(data.end_time)

  // let schedules = doGetCalendarForDay(endtime, data.schoolName, CALENDAR_TEST_ID)
  let schedules = doGetCalendarForDay(endtime, data.schoolName, CALENDAR_ID)

  let matched = schedules.filter(word => word.end == endtime.toString())

  let option = {
      search : data.schoolName
    }
  
  if (matched.length) { 
    // const calendar = CalendarApp.getCalendarById(CALENDAR_TEST_ID)
    const calendar = CalendarApp.getCalendarById(CALENDAR_ID)
        
    let events = calendar.getEventsForDay(starttime, option) 

    for(let i = 0; i < events.length; i++) {
      // Logger.log(events[i].getTitle() + " : " +data.calendar_school)
      // Logger.log(events[i].getTitle().includes(data.calendar_school))
      // Logger.log(events[i].getEndTime().toString() + ":" + endtime.toString())

      if (events[i].getEndTime().toString() == endtime.toString() && events[i].getTitle().includes(data.calendar_school)) {
        events[i].setDescription(description)

        // Logger.log(events[i].getTitle() + ":" + description)
        Logger.log("OK")
      }
    }
  } else {
    // const calendar = CalendarApp.getCalendarById()
    const calendar = CalendarApp.getCalendarById(CALENDAR_TRIAL_ID)

    let events = calendar.getEvents(starttime, endtime, option)

    for(let i = 0; i < events.length; i++) {
      Logger.log(events[i].getTitle() + " : " +data.calendar_school)
      Logger.log(events[i].getTitle().includes(data.calendar_school))
      // Logger.log(events[i].getEndTime().toString() + ":" + endtime.toString())

      if (events[i].getEndTime().toString() == endtime.toString() && events[i].getTitle().includes(data.calendar_school)) {
        events[i].setDescription(description)

        // Logger.log(events[i].getTitle() + ":" + description)
        Logger.log("OK")
      }
    }
  }
}

