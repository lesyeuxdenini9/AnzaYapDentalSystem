
const calculateAge = (Bday)=>{

    var datenow = new Date()
    var yearnow = datenow.getFullYear()
    var monthnow = datenow.getMonth()
    var daynow = datenow.getDate()

    var bdate = new Date(Bday)
    var year = bdate.getFullYear()
    var month = bdate.getMonth()
    var day = bdate.getDate()

    let age

    if((monthnow < month)){
        age =  (yearnow-year) - 1
    }else if(monthnow == month){
        if(daynow < day){
            age = (yearnow-year) - 1
        }else{
            age = (yearnow-year)
        }
    }else{
        age = (yearnow-year)
    }
    return age

}

const MonthArray = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]


const formatBdayDate = (Bday)=>{
    if(Bday == null) return ""
    var Bdate = new Date(Bday)
    return `${MonthArray[Bdate.getMonth()]} ${Bdate.getDate()}, ${Bdate.getFullYear()}`
}

const formatDate = (date)=>{
    let bdate = new Date(date)
    let year =  bdate.getFullYear()
    let month = `0${bdate.getMonth()+1}`
    let day = `0${bdate.getDate()}`
    return  `${year}-${month.slice(-2)}-${day.slice(-2)}`
}

const formatHour = (hour)=>{
    if(hour == null) return "00:00"
    const hournew = new Date(hour)
    // const hourdata = new Date(hournew-(60*1000*480) )
    const hourdata = hournew
    const _hour = `0${hourdata.getHours()}`
    const _minute = `0${hourdata.getMinutes()}`
    return `${_hour.slice(-2)}:${_minute.slice(-2)}`
}



const format12Hour = (hour)=>{
    let formattedhour = formatHour(hour)
    let rawhour = formattedhour.split(":")
    let finalhour
    if(rawhour[0] == 12){
        return `${formattedhour} pm`
    }
    else if(rawhour[0] > 12){
            finalhour = rawhour[0] - 12
            return `${finalhour}:${rawhour[1]} pm`
    }else if(parseInt(rawhour[0])==0){
        finalhour = 12
        return `${finalhour}:${rawhour[1]} am`
    }else{
        return `${formattedhour} am`
    }

}

const format12HourNewServer = (hour)=>{
    if(hour == null) return "00:00"
    const hournew = new Date(hour)
    // const hourdata = new Date(hournew-(60*1000*480) )
    const hourdata = hournew
    const _hour = `0${hourdata.getHours()}`
    const _minute = `0${hourdata.getMinutes()}`
    let formattedhour = `${_hour.slice(-2)}:${_minute.slice(-2)}`
    let rawhour = formattedhour.split(":")
    let finalhour
    if(rawhour[0] == 12){
        return `${formattedhour} pm`
    }
    else if(rawhour[0] > 12){
            finalhour = rawhour[0] - 12
            return `${finalhour}:${rawhour[1]} pm`
    }else if(parseInt(rawhour[0])==0){
        finalhour = 12
        return `${finalhour}:${rawhour[1]} am`
    }else{
        return `${formattedhour} am`
    }

}

const formatraw12Hour = (formattedhour)=>{
    let rawhour = formattedhour.split(":")
    let finalhour
    if(rawhour[0] == 12){
        return `${formattedhour} pm`
    }
    else if(rawhour[0] > 12){
            finalhour = rawhour[0] - 12
            return `${finalhour}:${rawhour[1]} pm`
    }else if(parseInt(rawhour[0])==0){
        finalhour = 12
        return `${finalhour}:${rawhour[1]} am`
    }else{
        return `${formattedhour} am`
    }
}

const limitText = (text)=>{
    if(text.length >= 70){
        text = `${text.slice(0,-3)}...`
    }
    return text
}

const roundToDecimal = (num,decimalplace)=> {   
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?!=\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    let dec =  +(Math.round(num + `e+${decimalplace}`)  + `e-${decimalplace}`);
    return numberWithCommas(dec)

}

const maskspace = (mask,varString)=>{
    let length = String(varString).length
    let maskspace = parseInt(mask) - parseInt(length)
    let space = ''
    for(let x = 0; x < maskspace;x++){
        space = space + '\xa0'
    }

    
    return `${varString}${space}`
    
}


module.exports = { calculateAge, formatBdayDate , formatDate, roundToDecimal , formatHour , format12Hour, limitText , formatraw12Hour , maskspace , format12HourNewServer}