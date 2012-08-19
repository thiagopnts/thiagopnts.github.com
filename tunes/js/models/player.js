(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Player = (function(_super) {

    __extends(Player, _super);

    function Player() {
      Player.__super__.constructor.apply(this, arguments);
    }

    Player.prototype.defaults = {
      currentAlbumIndex: 0,
      currentTrackIndex: 0,
      state: 'stop'
    };

    Player.prototype.initialize = function() {
      return this.playlist = new Playlist();
    };

    Player.prototype.isStopped = function() {
      return !this.isPlaying();
    };

    Player.prototype.isPlaying = function() {
      return this.get('state') === 'play';
    };

    Player.prototype.play = function() {
      return this.set({
        state: 'play'
      });
    };

    Player.prototype.pause = function() {
      return this.set({
        state: 'pause'
      });
    };

    Player.prototype.nextTrack = function() {
      if (this.currentAlbum().isLastTrack(this.get("currentTrackIndex"))) {
        if (this.playlist.isLastAlbum(this.get("currentAlbumIndex"))) {
          this.set({
            currentAlbumIndex: 0
          });
        } else {
          this.changeAlbum(1);
        }
        return this.set({
          currentTrackIndex: 0
        });
      } else {
        return this.changeTrack(1);
      }
    };

    Player.prototype.prevTrack = function() {
      if (this.currentAlbum().isFirstTrack(this.get("currentTrackIndex"))) {
        if (this.playlist.isFirstAlbum(this.get("currentAlbumIndex"))) {
          this.set({
            currentAlbumIndex: this.playlist.models.length - 1
          });
          return this.set({
            currentTrackIndex: this.currentAlbum().get("tracks").length - 1
          });
        } else {
          this.changeAlbum(-1);
          return this.set({
            currentTrackIndex: this.currentAlbum().get('tracks').length - 1
          });
        }
      } else {
        return this.changeTrack(-1);
      }
    };

    Player.prototype.changeAlbum = function(delta) {
      return this.set({
        currentAlbumIndex: this.attributes.currentAlbumIndex + delta
      });
    };

    Player.prototype.changeTrack = function(delta) {
      return this.set({
        currentTrackIndex: this.attributes.currentTrackIndex + delta
      });
    };

    Player.prototype.currentAlbum = function() {
      return this.playlist.at(this.get("currentAlbumIndex"));
    };

    Player.prototype.currentTrackUrl = function() {
      if (this.currentAlbum()) {
        return this.currentAlbum().trackUrlAtIndex(this.get('currentTrackIndex'));
      }
    };

    return Player;

  })(Backbone.Model);

}).call(this);
