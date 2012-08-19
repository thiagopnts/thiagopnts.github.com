(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    return window.AlbumView = (function(_super) {

      __extends(AlbumView, _super);

      function AlbumView() {
        AlbumView.__super__.constructor.apply(this, arguments);
      }

      AlbumView.prototype.template = _.template($("#album-template").html());

      AlbumView.prototype.tagName = 'li';

      AlbumView.prototype.className = 'album';

      AlbumView.prototype.initialize = function() {
        _.bindAll(this, 'render');
        return this.model.bind('change', this.render);
      };

      AlbumView.prototype.render = function() {
        var renderContent;
        renderContent = this.template(this.model.toJSON());
        $(this.el).html(renderContent);
        return this;
      };

      return AlbumView;

    })(Backbone.View);
  });

}).call(this);
