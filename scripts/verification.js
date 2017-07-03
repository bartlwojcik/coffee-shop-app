(function (window) {
  'use strict';
  var App = window.App || {};
  var Verification = {
    isCompanyAddress: function (email) {
      return /.+@companyname\.com$/.test(email);
    }
  };
  App.Verification = Verification;
  window.App = App;
})(window);
