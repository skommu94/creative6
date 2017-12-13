$.ajax({
    url: "http://dynamic.xkcd.com/api-0/jsonp/comic?callback=?",
    dataType: "json",
    jsonpCallback: "xkcddata",
    success: function(data) {
        $("#xkcdcontent").append(
         //   $("<h1/>").text(data.title),
            $("<img/>").attr({
                src: data.img,
                title: data.alt,
                alt: data.title
            })
        );
    }
});