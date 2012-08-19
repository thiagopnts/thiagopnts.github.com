(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  window.Albums = (function(_super) {

    __extends(Albums, _super);

    function Albums() {
      Albums.__super__.constructor.apply(this, arguments);
    }

    Albums.prototype.model = Album;

    Albums.prototype.url = "/tunes/albums.json";

    return Albums;

  })(Backbone.Collection);

}).call(this);
