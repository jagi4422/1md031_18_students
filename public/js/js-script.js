function Customer(na,em,ge,pa) {
    this.name = document.getElementById(na).value;  
    this.email = document.getElementById(em).value;

    var genders = document.getElementsByName(ge);
    for (gender of genders) {
        if (gender.checked) {
            this.gender = gender.value;
            break;
        }
    }

    this.payment = document.getElementById(pa).value;
}

function returnOrderInfo() {
    var order = {name: "", email: "", gender: "", payment: ""};
    order.name = document.getElementById('name').value;
    order.email = document.getElementById('email').value;

    var genders = document.getElementsByName('gender');
    
    for (gender of genders) {
        if (gender.checked) {
            order.gender = gender.value;
            break;
        }
    }

    order.payment = document.getElementById('payment').value;
    

    return order;
}

function returnBurgerSelection(){
    var selectedBurgers = [];
    var burgers = document.getElementsByName('burgerOrder');

    for (burger of burgers){
        if(burger.checked){
            selectedBurgers.push(burger.value);
        }
    }
    return selectedBurgers;
}

function outputOrder(order,details,burgers){ 
    document.getElementById("orderP").innerHTML = "Recipients name: "+order.name+"<br><br>Recipient e-mail: "+order.email+"<br><br>Recipient Payment method: "+order.payment+"<br><br>Recipient Coords (x,y):"+details.x+", "+details.y+"<br><br>Recipient gender: "+order.gender+"<br><br>Ordered burgers: "+burgers.join(", ");
}

//Function to create the menu of burgers
function createMenu(food) {
    var myElement = document.getElementById("mainSelect");
    
    for (burger of food) {
        
        if (burger.stock > 0) {
            var divItem = document.createElement("div");
            divItem.className = "select";
            
            var pItem = document.createElement("p");
            pItem.className = "burgername";
            var pValue = document.createTextNode(burger.name);
            pItem.appendChild(pValue);
            divItem.appendChild(pItem);
            
            var imgItem = document.createElement("img");
            imgItem.className = "burgerpicture";
            imgItem.src = burger.img;
            divItem.appendChild(imgItem)


            var contentList = document.createElement("ul");             
            if (burger.gluten || burger.lactose) {   
                var contentListValue = document.createElement("li");
                contentListValue.innerHTML =  `Contains <span id='allergy'>${burger.gluten ? 'Gluten' : ''}${burger.gluten && burger.lactose ? ' & ' : ''}${burger.lactose ? 'Lactose' : ''}</span>`;
                contentList.appendChild(contentListValue);
            }

            var caloriesItem = document.createElement("li");
            caloriesItem.innerHTML = "Contains "+burger.kcal+" calories";
            contentList.appendChild(caloriesItem);
            divItem.appendChild(contentList);


            var selectBurger = document.createElement("input");
            selectBurger.type = "checkbox";
            selectBurger.name = "burgerOrder";
            selectBurger.value = burger.name;
            selectBurger.className = "burgerCheckbox";
            divItem.appendChild(selectBurger);

            myElement.appendChild(divItem);

        }
    }
}

window.onload = function(){
    createMenu(food)
}