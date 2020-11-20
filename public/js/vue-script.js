var socket = io();

var vm = new Vue({
  el: '#infodiv',

  data: {
    burgers: food,
    orders: {},
    ordersList: {},
  },  

  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },

  methods: {
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },

    addOrder: function () {
      
      this.ordersList[0].orderId = this.getNext();
      this.ordersList[0].orderItems = returnBurgerSelection();
      this.ordersList[0].customerInfo = returnOrderInfo();
      
      console.log(this.ordersList[0].orderItems);
      console.log(this.ordersList[0].orderId);
      console.log(this.ordersList[0]);

      socket.emit("addOrder",this.ordersList[0]);
      console.log("efter")
    },
    
    displayOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
        y: event.currentTarget.getBoundingClientRect().top};
      
      var newOrder = {
        
        orderId: undefined,
        
        details: {
        x: event.clientX - 10 - offset.x,
        y: event.clientY - 10 - offset.y
        },

        orderItems:[],

        customerInfo:{},
        };

        this.ordersList = [newOrder];

    },


    buttonClicked: function(){
      outputOrder(new Customer("name","email","gender","payment"), this.ordersList[0].details);  
      this.addOrder();    
    },
  }
})