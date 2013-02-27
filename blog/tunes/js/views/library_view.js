(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    return window.LibraryView = (function(_super) {

      __extends(LibraryView, _super);

      function LibraryView() {
        LibraryView.__super__.constructor.apply(this, arguments);
      }

      LibraryView.prototype.template = _.template($('#library-template').html());

      LibraryView.prototype.tagName = 'section';

      LibraryView.prototype.className = 'library';

      LibraryView.prototype.initialize = function() {
        _.bindAll(this, 'render');
        return this.collection.bind('reset', this.render);
      };

      LibraryView.prototype.render = function() {
        var $albums, collection;
        collection = this.collection;
        $(this.el).html(this.template({}));
        $albums = this.$(".albums");
        collection.each(function(album) {
          var view;
          view = new LibraryAlbumView({
            model: album,
            collection: collection
          });
          return $albums.append(view.render().el);
        });
        return this;
      };

      return LibraryView;

    })(Backbone.View);
  });

}).call(this);
