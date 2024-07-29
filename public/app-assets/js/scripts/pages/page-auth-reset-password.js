/*=========================================================================================
  File Name: form-validation.js
  Description: jquery bootstrap validation js
  ----------------------------------------------------------------------------------------
  Item Name: mvs  - Vuejs, HTML & Laravel Admin Dashboard panel
  Author: mvs
  Author URL: http://www.themeforest.net/user/mvs
==========================================================================================*/

$(function () {
  'use strict';

  var pageResetPasswordForm = $('.auth-reset-password-form');

  // jQuery Validation
  // --------------------------------------------------------------------
  if (pageResetPasswordForm.length) {
    pageResetPasswordForm.validate({
      /*
      * ? To enable validation onkeyup
      onkeyup: function (element) {
        $(element).valid();
      },*/
      /*
      * ? To enable validation on focusout
      onfocusout: function (element) {
        $(element).valid();
      }, */
      rules: {
        'reset-password-new': {
          required: true
        },
        'reset-password-confirm': {
          required: true,
          equalTo: '#reset-password-new'
        }
      }
    });
  }
});
