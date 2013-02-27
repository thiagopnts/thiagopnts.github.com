(function() {

  $(document).ready(function() {
    return jQuery(function() {
      window.player = new Player();
      window.library = new Albums();
      window.App = new BackboneTunes();
      return Backbone.history.start({
        pushState: true
      });
    });
  });

}).call(this);
