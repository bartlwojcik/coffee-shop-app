(function (window) {
  'use strict';
  var App = window.App || {};

  function Database() {
    this.data = {};
  }

  Database.prototype.add = function(key, value) {
    this.data[key] = value;
  }

  Database.prototype.get = function(key) {
    return this.data[key];
  }

  Database.prototype.getAll = function() {
    return this.data;
  }

  Database.prototype.delete = function(key) {
    delete this.data[key];
  }

  App.Database = Database;
  window.App = App;
})(window);
