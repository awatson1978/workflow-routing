// layout = UI.render(Layout.extend({template: 'layout'});
// UI.DomRange.insert(layout.dom, document.body);
//
// // render a template into a named region
// layout.setRegion('footer', 'SomeFooterTemplate');




//--------------------------------------------------------------
// Global Configuration

Router.configure({
  layoutTemplate: 'appLayout',
  notFoundTemplate: 'notFoundPage'
});
Router.onBeforeAction(function() {
  if (!Meteor.loggingIn() && !Meteor.user()) {
    this.redirect('/sign-in');
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
    'entrySignOut'
  ]
});
Router.onBeforeAction(function() {
  if((BrowserDetect.browser !== "Chrome") && (BrowserDetect.browser !== "Safari")){
    this.render('browserNotSupportedPage');
    this.pause();
  }
});


//--------------------------------------------------------------
// Routing Helper Functions

setPageTitle = function(newTitle) {
  document.title = newTitle;
};
checkBrowserIsSupported = function(scope) {
  console.log('checkBrowserIsSupported');
  if(BrowserDetect.browser !== "Chrome"){
    scope.render('browserNotSupportedPage');
    //scope.render("navbarHeader",{to: 'header'});
    //scope.render("sidebarTemplate",{to: 'aside'});
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
      scope.pause();
    } else {
      scope.render("navbarHeader", {to: 'header'});
      //scope.render("sidebarTemplate",{to: 'aside'});
      scope.pause();
    }
  }
};

getYieldTemplates = function() {
  if (Meteor.userId()) {
    return {
      'navbarHeader': {
        to: 'header'
      }
      //'sidebarTemplate': {to: 'aside'}
    };
  } else {
    return {
      'navbarHeader': {
        to: 'header'
      }
      //'sidebarTemplate': {to: 'aside'}
    };
    //return {};
  }
};

//--------------------------------------------------------------
// Accounts Entry Routes

Router.map(function() {
  this.route("entrySignUpRoute", {
    path: "/sign-up",
    template: "entrySignUpPage",
    yieldTemplates: getYieldTemplates(),
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      checkBrowserIsSupported(this);
      setPageTitle("Sign Up");
    }
  });
  this.route("entrySignInRoute", {
    path: "/sign-in",
    template: "entrySignInPage",
    yieldTemplates: getYieldTemplates(),
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      checkBrowserIsSupported(this);
      setPageTitle("Sign In");
    }
  });


  this.route("entryForgotPassword", {
    path: "/forgot-password",
    yieldTemplates: getYieldTemplates(),
    onBeforeAction: function() {
      setPageTitle("Forgot Password");
      checkBrowserIsSupported(this);
      return Session.set('entryError', void 0);
    }
  });
  this.route('entrySignOut', {
    path: '/sign-out',
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      Meteor.logout();
      Router.go('/');      
    }
  });
  this.route('entryResetPassword', {
    path: 'reset-password/:resetToken',
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      setPageTitle("Reset Password");
      checkBrowserIsSupported(this);
      return Session.set('resetToken', this.params.resetToken);
    }
  });
});


//--------------------------------------------------------------
// Error Routes

Router.map(function() {
  this.route("browserNotSupportedRoute", {
    path: "/notsupported",
    template: "browserNotSupportedPage",
    yieldTemplates: getYieldTemplates(),
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      setPageTitle("Browser Not Supported");
    }
  });
  this.route("pageNotFoundRoute", {
    path: "/notfound",
    template: "notFoundPage",
    yieldTemplates: getYieldTemplates(),
    onBeforeAction: function() {
      Session.set('entryError', void 0);
      setPageTitle("Not Found Page");
    }
  });

});





//--------------------------------------------------------------
// Routes

renderHomePage = function(scope){
  if (Meteor.userId()) {
    scope.render("homePage");
    scope.render("navbarHeader", {to: 'header'});
    //scope.render("sidebarTemplate",{to: 'aside'});
  }else{
    scope.render("landingPage");
    scope.render("navbarHeader", {to: 'header'});
    //scope.render("sidebarTemplate",{to: 'aside'});
  }
};


Router.map(function() {

  this.route('landingRoute', {
    path: '/',
    yieldTemplates: getYieldTemplates(),
    onBeforeAction: function() {
      console.log('routing to: /');
      if(BrowserDetect.browser !== "Chrome"){
        this.render('browserNotSupportedPage');
        //this.render("navbarHeader",{to: 'header'});
        //this.render("sidebarTemplate",{to: 'aside'});
        this.pause();
      }
    },
    onAfterAction: function(){
      renderHomePage(this);
      setPageTitle("Landing Page");
    }
  });

  this.route('dashboardRoute', {
    path: '/dashboard',
    template: "homePage",
    yieldTemplates: getYieldTemplates(),
    onBeforeAction: function() {
      console.log('routing to: /dashboard');
      checkBrowserIsSupported(this);
      setPageTitle("Welcome");
    }
  });
  this.route('eulaRoute', {
    path: '/eula',
    template: 'eulaPage',
    yieldTemplates: getYieldTemplates(),
    onBeforeAction: function() {
      checkBrowserIsSupported(this);
      setPageTitle("End User License Agreement");
    }
  });
  this.route('privacyRoute', {
    path: '/privacy',
    template: 'privacyPage',
    yieldTemplates: getYieldTemplates(),
    onBeforeAction: function() {
      checkBrowserIsSupported(this);
      setPageTitle("Privacy Policy");
    }
  });
  this.route('glossaryRoute', {
    path: '/glossary',
    template: 'glossaryPage',
    yieldTemplates: getYieldTemplates(),
    onBeforeAction: function() {
      checkBrowserIsSupported(this);
      setPageTitle("Glossary");
    }
  });
  this.route('aboutRoute', {
    path: '/about',
    template: 'aboutPage',
    yieldTemplates: getYieldTemplates(),
    onBeforeAction: function() {
      checkBrowserIsSupported(this);
      setPageTitle("About");
    }
  });







});
