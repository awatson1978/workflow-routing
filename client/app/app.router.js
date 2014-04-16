Session.setDefault('currentPage', 'entrySignIn');


// layout = UI.render(Layout.extend({template: 'layout'});
// UI.DomRange.insert(layout.dom, document.body);
//
// // render a template into a named region
// layout.setRegion('footer', 'SomeFooterTemplate');



//--------------------------------------------------------------
// routing helper functions

setPageTitle = function(newTitle) {
  document.title = newTitle;
};
checkUserSignedIn = function(scope){
  console.log('checkUserSignedIn');
  if(BrowserDetect.browser != "Chrome"){
    this.render('browserNotSupportedPage');
  }
};

checkUserHasEmployer = function(scope){
  if (Meteor.user()){
      if(!Meteor.user().profile.employer_id){
      scope.render("noEmployerSetPageErrorPage");
      scope.render("navbarHeader",{to: 'header'});
      scope.render("sidebarTemplate",{to: 'aside'});
      //scope.pause();
    }else{
      scope.render("navbarHeader",{to: 'header'});
      scope.render("sidebarTemplate",{to: 'aside'});
    }
  }
};

getYieldTemplates = function(){
  if(Meteor.userId()){
    return {
      'navbarHeader': {to: 'header'},
      'sidebarTemplate': {to: 'aside'}
    };
  }else{
    return {};
  }
};





//--------------------------------------------------------------
// Routes

Router.configure({
  layoutTemplate: 'appLayout',
  notFoundTemplate: 'notFoundPage'
});
Router.onBeforeAction(function() {
  if (! Meteor.loggingIn() && ! Meteor.user()) {
    this.redirect('/sign-in');
  }
}, {except: ['introRoute', 'entrySignUpPageRoute', 'entrySignInPageRoute']});


Router.map(function(){

   this.route('introRoute', {
     path: '/',
     template:"introPage",
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       console.log('routing to: /');
       checkUserSignedIn(this);
       Session.set('currentPage', 'introPage');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("Thinaire - Insights");
     }
   });

   this.route('dashboardRoute', {
     path: '/dashboard',
     template:"introPage",
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       console.log('routing to: /dashboard');
       checkUserSignedIn(this);
       Session.set('currentPage', 'introPage');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("Welcome");
     }
   });
   this.route('eulaRoute', {
     path: '/eula',
     template: 'eulaPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'eulaPage');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("End User License Agreement");
     }
   });
   this.route('privacyRoute', {
     path: '/privacy',
     template: 'privacyPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'privacyPage');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("Deals");
     }
   });
   this.route('glossaryRoute', {
     path: '/glossary',
     template: 'glossaryPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'glossaryPage');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("Glossary");
     }
   });


   this.route('contentsRoute', {
     path: '/contents',
     template: 'contentsPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'contentsPage');
     },
     waitOn: function(){
       Meteor.subscribe('settings');
       return Meteor.subscribe('contents');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', true);
       setPageTitle("Contents");
     }
   });
   this.route('contentRoute', {
     path: '/content/:id',
     template: 'contentPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'contentPage');
     },
     waitOn: function(){
       Meteor.subscribe('settings');
       return Meteor.subscribe('contents');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("Content");
     }
   });
   this.route('newContentRoute', {
     path: '/newcontent',
     template: 'newContentPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'newContentPage');
     },
     waitOn: function(){
       Meteor.subscribe('settings');
       return Meteor.subscribe('contents');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("New Content");
     }
   });


   this.route('interactionsRoute', {
     path: '/interactions',
     template: 'interactionsPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'interactionsPage');
     },
     waitOn: function(){
       Meteor.subscribe('settings');
       return Meteor.subscribe('interactions');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', true);
       setPageTitle("Interactions");
     }
   });
   this.route('interactionRoute', {
     path: '/interaction/:id',
     template: 'interactionPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'interactionPage');
     },
     waitOn: function(){
       Meteor.subscribe('settings');
       return Meteor.subscribe('interactions');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("Interaction");
     }
   });

   this.route('visitorsRoute', {
     path: '/visitors',
     template: 'visitorsPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'visitorsPage');
     },
     waitOn: function(){
       Meteor.subscribe('settings');
       return Meteor.subscribe('visitors');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', true);
       setPageTitle("Visitors");
     }
   });
   this.route('visitorRoute', {
     path: '/visitor/:id',
     template: 'visitorPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'visitorPage');
     },
     waitOn: function(){
       Meteor.subscribe('settings');
       return Meteor.subscribe('visitors');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("Visitor");
     }
   });




   this.route('statisticsRoute', {
     path: '/statistics',
     template: 'statisticsPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'statisticsPage');
     },
     waitOn: function(){
       Meteor.subscribe('settings');
       return Meteor.subscribe('statistics');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', true);
       setPageTitle("Statistics");
     }
   });
  //  this.route('statisticRoute', {
  //    path: '/statistic/:id',
  //    template: 'statisticPage',
  //    onBeforeAction: function(){
  //      checkUserSignedIn(this);
  //      Session.set('currentPage', 'statisticPage');
  //    },
  //    waitOn: function(){
  //      Meteor.subscribe('settings');
  //      return Meteor.subscribe('statistics');
  //    },
  //    onAfterAction: function() {
  //      Session.set('isOnListPage', false);
  //      setPageTitle("Statistics");
  //    }
  //  });


   this.route('scatterChartRoute', {
     path: '/scatterchart',
     template: 'scatterChartPage',
     yieldTemplates: getYieldTemplates(),
     onBeforeAction: function(){
       checkUserSignedIn(this);
       Session.set('currentPage', 'scatterChartPage');
     },
     waitOn: function(){
       Meteor.subscribe('settings');
       return Meteor.subscribe('scatterChartData');
     },
     onAfterAction: function() {
       Session.set('isOnListPage', false);
       setPageTitle("Scatter Chart Graph");
       renderScatterChartData();
     }
   });


});
