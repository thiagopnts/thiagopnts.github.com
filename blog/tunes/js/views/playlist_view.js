(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    return window.PlaylistView = (function(_super) {

      __extends(PlaylistView, _super);

      function PlaylistView() {
        PlaylistView.__super__.constructor.apply(this, arguments);
      }

      PlaylistView.prototype.template = _.template($("#playlist-template").html());

      PlaylistView.prototype.tagName = "section";

      PlaylistView.prototype.className = "playlist";

      PlaylistView.prototype.events = {
        'click .play': 'play',
        'click .pause': 'pause',
        'click .next': 'nextTrack',
        'click .prev': 'prevTrack'
      };

      PlaylistView.prototype.initialize = function() {
        _.bindAll(this, 'render', 'renderAlbum', 'queueAlbum', 'updateState', 'updateTrack');
        this.collection.bind('add', this.renderAlbum);
        this.player = this.options.player;
        this.player.bind('change:state', this.updateState);
        this.player.bind('change:currentTrackIndex', this.updateTrack);
        this.library = this.options.library;
        this.library.bind('select', this.queueAlbum);
        return this.createAudio();
      };

      PlaylistView.prototype.createAudio = function() {
        return this.audio = new Audio();
      };

      PlaylistView.prototype.render = function() {
        $(this.el).html(this.template(this.player.toJSON()));
        this.updateState();
        return this;
      };

      PlaylistView.prototype.updateState = function() {
        this.updateTrack();
        this.$("button.play").toggle(this.player.isStopped());
        return this.$("button.pause").toggle(this.player.isPlaying());
      };

      PlaylistView.prototype.updateTrack = function() {
        this.audio.src = this.player.currentTrackUrl();
        if (this.player.isPlaying()) {
          return this.audio.play();
        } else {
          return this.audio.pause();
        }
      };

      PlaylistView.prototype.play = function() {
        if (this.player.playlist.models.length > 0) {
          this.player.play();
          if (this.player.get('currentTrackIndex') === 0) {
            return this.$('.tracks>li').first().toggleClass('current');
          }
        }
      };

      PlaylistView.prototype.pause = function() {
        return this.player.pause();
      };

      PlaylistView.prototype.nextTrack = function() {
        return this.player.nextTrack();
      };

      PlaylistView.prototype.prevTrack = function() {
        return this.player.prevTrack();
      };

      PlaylistView.prototype.queueAlbum = function(album) {
        return this.collection.add(album);
      };

      PlaylistView.prototype.renderAlbum = function(album) {
        var view;
        view = new PlaylistAlbumView({
          model: album,
          player: this.player,
          playlist: this.collection
        });
        return this.$('ul').append(view.render().el);
      };

      return PlaylistView;

    })(Backbone.View);
  });

}).call(this);
