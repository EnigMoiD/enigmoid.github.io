// Generated by CoffeeScript 1.6.3
(function() {
  var imageBox, scaleRects;

  imageBox = $(".images-box");

  imageBox.each(function() {
    var box, i, w;
    box = $(this);
    w = box.width();
    i = box.find("img");
    return i.load(function() {
      scaleRects(box.width(), $(i[0]), $(i[1]));
      return $(window).resize(function() {
        return scaleRects(box.width(), $(i[0]), $(i[1]));
      });
    });
  });

  scaleRects = function(w, a, b) {
    var s0, s1;
    s1 = w * a.height() / (a.width() * b.height() + b.width() * a.height());
    s0 = b.height() * s1 / a.height();
    a.height(a.height() * s0);
    return b.height(b.height() * s1);
  };

}).call(this);