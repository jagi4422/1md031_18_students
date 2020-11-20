// Creates a Customer object with input values from the website.
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

// This function is redundant since the functoin above creates an object of type
// customer and probably does it better.
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

//Returns an array of the burgers selected by the user 
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

//Outputs the orderinformation t othe user in a very programmerfriendly way :-)
function outputOrder(order,details,burgers){ 
    document.getElementById("orderP").innerHTML = "Recipients name: "+order.name+"<br><br>Recipient e-mail: "+order.email+"<br><br>Recipient Payment method: "+order.payment+"<br><br>Recipient Coords (x,y):"+details.x+", "+details.y+"<br><br>Recipient gender: "+order.gender+"<br><br>Ordered burgers: "+burgers.join(", ");
}

//Function to create the menu of burgers from the pseudo-json file menu,js.
//It is possible to add a large amount of items to the menu without it breaking horribly.
function createMenu(food) {
    var myElement = document.getElementById("mainSelect");
    
    for (burger of food) {
        
        if (burger.stock > 0) {
            //Adds an outer div inside which everything will be placed
            var divItem = document.createElement("div");
            divItem.className = "select";
            
            //Creates the burgername
            var pItem = document.createElement("p");
            pItem.className = "burgername";
            var pValue = document.createTextNode(burger.name);
            pItem.appendChild(pValue);
            divItem.appendChild(pItem);
            
            //Creates the image
            var imgItem = document.createElement("img");
            imgItem.className = "burgerpicture";
            imgItem.src = burger.img;
            divItem.appendChild(imgItem)

            //Provides the information about allergies
            var contentList = document.createElement("ul");             
            if (burger.gluten || burger.lactose) {   
                var contentListValue = document.createElement("li");
                contentListValue.innerHTML =  `Contains <span id='allergy'>${burger.gluten ? 'Gluten' : ''}${burger.gluten && burger.lactose ? ' & ' : ''}${burger.lactose ? 'Lactose' : ''}</span>`;
                contentList.appendChild(contentListValue);
            }

            //Presents the amount of calories in the burger
            var caloriesItem = document.createElement("li");
            caloriesItem.innerHTML = "Contains "+burger.kcal+" calories";
            contentList.appendChild(caloriesItem);
            divItem.appendChild(contentList);

            //Creates the checkbox with which one can select the burger they want to order
            var selectBurger = document.createElement("input");
            selectBurger.type = "checkbox";
            selectBurger.name = "burgerOrder";
            selectBurger.value = burger.name;
            selectBurger.className = "burgerCheckbox";
            divItem.appendChild(selectBurger);

            //Finally appends the created outer div to the existing outer-outer div
            //Done last because it's the most intuitive
            myElement.appendChild(divItem);

        }
    }
}
//Creates the menu once the window has loaded
window.onload = function(){
    createMenu(food)
}