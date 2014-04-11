Meteor.startup(function() {
  return AccountsEntry.config({
    signupCode: 'clouds',
    defaultProfile: {
      someDefault: 'homePage'
    }
  });
});
