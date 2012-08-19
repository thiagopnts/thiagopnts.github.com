(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.BackboneTunes = (function(_super) {

    __extends(BackboneTunes, _super);

    function BackboneTunes() {
      BackboneTunes.__super__.constructor.apply(this, arguments);
    }

    BackboneTunes.prototype.routes = {
      '': 'home',
      '/': 'home',
      '/tunes': 'home', //to run it on my github pages site
      'blank': 'home',
      '/tunes/': 'home'
    };

    BackboneTunes.prototype.initialize = function() {
      this.playlistView = new PlaylistView({
        collection: window.player.playlist,
        player: window.player,
        library: window.library
      });
      return this.libraryView = new LibraryView({
        collection: window.library
      });
    };

    BackboneTunes.prototype.redirect = function() {
      this.navigate('/tunes', true)
    }

    BackboneTunes.prototype.home = function() {
      var $container;
      $container = $("#container");
      $container.empty();
      $container.append(this.playlistView.render().el);
      return $container.append(this.libraryView.render().el);
    };

    return BackboneTunes;

  })(Backbone.Router);

}).call(this);
