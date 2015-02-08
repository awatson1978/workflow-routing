
// ---------------------------------------------------------------
// template events

Template.navbarHeader.events({
  'click #logOutLink':function(){
    Router.go('/sign-out');
  }
});

// ---------------------------------------------------------------
// template helpers

Template.navbarHeader.getUserName = function(){
  if(Meteor.userId()){
    if(Meteor.user()){
      //return Meteor.user().emails[0].address;
      return Meteor.user().username;
    }else{
      return "---";
    }
  }else{
    return "Sign In";
  }
};
