(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Album = (function(_super) {

    __extends(Album, _super);

    function Album() {
      Album.__super__.constructor.apply(this, arguments);
    }

    Album.prototype.isFirstTrack = function(index) {
      return index === 0;
    };

    Album.prototype.isLastTrack = function(index) {
      return index === (this.get('tracks').length - 1);
    };

    Album.prototype.trackUrlAtIndex = function(index) {
      if (this.get("tracks").length >= index) return this.get('tracks')[index].url;
      return null;
    };

    return Album;

  })(Backbone.Model);

}).call(this);
