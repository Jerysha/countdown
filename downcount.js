const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Saturday",
];
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDay();

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);
//new date(2020, 3, 24, 11, 30, 0)
//let futureDate = new Date();
//console.log(futureDate);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
/* Hay que hacer un array con los meses porque el array del metodo
getMonth inicia desde 0 y no 1, entonces Enero seria 0 y no 1 "04/00/2020" y es "04/01/2020" */
let month = futureDate.getMonth();
month = months[month];
//console.log(months[month]);
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${year}, ${hours}:${minutes}am`;
//Future time in miliseconds
const futureTime = futureDate.getTime();
//console.log(futureTime);

function getRemainingTime(){
    const today = new Date().getTime();
    //console.log(today);
    const t = futureTime - today;
    //console.log(t);
    //1s = 1000ms
    //1min = 60s
    //1hr = 60min
    //1d = 24hr
    //values in miliseconds
    const oneDay = 24*60*60*1000;
    //console.log(oneDay);
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;
    //calculate values
    let days = t/oneDay;
    //console.log(days);
    days = Math.floor(days);
    let hours = Math.floor((t%oneDay)/oneHour);
    //console.log(hours);

    let minutes = Math.floor((t%oneHour)/oneMinute);
    //console.log(minutes);
    let seconds = Math.floor((t%oneMinute)/1000);
    //console.log(seconds);
    function format(item){
        if(item < 10){
            return item = `0${item}`;
        }
        return item;
    }
    //set values array
    const values = [days,hours,minutes,seconds];
    items.forEach(function(item, index){
        item.innerHTML = format(values[index]);
    });
    if(t < 0){
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
    }
}
//countdown
//One Second = 1000, que la pagina se refresque cada segundo
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();