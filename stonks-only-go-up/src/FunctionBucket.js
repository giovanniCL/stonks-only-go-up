// Function Bucket
// This file can serve as just a haven for general use functions

export function checkObjectNoProperties(obj) {
    for (var key in obj) {
        if (obj[key] !== null && obj[key] !== "")
            return false;
    }
    return true;
}

export function niceTimestampFormat(stringToFormat) {
    let bigTimestamp = stringToFormat.split(' ')[0]
    let smallTimestamp = stringToFormat.split(' ')[1]
    if (!!smallTimestamp) { // If intraday
        const dropEndTime = smallTimestamp.split(":").slice(0,2).join(":")
        let hourTime = dropEndTime.split(":")[0]
        if (parseInt(hourTime) > 12) {
            return [parseInt(hourTime) - 12, dropEndTime.split(":")[1]].join(":")
        } else {
            return dropEndTime
        }
    } else { // If counted by days (anything besides 24 hr)
        return bigTimestamp.split('-').slice(1, 3).join('/')
    }
}