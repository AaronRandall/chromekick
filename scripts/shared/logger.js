var Log = {

  debug: function(msg) {
    if(Constants.loggingEnabled) {
      console.log('[DEBUG]: ' + msg);
    }
  }

};
