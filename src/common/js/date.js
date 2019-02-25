//t均为时间戳

//补足前面的0
function padZero(t) {
  return t >= 10 ? t : '0' + t
}

//格式化hh:mm
function formatTime(t) {
  let time = new Date(t)
  let h = padZero(time.getHours())
  let m = padZero(time.getMinutes())

  return h + ':' + m
}

//格式化为mm月dd日
function formatMonth(t) {
  let time = new Date(t)
  let m = time.getMonth() + 1
  let d = padZero(time.getDate())
  return m + '月' + d + '日'
}

//格式化为yyyy年mm月dd日
function formatYear(t) {
  let time = new Date(t)
  let y = padZero(time.getFullYear())
  let m = padZero(time.getMonth() + 1)
  let d = padZero(time.getDate())

  return y + '年' + m + '月' + d + '日'
}

//格式化为xx分钟前
function formatMinutes(that, now) {
  let offset = now - that
  return new Date(offset).getMinutes() + '分钟前'
}


export const formatComment = function (t) {
  let currentTime = new Date()
  let thatTime = new Date(t)

  if (currentTime.getFullYear() - thatTime.getFullYear() >= 1) {
    return formatYear(t)
  }

  if (currentTime.getMonth() - thatTime.getMonth() >= 1) {
    return formatMonth(t)
  }

  if (currentTime.getDate() - thatTime.getDate() > 1) {
    return formatMonth(t)
  }

  if (currentTime.getDate() - thatTime.getDate() == 1) {
    return '昨天' + formatTime(t)
  }

  if (currentTime.getHours() - thatTime.getHours() >= 1) {
    return formatTime(t)
  }

  if (currentTime.getMinutes() - thatTime.getMinutes() < 1) {
    return '刚刚'
  }
  return formatMinutes(t, currentTime)
}

//格式化mv的duration
export const formatDuration = function (t) {
  let time = new Date(t)
  let h = padZero(time.getHours() - 8)
  let m = padZero(time.getMinutes())
  let s = padZero(time.getSeconds())

  let ret = ''
  if (h == 0) {
    ret = m + ':' + s
  } else {
    ret = h + ':' + m + ':' + s
  }
  return ret
}
