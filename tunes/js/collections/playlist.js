(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Playlist = (function(_super) {

    __extends(Playlist, _super);

    function Playlist() {
      Playlist.__super__.constructor.apply(this, arguments);
    }

    Playlist.prototype.isFirstAlbum = function(index) {
      return index === 0;
    };

    Playlist.prototype.isLastAlbum = function(index) {
      return index === (this.models.length - 1);
    };

    Playlist.prototype.indexOf = function(model) {
      return this.models.indexOf(model);
    };

    return Playlist;

  })(Albums);

}).call(this);
