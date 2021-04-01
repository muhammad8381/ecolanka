const navSlide= ()=> {
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navlinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click',()=>{
    nav.classList.toggle('nav-active');
    });

navlinks.forEach((link,index) =>{
        link.style.animation = `navlinkFade 0.5s ease forwards ${index / 7 + 1.2}s`;
        console.log(index/7);    
        
})
}
navSlide();

//Button functions
function openURI(uri_link) {
  window.location.href = uri_link;
}

function openNewTab(link) {
  window.open(link);
}

// Buy Now Page 
var total_manufac = 0;
var total_product = 0;
var total_size = 0;
var total_extras = 0;
var totalCost = 0;
var count = 1;
var final_order = 0;
var loyalty = 0;

var ids = ["", "current_order", "product_order", "size_field", "extras_field", "total_field"];
var headings = ["", "Manufacturer: ", "Product: ", "Size: ", "Extras: ", "Total: "];

var buyForm = document.getElementById("buyNowForm");
function handleForm(event) { event.preventDefault(); }
buyForm.addEventListener('submit', handleForm);

if (localStorage["sales_EcoLanka"] == null || localStorage["sales_EcoLanka"] == NaN || localStorage["sales_EcoLanka"] == undefined) {
  localStorage["sales_EcoLanka"] = "0";
}


//Function that is responsible to clear the fields
function clearFields() {
  for (let a = 5; a >= 1; a--) {
    document.getElementById(ids[a]).innerHTML = "";
  }
  document.getElementById("total_field").innerHTML = "0";
  document.getElementById("buyNowForm").reset();
  window.scrollTo(0, 600);
}



//Function that is required to find the Grand Total
function calTotalCost(value) {
  final_order = final_order + value;
  document.getElementById("grand_total").innerHTML = "Grand Total = " + final_order;
}


//Function to get the information of the selected manufacturer
function getManufacValue(radio) {
  var manufac_value = radio.value;
  var manufac_name = radio.nextElementSibling.innerText;

  document.getElementById("current_order").innerHTML = manufac_name;
  total_manufac = parseInt(manufac_value);
  totalcostcal();
}


//Function to get the information of the selected prodcut
function getProdValue(radio) {
  var product_price = radio.value;
  var product_name = radio.nextElementSibling.innerText;

  document.getElementById("product_order").innerHTML = product_name;
  total_product = parseInt(product_price);
  totalcostcal();
}


//Function to get the information of the selected size
function getSizeValue(radio) {
  var size_price = radio.value;
  var size_name = radio.nextElementSibling.innerText;
  document.getElementById("size_field").innerHTML = size_name;
  total_size = parseInt(size_price);
  totalcostcal();
}


//Function to get the information of the selected checkboxes
function getCheckbox() {
  var extraTotal = 0;
  var val = 0;
  var extraname = "";

  var checkBoxes = document.getElementById("extrasContainer");
  var checkValue = checkBoxes.getElementsByTagName("input");

  for (let a = 0; a < checkValue.length; a++) {

    if (checkValue[a].checked == true) {
      val = parseInt(checkValue[a].value);
      extraname += checkValue[a].name + '<br>';
    }
    else {
      val = 0;
      extraname += "";
    }
    extraTotal = extraTotal + val;
  }
  total_extras = extraTotal;
  document.getElementById("extras_field").innerHTML = extraname;
  totalcostcal();
}



// Function to calculate the Total Cost for a particular order
function totalcostcal() {
  totalCost = total_manufac + total_product + total_size + total_extras;
  document.getElementById("total_field").innerHTML = totalCost;
}


//Place Order Function
function calOrder() {
  if (localStorage["sales_EcoLanka"] == null || localStorage["sales_EcoLanka"] == NaN || localStorage["sales_EcoLanka"] == undefined) {
    localStorage["sales_EcoLanka"] = "0";
  }
  if (count > 3) {
    var confirmationMessage = confirm("You have " + (count - 1) + " item(s) in your order, do you wish to checkout?");
    if (confirmationMessage == true) {
      alert("Thank you for shopping at Eco Lanka!");
      location.reload();
    }

  }
  else if (count > 1) {
    var confirmationMessage = confirm("You have " + (count - 1) + " item(s) in your order, do you wish to checkout?");
    if (confirmationMessage == true) {
      alert("Thank you for shopping at Eco Lanka!");
      location.reload();
    }

  }
  else {
    alert("Sorry no orders have been added or made");
    location.reload();
  }
}


//Check Loyalty Button Function
function checkLoyalty() {
  var order_loyalty = localStorage["sales_EcoLanka"];

  if (localStorage["sales_EcoLanka"] == null) {
    alert("Total Loyalty Points Earned : 0 ");
  }
  else {
    alert("Total Loyalty Points Earned : " + order_loyalty);
  }

}


//Add to favourites function
function addToFav() {
  if (document.getElementById(ids[1]).innerHTML != "" & document.getElementById(ids[2]).innerHTML != "" & document.getElementById(ids[3]).innerHTML != "") {
    var favourite_order = [];
    for (let a = 0; a < 5; a++) {
      favourite_order[a] = document.getElementById(ids[a + 1]).innerHTML;
    }
    localStorage["fav_EcoLanka"] = JSON.stringify(favourite_order);
    alert("Your Order has been added to favourites");
  }

}


//Add the favourite to Order
function addFavToOrder() {

  if (localStorage.getItem("fav_EcoLanka") === null) {
    alert("There is no order added to favourites");
  }
  else {
    var getFav = JSON.parse(localStorage["fav_EcoLanka"]);

    var totalOrderTable = document.getElementById("totalOrderTable");
    var addRow = totalOrderTable.insertRow(-1);

    for (let i = 0; i <= 5; i++) {
      var tempcell = addRow.insertCell(i);

      if (i == 0) {
        tempcell.innerHTML = "Order " + count;
      }
      else {
        tempcell.innerHTML = headings[i] + getFav[i - 1];
      }
    }
    count++;
    clearFields();
    calTotalCost(parseInt(getFav[4]));
  }
  var rowLength = document.getElementById('totalOrderTable').rows.length;
  //rows = number of orders, cells in each row represent order attributes.
  for (var i = 0; i < rowLength; i++) {
    document.getElementById('totalOrderTable').rows[i].cells[0].className = "grandTotalContainer";
    document.getElementById('totalOrderTable').rows[i].cells[5].className = "grandTotalContainer";
  }
  total_manufac = 0;
  total_product = 0;
  total_size = 0;
  total_extras = 0;
}

//Function that is required to add the Current Order to the Total Order Table
function addtoTotalOrder() {
  if (document.getElementById(ids[1]).innerHTML != "" & document.getElementById(ids[2]).innerHTML != "" & document.getElementById(ids[3]).innerHTML != "") {
    var totalOrderTable = document.getElementById("totalOrderTable");
    var addRow = totalOrderTable.insertRow(-1);
    for (let i = 0; i <= 5; i++) {
      var tempcell = addRow.insertCell(i);
      if (i == 0) {
        tempcell.innerHTML = "Order " + count;
      }
      else {
        tempcell.innerHTML = headings[i] + document.getElementById(ids[i]).innerHTML;
      }
    }
    var rowLength = document.getElementById('totalOrderTable').rows.length;
    //rows = number of orders, cells in each row represent order attributes.
    for (var i = 0; i < rowLength; i++) {
      document.getElementById('totalOrderTable').rows[i].cells[0].className = "grandTotalContainer";
      document.getElementById('totalOrderTable').rows[i].cells[5].className = "grandTotalContainer  ";
    }
    calTotalCost(parseInt(document.getElementById(ids[5]).innerHTML));
    clearFields();
    count++;
    total_manufac = 0;
    total_product = 0;
    total_size = 0;
    total_extras = 0;
  }
}




