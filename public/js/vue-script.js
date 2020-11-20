var socket = io();

var vm = new Vue({
  el: '#infodiv',
  data: {
    burgers: food,

    orders: {},
  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
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
    addOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
      var newOrder = {
        orderId: this.getNext(),
        details: {
          x: event.clientX - 10 - offset.x,
          y: event.clientY - 10 - offset.y
        },
        orderItems: ["Beans", "Curry"]
      };
      
      socket.emit("addOrder", newOrder);

    },


/*
    displayOrder: function (event) {
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
        y: event.currentTarget.getBoundingClientRect().top};
      
      var newOrder = {
        target : 'T',
        details: {
        x: event.clientX - 10 - offset.x,
        y: event.clientY - 10 - offset.y
        }
        };

        orders.push(newOrder);
        console.log("kommer in här");
        console.log(newOrder);

    },*/
    buttonClicked: function(){
      outputOrder(returnOrderInfo());      
    },
  }
})