(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    return window.LibraryAlbumView = (function(_super) {

      __extends(LibraryAlbumView, _super);

      function LibraryAlbumView() {
        LibraryAlbumView.__super__.constructor.apply(this, arguments);
      }

      LibraryAlbumView.prototype.events = {
        'click .queue.add': 'select'
      };

      LibraryAlbumView.prototype.select = function() {
        return this.collection.trigger('select', this.model);
      };

      return LibraryAlbumView;

    })(AlbumView);
  });

}).call(this);
