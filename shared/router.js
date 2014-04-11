

Router.map(function() {
  this.route("entrySignUpRoute", {
    path: "/sign-up",
    template:"entrySignUpPage",
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      //return Session.set('buttonText', 'up');
    }
  });
  this.route("entrySignInRoute", {
    path: "/sign-in",
    template:"entrySignInPage",
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      //return Session.set('buttonText', 'up');
    }
  });

  this.route("entryForgotPassword", {
    path: "/forgot-password",
    onBeforeAction: function() {
      return Session.set('entryError', void 0);
    }
  });
  this.route('entrySignOut', {
    path: '/sign-out',
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      if (AccountsEntry.settings.homeRoute) {
        Meteor.logout();
        Router.go(AccountsEntry.settings.homeRoute);
      }
      return this.stop();
    }
  });
  this.route('entryResetPassword', {
    path: 'reset-password/:resetToken',
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      return Session.set('resetToken', this.params.resetToken);
    }
  });
});
