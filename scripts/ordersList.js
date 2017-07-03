(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function OrdersList(selector) {
    if (!selector) {
      throw new Error('No selector');
    }
    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('No elements matching selector: ' + selector);
    }
  };

  OrdersList.prototype.addClickHandler = function(fn) {
    this.$element.on('click', 'input', function(event) {
      var email = event.target.value;
      fn(email)
      .then(function() {
        this.deleteRow(email);
      }.bind(this));
    }.bind(this));
  };

  OrdersList.prototype.addRow = function(order) {
    this.deleteRow(order.emailAddress);
    var rowElement = new Row(order);
    this.$element.append(rowElement.$element);
  };

  OrdersList.prototype.deleteRow = function(email) {
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-order="checkbox"]')
      .remove();
  };

  function Row(order) {
    var $div = $('<div></div>', {
      'data-order': 'checkbox',
      'class': 'checkbox'
    });
    var $label = $('<label></label>');
    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: order.emailAddress
    });
    var opis = order.size + ' ';
    if (order.flavor) {
      opis += order.flavor + ' ';
    }
    opis += order.coffee + ' ';
    opis += ' (' + order.emailAddress + ')';
    opis += ' [' + order.strength + 'x]';

    $label.append($checkbox);
    $label.append(opis);
    $div.append($label);

    this.$element = $div;
  };
  App.OrdersList = OrdersList;
  window.App = App;
})(window);
