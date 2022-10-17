var currentDate = new Date();
var currentDateArray = [
  currentDate.getFullYear(),
  (currentDate.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
  (currentDate.getDate()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
];
var dateInputValue = currentDateArray.join('-');
document.getElementById('date-display').innerHTML = currentDate.toDateString();
document.getElementById('date-input').setAttribute('value', dateInputValue);

function oneDay(choice) {
  var addDays = 0;
  if (choice == '<') {
    addDays = -1;
  } else if (choice == '>') {
    addDays = 1;
  }

  currentDate.setDate(currentDate.getDate() + addDays);
  currentDateArray = [
    currentDate.getFullYear(),
    (currentDate.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}),
    (currentDate.getDate()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  ];
  dateInputValue = currentDateArray.join('-');

  document.getElementById('date-display').innerHTML = currentDate.toDateString();
  document.getElementById('date-input').value = dateInputValue;
  getData();
}

function changeDate() {
  dateInputValue = document.getElementById('date-input').value;
  currentDateArray = dateInputValue.split('-');
  currentDate.setFullYear(
    parseInt(currentDateArray[0]),
    parseInt(currentDateArray[1]) - 1,
    parseInt(currentDateArray[2])
  );

  document.getElementById('date-display').innerHTML = currentDate.toDateString();
  getData();
}

// data retrieval
const URL = 'lectionary.json';

function getData(){
  fetch(URL)
  .then(rep => rep.json())
  .then(data => {
    outData(data.main);
  })
}

function outData(val) {
  let html = '';
  val.forEach((ele) => {
    if (ele.date == currentDateArray.join('/')) {
      ele.html.forEach((date_ele) => {
        html += date_ele;
      })
    }
  })
  document.getElementById('content').innerHTML = html;
}

getData();
// data retrieval
