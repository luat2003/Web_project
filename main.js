const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

class Calendar {
  
    constructor () {
      this.monthDiv = document.querySelector('.cal-month__current')
      this.headDivs = document.querySelectorAll('.cal-head__day')
      this.bodyDivs = document.querySelectorAll('.cal-body__day')
      this.nextDiv = document.querySelector('.cal-month__next')
      this.prevDiv = document.querySelector('.cal-month__previous')
    }
    
    init () {
      moment.locale(window.navigator.userLanguage || window.navigator.language) 
      
      this.month = moment()
      this.today = this.selected = this.month.clone()
      this.weekDays = moment.weekdaysShort(true)
      
      this.headDivs.forEach((day, index) => {
        day.innerText = this.weekDays[index]
      })
      
      this.nextDiv.addEventListener('click', _ => { this.addMonth() })
      this.prevDiv.addEventListener('click', _ => { this.removeMonth() })
      
      this.bodyDivs.forEach(day => {
        day.addEventListener('click', e => {
          const date = +e.target.innerHTML < 10 ? `0${e.target.innerHTML}` : e.target.innerHTML
  
          if (e.target.classList.contains('cal-day__month--next')) {
            this.selected = moment(`${this.month.add(1, 'month').format('YYYY-MM')}-${date}`)
          } else if (e.target.classList.contains('cal-day__month--previous')) {
            this.selected = moment(`${this.month.subtract(1, 'month').format('YYYY-MM')}-${date}`)
          } else {
            this.selected = moment(`${this.month.format('YYYY-MM')}-${date}`)
          }
  
          this.update()
        })
      })
      
      this.update()
    }
    
    update () {
      this.calendarDays = {
        first: this.month.clone().startOf('month').startOf('week').date(),
        last: this.month.clone().endOf('month').date()
      }
      
      this.monthDays = {
        lastPrevious: this.month.clone().subtract(1,'months').endOf('month').date(),
        lastCurrent: this.month.clone().endOf('month').date()
      }
      
      this.monthString = this.month.clone().format('MMMM YYYY')
      
      this.draw()
    }
    
    addMonth () {
      this.month.add(1, 'month')
      
      this.update()
    }
    
    removeMonth () {
      this.month.subtract(1, 'month')
      
      this.update()
    }
    
    draw () {
      this.monthDiv.innerText = this.monthString
    
      let index = 0
  
      if (this.calendarDays.first > 1) {
        for (let day = this.calendarDays.first; day <= this.monthDays.lastPrevious; index ++) {
          this.bodyDivs[index].innerText = day++
  
          this.cleanCssClasses(false, index)
  
          this.bodyDivs[index].classList.add('cal-day__month--previous')
        } 
      }
  
      let isNextMonth = false
      for (let day = 1; index <= this.bodyDivs.length - 1; index ++) {
        if (day > this.monthDays.lastCurrent) {
          day = 1
          isNextMonth = true
        }
  
        this.cleanCssClasses(true, index)
  
        if (!isNextMonth) {
          if (day === this.today.date() && this.today.isSame(this.month, 'day')) {
            this.bodyDivs[index].classList.add('cal-day__day--today') 
          }
  
          if (day === this.selected.date() && this.selected.isSame(this.month, 'month')) {
            this.bodyDivs[index].classList.add('cal-day__day--selected') 
          }
  
          this.bodyDivs[index].classList.add('cal-day__month--current')
        } else {
          this.bodyDivs[index].classList.add('cal-day__month--next')
        }
  
        this.bodyDivs[index].innerText = day++
      }
    }
    
    cleanCssClasses (selected, index) {
      this.bodyDivs[index].classList.contains('cal-day__month--next') && 
        this.bodyDivs[index].classList.remove('cal-day__month--next')
      this.bodyDivs[index].classList.contains('cal-day__month--previous') && 
        this.bodyDivs[index].classList.remove('cal-day__month--previous')
      this.bodyDivs[index].classList.contains('cal-day__month--current') &&
        this.bodyDivs[index].classList.remove('cal-day__month--current')
      this.bodyDivs[index].classList.contains('cal-day__day--today') && 
        this.bodyDivs[index].classList.remove('cal-day__day--today')
      if (selected) {
        this.bodyDivs[index].classList.contains('cal-day__day--selected') && 
          this.bodyDivs[index].classList.remove('cal-day__day--selected') 
      }
    }
  }
  
  const cal = new Calendar()
  cal.init()