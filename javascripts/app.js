(function() {
  var Slides = function() {
    this.links = $('.li-box').children();
    this.slides = {
      '#about': this.links[0],
      '#code' : this.links[1],
      '#work' : this.links[2],
      '#write': this.links[3]
    };
    this.current = 0;
  };

  Slides.prototype.next = function() {
    //rolls back when gets in the end.
    var nextSlide = (this.current + 1) % this.links.length;
    this.moveTo(nextSlide);
    this.current = nextSlide;
  };

  Slides.prototype.back = function() {
    //same here, but when it reachs the begin.
    var lastSlide = (this.current - 1) % this.links.length;
    this.moveTo(lastSlide);
    this.current = lastSlide;
  };

  Slides.prototype.moveTo = function(slide) {
    this.links[slide].click();
  };

  Slides.prototype.goTo = function(name) {
    setTimeout($.proxy(function() {
      this.slides[name].click();
    }, this), 1000);
  };

  var current = location.hash,
      slides = new Slides();
  location.hash = current === '' ? '#about' : current;
  slides.goTo(current);
  $(".li-box").bind("click", function(event){
    $(".li-box").removeClass('active');
    $(this).addClass('active');
    event.preventDefault();
    var target = $(this).children().children().attr("href");
    $("html, body").stop().animate({ scrollLeft: $(target).offset().left, scrollTop: $(target).offset().top }, 1200);
    setTimeout(function() {
      location.hash = target;
    }, 1200);
  });

  $('#next').click(function(event) {
    event.preventDefault();
    slides.next();
  });

  setInterval(function() {
    $("#next").animate({left: "+=40px"}, 150, "linear");
    $('#next').animate({left: "-=40px"}, 250, "linear");
  }, 2500);
})();