(function(window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function HandleForm(selector) {
    if (!selector) {
      throw new Error('No selector');
    }
    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('No elements matching selector: ' + selector);
    }
  };

  HandleForm.prototype.addSendHandler = function(fn) {
    console.log('the submit event handler has been created.');
    this.$formElement.on('submit', function(e) {
      e.preventDefault();
      var data = {};
      $(this).serializeArray().forEach(function(element) {
        data[element.name] = element.value;
        console.log('Element ' + element.name + ' has value: ' + element.value);
      });
      console.log(data);
      fn(data)
      .then(function() {
        this.reset();
        this.elements[0].focus();
      }.bind(this));
    });
  };

  HandleForm.prototype.addCharacterHandler = function(fn) {
    console.log('the input event handler has been created.');
    this.$formElement.on('input', '[name="emailAddress"]', function(event) {
      var emailAddress = event.target.value;
      var statement = '';
      if (fn(emailAddress)) {
        $(event.target).setCustomValidity('');
      } else {
        statement = 'email address: ' + emailAddress + ' is not allowed.';
        $(event.target).setCustomValidity(statement);
      }
    })
  }

  App.HandleForm = HandleForm;
  window.App = App;
})(window);
