Session.setDefault('selectedCampaignId', '123');

Template.homePage.selectedCampaign = function(){
  var userRecord = Meteor.users.findOne({_id: Meteor.userId()});
  if(userRecord){
    if(userRecord.profile){
      if(userRecord.profile.selected_campaign_id){
        return Campaigns.findOne({_id:  userRecord.profile.selected_campaign_id });
      }else{
        return {};
      }
    }else{
      return {};
    }
  }else{
    return {};
  }
};
Template.homePage.selectedCampaignId = function(){
  return Session.get('selectedCampaignId');
};

Template.homePage.getRecordJson = function(){
  return JSON.stringify(this);
};


Template.homePage.getStartDate = function(){
  if(this.start_date){
    return this.start_date;
  }else{
    return 'No Start Date Defined';
  }
}
Template.homePage.getEndDate = function(){
  if(this.end_date){
    return this.end_date;
  }else{
    return 'No End Date Defined';
  }
}
Template.homePage.getTotalInteractions = function(){
  if(this.total_interactions){
    return this.total_interactions;
  }else{
    return 'No Interactions Tracked';
  }
}
Template.homePage.getAvgInteractionsPerDay = function(){
  if(this.avg_interactions_per_day){
    return this.avg_interactions_per_day;
  }else{
    return 'No Interactions Tracked';
  }
}
Template.homePage.getTotalConnections = function(){
  if(this.total_connections){
    return this.total_connections;
  }else{
    return 'No Interactions Tracked';
  }
}
Template.homePage.getTotalConversions = function(){
  if(this.total_conversions){
    return this.total_conversions;
  }else{
    return 'No Interactions Tracked';
  }
}
Template.homePage.getUniqueUsers = function(){
  if(this.unique_users){
    return this.unique_users;
  }else{
    return 'No Interactions Tracked';
  }
}

