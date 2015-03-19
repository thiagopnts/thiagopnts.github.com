
function collides(div1, div2) {
    var rect1 = div1.getBoundingClientRect();
    var rect2 = div2.getBoundingClientRect();

    //(x1, y1) = (left, top)
    //(x2, y2) = (right, bottom)

    return (rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top);

}


describe('Collision Detection', function() {
  beforeEach(function() {
    this.div1 = document.createElement('div');
    this.div2 = document.createElement('div');
  });

  it('detects collisions from the top/bottom', function() {
    // two 150x150 divs positioned on the top left of the page
    var rect1 = {
      bottom: 160,
      height: 150,
      left: 8,
      right: 158,
      top: 8,
      width: 150
    };

    var rect2 = {
      bottom: 310,
      height: 150,
      left: 8,
      right: 158,
      top: 150,
      width: 150
    };

    this.div1.getBoundingClientRect = function() { return rect1 };
    this.div2.getBoundingClientRect = function() { return rect2 };
    expect(collides(this.div1, this.div2)).toBe(true);
  });


  it('detects collisions from right/left', function() {
    // two 150x150 divs side by side
    var rect1 = {
      bottom: 158,
      height: 150,
      left: 8,
      right: 158,
      top: 8,
      width: 150
    };

    var rect2 = {
      bottom: 158,
      height: 150,
      left: 155,
      right: 305,
      top: 8,
      width: 150
    };

    this.div1.getBoundingClientRect = function() { return rect1 };
    this.div2.getBoundingClientRect = function() { return rect2 };
    expect(collides(this.div1, this.div2)).toBe(true);
  });

  it('detects as collision if one div is inside the other', function() {
    // one 150x150 div with a smaller one inside
    var rect1 = {
      bottom: 158,
      height: 150,
      left: 8,
      right: 158,
      top: 8,
      width: 150
    };

    var rect2 = {
      bottom: 135,
      height: 100,
      left: 35,
      right: 135,
      top: 35,
      width: 100
    };

    this.div1.getBoundingClientRect = function() { return rect1 };
    this.div2.getBoundingClientRect = function() { return rect2 };
    expect(collides(this.div1, this.div2)).toBe(true);
  });

  it('detects if does not collide', function() {
    // two 150x150 divs positioned on the top left of the page
    // with a space between it
    var rect1 = {
      bottom: 158,
      height: 150,
      left: 8,
      right: 158,
      top: 8,
      width: 150
    };

    var rect2 = {
      bottom: 410,
      height: 150,
      left: 8,
      right: 158,
      top: 260,
      width: 150
    };

    this.div1.getBoundingClientRect = function() { return rect1 };
    this.div2.getBoundingClientRect = function() { return rect2 };
    expect(collides(this.div1, this.div2)).toBe(false);
  });
});
