

//--------------------------------------------------------------
// Global Configuration

Router.configure({
  layoutTemplate: 'appLayout',
  notFoundTemplate: 'notFoundPage',
  yieldTemplates: {
    'navbarHeader': {
      to: 'header'
    }
  }
});

Router.onBeforeAction(function() {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    this.redirect('/sign-in');
  }else{
    this.next();
  }
}, {
  except: [
    'landingRoute',
    'entrySignUpRoute',
    'entrySignInRoute',
    'eulaRoute',
    'privacyRoute',
    'aboutRoute',
    'glossaryRoute',
    'browserNotSupportedRoute',
    'pageNotFoundRoute',
    'entryForgotPasswordRoute',
    'entrySignOutRoute',
    'entryResetPasswordRoute'
  ]
});
Router.onBeforeAction(function() {
  if(!bowser.webkit){
    this.render('browserNotSupportedPage');
  }else{
    this.next();
  }
});

//--------------------------------------------------------------
// Routing Helper Functions


checkBrowserIsSupported = function(scope) {
  console.log('checkBrowserIsSupported');
  if(!bowser.webkit){
    scope.render('browserNotSupportedPage');
    scope.pause();
  }
};

checkUserHasEmployer = function(scope) {
  console.log('checkUserHasEmployer');
  if (Meteor.user()) {
    if (!Meteor.user().profile.employer_id) {
      scope.render("noEmployerSetPageErrorPage");

      scope.render("navbarHeader", {to: 'header'});
      //scope.render("sidebarTemplate",{to: 'aside'});
      scope.next();
    } else {
      scope.render("navbarHeader", {to: 'header'});
      //scope.render("sidebarTemplate",{to: 'aside'});
      scope.next();
    }
  }else{
    scope.next();
  }
};


//--------------------------------------------------------------
// Accounts Entry Routes

Router.map(function() {
  this.route("entrySignUpRoute", {
    path: "/sign-up",
    template: "entrySignUpPage",
    onAfterAction: function(){
      Session.set('entryError', void 0);
      document.title = "Sign Up";
    }
  });
  this.route("entrySignInRoute", {
    path: "/sign-in",
    template: "entrySignInPage",
    onAfterAction: function(){
      Session.set('entryError', void 0);
      document.title = "Sign In";
    }
  });

  this.route("entryForgotPasswordRoute", {
    path: "/forgot-password",
    template: "entryForgotPassword",
    onAfterAction: function(){
      document.title = "Forgot Password";
      Session.set('entryError', void 0);
    }
  });
  this.route('entrySignOutRoute', {
    path: '/sign-out',
    template: "entrySignOut",
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      Meteor.logout();
      Router.go('/');
    }
  });
  this.route('entryResetPasswordRoute', {
    path: 'reset-password/:resetToken',
    template: "entryResetPassword",
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      Session.set('resetToken', this.params.resetToken);
      this.next();
    },
    onAfterAction: function(){
      document.title = "Reset Password";
      Session.set('entryError', void 0);
    }
  });
});


//--------------------------------------------------------------
// Error Routes

Router.map(function() {
  this.route("browserNotSupportedRoute", {
    path: "/notsupported",
    template: "browserNotSupportedPage",
    onAfterAction: function(){
      document.title = "Browser Not Supported";
      Session.set('entryError', void 0);
    }
  });
  this.route("pageNotFoundRoute", {
    path: "/notfound",
    template: "notFoundPage",
    onAfterAction: function(){
      document.title = "Not Found Page";
      Session.set('entryError', void 0);
    }
  });

});





//--------------------------------------------------------------
// Routes

renderHomePage = function(scope){
  if (Meteor.userId()) {
    scope.render("homePage");
    scope.render("navbarHeader", {to: 'header'});
  }else{
    scope.render("landingPage");
    scope.render("navbarHeader", {to: 'header'});
  }
};


Router.map(function() {

  this.route('landingRoute', {
    path: '/',
    action: function(){
      renderHomePage(this);
    }
  });

  this.route('dashboardRoute', {
    path: '/dashboard',
    template: "homePage",
    onAfterAction: function(){
      document.title = "Dashboard";
    }
  });
  this.route('eulaRoute', {
    path: '/eula',
    template: 'eulaPage',
    onAfterAction: function(){
      document.title = "End User License Agreement";
    }
  });
  this.route('privacyRoute', {
    path: '/privacy',
    template: 'privacyPage',
    onAfterAction: function(){
      document.title = "Privacy Policy";
    }
  });
  this.route('glossaryRoute', {
    path: '/glossary',
    template: 'glossaryPage',
    onAfterAction: function(){
      document.title = "Glossary";
    }
  });
  this.route('aboutRoute', {
    path: '/about',
    template: 'aboutPage',
    onAfterAction: function(){
      document.title = "About";
    }
  });







});
