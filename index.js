// Your code here

// createEmployeeRecord:
// -populates firstName from [0] element
// -populates familyName from [1] element
// -populates title field from [2] element
// -populates payPerHour from [3] element
// -initializes timeInEvent []
// -initializes timeOutEvent []

function createEmployeeRecord(employee){
    //[firstName,familyName,title,payPerHour]
    // let employee = {  
    //     firstName: `${firstName}`,
    //     familyName: `${familyName}`,
    //     title: `${title}`,
    //     payPerHour: payPerHour,
    //     timeInEvents : [],
    //     timeOutEvents : [],
    // }
    // return employee
    return {  
            firstName: employee[0],
            familyName: employee[1],
            title: employee[2],
            payPerHour: employee[3],
            timeInEvents : [],
            timeOutEvents : [],
        }
}

// createEmployeeRecords
// takes an array of arrays
// returns array of objects
// convert nested array into employeed record using createEmployeeRecord()
function createEmployeeRecords(array){
    return array.map(array => createEmployeeRecord(array))
}

// createTimeInEvent
// creates the correct type
// extracts the correct date
// extracts the correct hour
function createTimeInEvent(employee, dateStamp){
    const [date, hour] = dateStamp.split(" ")
    let eventObj = {
            type: "TimeIn",
            hour: parseInt(hour),
            date: date,
    }
    employee.timeInEvents.push(eventObj)
    return employee
}


// createTimeOutEvent
// creates the correct type
// extracts the correct date
// extracts the correct hour
function createTimeOutEvent(employee, dateStamp){
    const [date, hour] = dateStamp.split(" ")
    let eventObj = {
            type: "TimeOut",
            hour: parseInt(hour),
            date: date,
    }
    employee.timeOutEvents.push(eventObj)
    return employee
}

// hoursWorkedOnDate
// calculated hours worked by employee record and a date
function hoursWorkedOnDate(employee, soughtDate){
    //console.log(employee, soughtDate)
  const hourIn = employee.timeInEvents.find(event => event.date === soughtDate)
  const hourOut = employee.timeOutEvents.find(event => event.date === soughtDate)
  const hours = hourOut.hour - hourIn.hour
  //console.log(hourIn.hour)
    //console.log(hourOut.hour)
    return hours/100
}

// wagesEarnedOnDate
// mulitplies hoursWorked by payPerHour
function wagesEarnedOnDate(employee, soughtDate){
    const payOwed = hoursWorkedOnDate(employee, soughtDate) * employee.payPerHour
    return payOwed
}

// allWagesFor
// calculates wages for multiple date-matched timeInEvent and TimeOutEvent
// reduce()
function allWagesFor(employee){
    const timeInsArray = employee.timeInEvents.map(obj => obj.date)
    //console.log(timeInsArray)
    const wagesEarned = []
    for (let i = 0; i < timeInsArray.length; i++)
        wagesEarned.push(wagesEarnedOnDate(employee, timeInsArray[i]))
    //console.log(wagesEarned)
    const reducer = (accumulator, current) => accumulator + current
    return (wagesEarned.reduce(reducer))
}   

//     const timeInsArray = employee.timeInEvents.map(obj => obj.hour)
//     const timeOutsArray = employee.timeOutEvents.map(obj => obj.hour)
//     const shiftsArray=[] 
//     for(let i = 0; i < timeOutsArray.length; i++)
//         shiftsArray.push(timeOutsArray[i]-timeInsArray[i]);
//     const wagesEarned=[]
//     const reducer = (accumulator, current) => accumulator + current
//     for(let i = 0; i < shiftsArray.length; i++)
//         wagesEarned.push((shiftsArray[i]/100) * employee.payPerHour)
    
//     return (wagesEarned.reduce(reducer))
// }

// caculatePayroll
// uses createEmployeeRecords, returns array of employee records

function calculatePayroll(employeeRecords){
    const info =[]
    for (let i = 0; i < employeeRecords.length; i++)
        info.push(allWagesFor(employeeRecords[i]))
    const reducer = (accumulator, current) => accumulator + current
    return (info.reduce(reducer))

}
