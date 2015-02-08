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

  Meteor.call('getEnvironmentRoot', function(error, result){
    if(error){
      console.log(error);
    }
    if(result){
      console.log('current environment url:  ' + result);
      if(result === "http://localhost:3000"){
        // do local development stuff
      }else{
        // do production stuff
      }

    }
  });


});
