Template.introPage.events({
  'click #createNewUserTile':function(){
    Router.go('/newuser');
  },
  'click #addDigitalContentTile':function(){
    Router.go('/newcontent');
  },
  'click #createCampaignTile':function(){
    Router.go('/newcampaign');
  },
  'click #createEngagementTile':function(){
    Router.go('/newengagement');
  }
});