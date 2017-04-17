$(document).ready(function(){
    
    if(document.domain.includes("xn--")){
        var actualDomainTranslated = punycode.toUnicode(document.domain);
        var exp = /^[a-zA-Z]/;
        if(exp.test(actualDomainTranslated)) {
            console.log("passed");
            printWarning();
        }
    }
});

function printWarning() {
    var warningBoxId = uniqId().toString();
    var $div = $("<div>", {id: warningBoxId});
    $("head").append("<link href='https://fonts.googleapis.com/css?family=Roboto:900' rel='stylesheet'>");
    $div.css({
        "background-color": "red",
        "width": "100%",
        "height": "100%",
        "top": "0",
        "right": "0",
        "bottom": "0",
        "left": "0",
        "position": "absolute",
        "border": "10px",
        "z-index": "698986442",
    });
    var titleId = uniqId().toString();
    var $title = $("<p>", {id: titleId}).text("WARNING, THE FOLLOWING WEBSITE COULD BE A POSSIBLE PHISHING ATTACK!");
    $title.css({
        "padding": "0% 33%",
        "margin": "10% 0% 0% 0%",
        "font-size": "2.5em",
        "color": "white",
        "font-family": "Roboto, sans-serif"
    });
    var messageId = uniqId().toString();
    var $message = $("<p>", {id: messageId}).text(makeTheDescriptionMessage());
    $message.wrapInTag({
        tag: 'strong',
        words: [punycode.toUnicode(document.domain),document.domain]
    });
    $message.css({
        "padding": "0% 33%",
        "font-size": "1.2em",
        "color": "white",
        "font-family": "Roboto, sans-serif"
        // "margin": "8% 0% 0% 0%"
    });
    $div.append($title).append($message);
    $("body").append($div);
}

function uniqId() {
  return Math.round(new Date().getTime() + (Math.random() * 100));
}

function makeTheDescriptionMessage() {
    // var message = "The following website make look like its came from {Translated punycode to english} but the domain name is actually {Actual domain name}"
    var message = "The site might be an attemp to a phishing attack, it may look like its came from: " + punycode.toUnicode(document.domain) + ", But the actual domain name is: " + document.domain;
    return message;
}

$.fn.wrapInTag = function(opts) {
  
  var tag = opts.tag || 'strong',
      words = opts.words || [],
      regex = RegExp(words.join('|'), 'gi'),
      replacement = '<'+ tag +'>$&</'+ tag +'>';
  
  return this.html(function() {
    return $(this).text().replace(regex, replacement);
  });
};

$('p').wrapInTag({
  tag: 'em',
  words: ['world', 'red']
});

//The following website came from a suspicious domain name, you might view it as normal english letters, but its actually {ACTUAL DOMAIN HERE}
//Close this tab, Go back, Proceed anyway (Not recommended!){Are you sure?}