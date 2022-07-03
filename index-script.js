//Variables
let numOfItems=0
let saveButton = document.querySelector('.saveButton')
let inputValue = document.forms[0];
let display = document.querySelector('.display');
let data = []
let sortByNameBtn = document.querySelector('.sortByName')
let sortByDateBtn = document.querySelector('.sortByDate')
let sortByHourBtn = document.querySelector('.sortByHour')
let unsortBtn = document.querySelector('.unsortBtn')
let moreBtn = document.querySelector('.moreBtn') 
let deleteAllEventsBtn = document.querySelector('.deleteAllEventsBtn')
let debugDisplay = document.querySelector('.debugDisplay')

//EVENT LISTENERS
document.body.addEventListener('load', loadAgenda)
saveButton.addEventListener('click',addEvent)
sortByNameBtn.addEventListener('click', sortByName)
sortByDateBtn.addEventListener('click', sortByDate)
sortByHourBtn.addEventListener('click', sortByHour)
unsortBtn.addEventListener('click', unsort)
moreBtn.addEventListener('click', displayHiddenBtns)
deleteAllEventsBtn.addEventListener('click',deleteAllEvents)
debugDisplay.addEventListener('click',debugIt)

//FUNCTIONS

function loadAgenda (){
  let myNumOfItems = localStorage.getItem('numOfItemsByMyAgendaAdvanced')
  if (myNumOfItems != null){
      numOfItems = myNumOfItems
  }

  let myData=localStorage.getItem('dataByMyAgendaAdvanced')
  if (myData != null){
      data=JSON.parse(myData)
  }

  let isSorted = localStorage.getItem('isSorted')
  switch (isSorted) {
    case 'byName':
      sortByName();
      break;
    case 'byDate':
      sortByDate();
      break;
    case 'byHour':
      sortByHour();
    default:
      buildTable();
  }

}

function addEvent(){
  numOfItems++
  eventIndex = numOfItems-1
  let eventName = `event${eventIndex}`
  let event = {eventName: eventName, name: inputValue[0].value, date: inputValue[1].value, hour: inputValue[2].value}
  data.push(event)

  storeEvents()
  loadAgenda()
}
function buildTable(){
  let table = document.querySelector('.table')
  table.innerHTML = ""
  for (let events in data){
    let getDate = new Date(data[events].date);
    let getDay = getDate.getDate()
    let getMonthNum = getDate.getMonth()
    let months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"]
    let getMonth = months[getMonthNum]
    let getYear = getDate.getFullYear()
    let shownDate= `${getDay} de ${getMonth}`
    let newRow = `<tr>
      <td>${data[events].name}</td>
      <td>${shownDate}</td>
      <td>${data[events].hour}</td>
      <td><button type='button' class='deleteButton' onclick="deleteEvent('${data[events].eventName}')">Delete</button></td>
      </tr>`
    table.innerHTML+= newRow
  }
}

function storeEvents(){
  localStorage.setItem('numOfItemsByMyAgendaAdvanced', numOfItems)
  localStorage.setItem('dataByMyAgendaAdvanced',JSON.stringify(data))
}

function deleteEvent (argument){
  let event = data.find(getEvent => getEvent.eventName === argument);
  data.splice(event,1)
  storeEvents()
  buildTable()
}

function deleteAllEvents(){
  if (confirm("Confirm? This action cannot be undone.")){   
    data=[]
    storeEvents()
    buildTable()
  }
}

function sortByName(){
  function compare(a,b){
    if (a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }
  data.sort(compare)
  buildTable()
  localStorage.setItem('isSorted', 'byName')
}
function sortByDate(){
  function compare(a,b){
    if (a.date < b.date ){
      return -1;
    }
    if ( a.date > b.date ){
      return 1;
    }
    return 0;
  }
  data.sort(compare)
  buildTable()
  localStorage.setItem('isSorted', 'byDate')
}
function sortByHour(){
  function compare(a,b){
    if (a.hour < b.hour ){
      return -1;
    }
    if ( a.hour > b.hour ){
      return 1;
    }
    return 0;
  }
  data.sort(compare)
  buildTable()
  localStorage.setItem('isSorted', 'byHour')
}
function unsort(){
  function compare(a,b){
    if (a.eventName < b.eventName ){
      return -1;
    }
    if ( a.eventName > b.eventName ){
      return 1;
    }
    return 0;
  }
  data.sort(compare)
  buildTable()
  localStorage.setItem('isSorted', 'false')
}
function debugIt(){
  if (debugDisplay.innerHTML == "Debug..."){
    let debugDisplay = document.querySelector('.debugDisplay')
    let storedData = JSON.parse(localStorage.getItem('dataByMyAgendaAdvanced'))
    debugDisplay.innerHTML= ""
    debugDisplay.innerHTML+= "Data:"
    for (let keys in storedData){
      let objects = JSON.stringify(storedData[keys])
      debugDisplay.innerHTML+=objects
    }
  } else {
    debugDisplay.innerHTML="Debug..."
  }
}
function displayHiddenBtns(){
  let hiddenBtns = document.querySelector('.hiddenBtns')
  if (hiddenBtns.style.display == 'grid'){
    hiddenBtns.style.display='none'
    moreBtn.innerHTML= "more"
  } else {
    hiddenBtns.style.display='grid';
    moreBtn.innerHTML= "less"
  }
  
}

loadAgenda()