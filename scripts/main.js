(function(window) {
  'use strict';
  var FORM_SELECTOR = '[data-order="form"]';
  var ORDERS_LIST_SELECTOR = '[data-order="ordersList"]';
  var URL_PATH = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;
  var DeliveryVan = App.DeliveryVan;
  var Database = App.Database;
  var RemoteDatabase = App.RemoteDatabase;
  var HandleForm = App.HandleForm;
  var Verification = App.Verification;
  var OrdersList = App.OrdersList;
  var remoteDB = new RemoteDatabase(URL_PATH);
  var webshim = window.webshim;
  var myDeliveryVan = new DeliveryVan('ncc-1701', remoteDB);
  window.myDeliveryVan = myDeliveryVan;
  var ordersList = new OrdersList(ORDERS_LIST_SELECTOR);
  ordersList.addClickHandler(myDeliveryVan.executeOrder.bind(myDeliveryVan));
  var handleForm = new HandleForm(FORM_SELECTOR);
  handleForm.addSendHandler(function(data) {
    return myDeliveryVan.makeOrder.call(myDeliveryVan, data)
      .then(function() {
        ordersList.addRow.call(ordersList, data);
      }
      );
  });
  handleForm.addCharacterHandler(Verification.isCompanyAddress);
  myDeliveryVan.printOrders(ordersList.addRow.bind(ordersList));
  webshim.polyfill('forms forms-ext');
  webshim.setOptions('forms', {AddValidators: true, lazyCustomMessage: true});
})(window);
