Session.setDefault('resize', null);

Meteor.startup(function(){
  if(Meteor.userId()){
    removeWallpaper();
  }else{
    setWallpaper();
  }

  $(window).resize(function(evt) {
    Session.set("resize", new Date());
  });

  bowser = BrowserObserver.init();

});
setWallpaper = function(){
  console.log('setting wallpaper...');
  $('html').addClass('landscapeLogin');
};
removeWallpaper = function(){
  console.log('removing wallpaper...');
  $('html').removeClass('landscapeLogin');
};




Meteor.startup(function(){
  // replace getEnvironment
  Meteor.call('getEnvironmentRoot', function(error, result){
    if(error){
      console.log(error);
    }
    if(result){
      console.log('current environment url:  ' + result);
      if(result === "http://insights.thinaire.net"){
        // load production config
        //Session.setDefault('apiAddressAndPort', Meteor.settings.production.apiAddress);
        Session.setDefault('apiAddressAndPort', 'http://api.thinaire.net');
      }else{
        // load dev config
        //Session.setDefault('apiAddressAndPort', Meteor.settings.development.apiAddress);
        Session.setDefault('apiAddressAndPort', 'http://tadev01:8889');
      }

    }
  });


});
