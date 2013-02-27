(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  jQuery(function() {
    return window.PlaylistAlbumView = (function(_super) {

      __extends(PlaylistAlbumView, _super);

      function PlaylistAlbumView() {
        PlaylistAlbumView.__super__.constructor.apply(this, arguments);
      }

      PlaylistAlbumView.prototype.events = {
        'click .queue.remove': 'removeFromPlaylist',
        'click li>a': 'goToTrack'
      };

      PlaylistAlbumView.prototype.initialize = function() {
        _.bindAll(this, 'render', 'remove', 'updateState', 'updateTrack');
        this.player = this.options.player;
        this.player.bind('change:state', this.updateState);
        this.player.bind('change:currentTrackIndex', this.updateTrack);
        this.playlist = this.player.playlist;
        return this.model.bind('remove', this.remove);
      };

      PlaylistAlbumView.prototype.updateState = function() {
        var isAlbumCurrent;
        isAlbumCurrent = this.player.currentAlbum() === this.model;
        return $(this.el).toggleClass('current', isAlbumCurrent);
      };

      PlaylistAlbumView.prototype.updateTrack = function() {
        var currentTrackIndex, isAlbumCurrent;
        isAlbumCurrent = this.player.currentAlbum() === this.model;
        if (isAlbumCurrent) {
          currentTrackIndex = this.player.get('currentTrackIndex');
          this.$('li').each(function(index, el) {
            return $(el).toggleClass('current', index === currentTrackIndex);
          });
        }
        return this.updateState();
      };

      PlaylistAlbumView.prototype.removeFromPlaylist = function() {
        if (this.model === this.player.currentAlbum()) {
          this.player.set({
            currentAlbumIndex: 0,
            currentTrackIndex: 0,
            state: 'stop'
          });
        } else if (this.playlist.indexOf(this.model) < this.playlist.indexOf(this.player.currentAlbum())) {
          this.player.attributes.currentAlbumIndex -= 1;
        }
        return this.options.playlist.remove(this.model);
      };

      PlaylistAlbumView.prototype.goToTrack = function(event) {
        var albumIndex, target, trackIndex;
        target = $(event.target).parent();
        trackIndex = target.parents('ol').children().index(target);
        albumIndex = this.playlist.indexOf(this.model);
        return this.player.set({
          currentAlbumIndex: albumIndex,
          currentTrackIndex: trackIndex
        });
      };

      return PlaylistAlbumView;

    })(AlbumView);
  });

}).call(this);
