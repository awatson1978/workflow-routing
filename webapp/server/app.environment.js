

Meteor.methods({
  getEnvironmentRoot: function(){
    console.log(process.env.ROOT_URL);
    return process.env.ROOT_URL;
  },
  eventsOnHooksInit: function () {
    return true;
  },
});
