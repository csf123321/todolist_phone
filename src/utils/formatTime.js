function formatTime(time_obj){
    const year = time_obj.getFullYear()
    const month = time_obj.getMonth()>8?time_obj.getMonth()+1:`0${time_obj.getMonth()+1}`
    const date = time_obj.getDate()>9?time_obj.getDate():`0${time_obj.getDate()}`

    const hour = time_obj.getHours()>9?time_obj.getHours():`0${time_obj.getHours()}`
    const time = time_obj.getMinutes()>9?time_obj.getMinutes():`0${time_obj.getMinutes()}`
    const second = time_obj.getSeconds()>9?time_obj.getSeconds():`0${time_obj.getSeconds()}`

    return {
        date:`${year}/${month}/${date}`,
        time:`${hour}:${time}:${second}`
    }
}

export default formatTime

const test_date = new Date()

console.log(formatTime(test_date))