(function (window) {
  'use strict';
  var App = window.App || {};

  function DeliveryVan(id, database) {
    this.id = id;
    this.database = database;
  }

  DeliveryVan.prototype.makeOrder = function(order) {
    console.log('Order made for ' + order.emailAddress);
    return this.database.add(order.emailAddress, order);
  }

  DeliveryVan.prototype.executeOrder = function(clientId) {
    console.log('Executed order for ' + clientId);
    return this.database.delete(clientId);
  }

  DeliveryVan.prototype.printOrders = function(printingFcn) {
    return this.database.getAll()
      .then(function(orders) {
        var clientsArray = Object.keys(orders);
        console.log('DeliveryVan nr ' + this.id + ' has unexetuded orders:');
        clientsArray.forEach(function(id) {
          console.log(orders[id]);
          if (printingFcn) {
            printingFcn(orders[id]);
          }
        }.bind(this));
      }.bind(this));
  };

  App.DeliveryVan = DeliveryVan;
  window.App = App;
})(window);
