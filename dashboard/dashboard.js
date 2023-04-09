const timeInMilliseconds = Date.now();
console.log(timeInMilliseconds); // 1593765214488

const time = new Date;
// get day of the month
const date = time.getDate();
console.log(date); // 30

// get month of the year
const month = time.getMonth();

// get day of the week
const year = time.getFullYear();
console.log(year); // 2020

const utcDate = time.getUTCDate();
console.log(utcDate); // 30

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

document.getElementById("calendar-month").innerHTML =  monthNames[month] + " " + " "+ year;
document.getElementById("calendar-day").innerHTML = utcDate;