var empName = document.querySelector("#empname");
var empAge = document.querySelector("#empage");
var empCountry = document.querySelector("#country");
var empState = document.querySelector("#state");

var country = [];
var uniqueCountry = [];
var rowno = 0;
var isValid = true;

function validateForm() {
  var a = document.getElementById("empname").value;
  var b = document.getElementById("empage").value;
  var c = document.getElementById("country").value;
  var d = document.getElementById("state").value;
  if (a == null || a === "") {
    alert("Required Field : Enter Your Name");
    return false;
  } else if (b == null || b === "") {
    alert("Required Field : Enter Your Age");
    return false;
  } else if (c == null || c === "") {
    alert("Required Field : Select Country");
    return false;
  } else if (d == null || d === "") {
    alert("Required Field : Select State");
    return false;
  }

  return true;
}

var submitBtn = document.querySelector("#save");

function clickEventHandler() {
  if (validateForm() === false) {
    isValid = false;
    return;
  } else {
    isValid = true;
  }
  var newDate = new Date();
  var year = newDate.getUTCFullYear();
  var userAge = Math.abs(year - empAge.value);
  var tableUser = document.querySelector("#table1");
  var row = tableUser.insertRow(-1);
  var name = row.insertCell(0);
  var age = row.insertCell(1);
  var country = row.insertCell(2);
  var state = row.insertCell(3);
  name.innerHTML = empName.value;
  age.innerHTML = userAge;
  country.innerHTML = empCountry.value;
  state.innerHTML = empState.value;
}

function countryCount() {
  if (isValid === false) return;

  var flag = 0;
  //create a new table with id table1 in your index.html
  var tds = document
    .getElementById("table1")
    .querySelectorAll("tr td:nth-child(3)");
  var newcountry = tds[tds.length - 1].textContent;

  for (var l = 0; l < country.length; l++) {
    if (country[l] === newcountry) {
      flag = 1;
      break;
    }
  }

  if (flag === 0) {
    country[country.length] = tds[tds.length - 1].textContent;
    //means you don't have the country.
    //just add the country and count in your table2
    var tableUser = document.querySelector("#table2");
    var row = tableUser.insertRow(-1);
    var countryname = row.insertCell(0);
    var countrynum = row.insertCell(1);

    countryname.innerHTML = newcountry;
    countrynum.innerHTML = "1";
  } else {
    //means you have the country.
    //Find the country from the new table and take the count of the country and increment that.
    //TO GET THE COUNTRIES---->
    var myTable = document.getElementById("table2");
    var tds2 = myTable.querySelectorAll("tr td:first-child");

    //GET THE ROWS POSITION WHERE IT IS using
    var k = -1;

    for (var i = 0; i <= tds2.length; i++) {
      if (tds2[i].textContent === newcountry) {
        k = i;
        break;
      }
    }

    //UPDATE THE ROW
    myTable.rows[k + 1].cells[1].innerHTML =
      parseInt(myTable.rows[k + 1].cells[1].innerHTML) + 1;
  }
}

function clearAll() {
  if (isValid === false) return;
  empName.value = "";
  empAge.value = "";
  empCountry.value = "";
  empState.value = "";
}

function clearTable() {
  var tableHeaderRowCount = 1;
  var table = document.getElementById("table1");
  var rowCount = table.rows.length;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    table.deleteRow(tableHeaderRowCount);
  }

  table = document.getElementById("table2");
  rowCount = table.rows.length;
  for (var j = tableHeaderRowCount; j < rowCount; j++) {
    table.deleteRow(tableHeaderRowCount);
  }

  country = [];
  uniqueCountry = [];
  rowno = 0;
  isValid = true;
}

submitBtn.addEventListener("click", clickEventHandler);
submitBtn.addEventListener("click", clearAll);
submitBtn.addEventListener("click", countryCount);
