(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;
  function RemoteDatabase(url) {
    if (!url) {
      throw new Error('no url path.')
    }
    this.urlPath = url;
  };

  RemoteDatabase.prototype.add = function(key, value) {
     return $.post(this.urlPath, value, function(serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDatabase.prototype.getAll = function(returnFcn) {
     return $.get(this.urlPath, function(serverResponse) {
       if (returnFcn) {
         console.log(serverResponse);
         returnFcn(serverResponse);
       }
    });
  };

  RemoteDatabase.prototype.get = function(key, returnFcn) {
     return $.get(this.urlPath + '/' + key, function(serverResponse) {
       if (returnFcn) {
         console.log(serverResponse);
         returnFcn(serverResponse);
       }
    });
  };

  RemoteDatabase.prototype.delete = function(key) {
    return $.ajax(this.urlPath + '/' + key, {
      type: 'DELETE'
    });
  };

  App.RemoteDatabase = RemoteDatabase;
  window.App = App;
})(window);
