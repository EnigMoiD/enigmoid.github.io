// Generated by CoffeeScript 1.6.3
(function() {
  var bannerImg, sizeBanner;

  bannerImg = $(".post-banner");

  $(bannerImg).load(function() {
    return sizeBanner($(this));
  });

  $(window).resize(function() {
    return bannerImg.each(function() {
      return sizeBanner($(this));
    });
  });

  sizeBanner = function(b) {
    var bannerPosition, h;
    h = b.height();
    bannerPosition = b.attr("bannerPosition");
    console.log("image height for " + ($(b).attr('src')));
    console.log(h);
    console.log(bannerPosition);
    return b.css({
      "margin-top": -bannerPosition * h
    });
  };

}).call(this);
