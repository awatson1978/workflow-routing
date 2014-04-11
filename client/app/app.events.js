Meteor.startup(function(){
  Hooks.init();

  Hooks.onLoggedIn = function(){
    Session.set('selectedCampaignId', Meteor.users.findOne(Meteor.userId()).profile.selected_campaign_id);
    removeWallpaper();
  };
  Hooks.onLoggedOut = function(userId){
    setWallpaper();
  };
  Hooks.onCreateUser = function(userId){

  };
  Hooks.onDeleteUser = function(userId){

  };
  Hooks.onLoseFocus = function(userId){

  };
  Hooks.onGainFocus = function(userId){

  };
  Hooks.onCloseSession = function(userId){

  };
});