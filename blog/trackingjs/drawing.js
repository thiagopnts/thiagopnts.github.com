
var context = document.getElementById("board").getContext("2d"),
clickX      = [],
clickY      = [],
clickDrag   = [],
videoCamera = new tracking.VideoCamera().render(),
paint;

videoCamera.track({
    type: 'color',
    color: 'magenta',
    onFound: function(track) {
      addClick(track.x, track.y, true);
      redraw();
    },
    onNotFound: function() {

    }
});

function addClick (x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw () {
  context.width = context.width;
  context.strokeStyle = "#FFF";
  context.lineJoin = "round";

  context.lineWidth = 7;

  for(var i = 0; i < clickX.length; i++) {
    context.beginPath();
    if(clickDrag[i] && i) {
      context.moveTo(clickX[i-1], clickY[i-1]);
    } else {
      context.moveTo(clickX[i]-1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.stroke();
  }

}