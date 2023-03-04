var tweetBtn = document.querySelector('#tweet');
var highScore = {"streak": 25, "lastTime":(new Date("March 3, 2023 00:00:00")).getTime()};

tweetBtn.onclick = function(){
    //url: https://twitter.com/intent/tweet?text=Hello%20world
    var original = "https://google.com";
    var redirection = "twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Eshare%7Ctwgr%5E";
    var text = "Can you beat my high score of " + highScore.streak + " in XXXX?";
    var redirectUrl = "https://github.com";

    var url = "https://twitter.com/intent/tweet?original_referer=" + original
    url += "&ref_src=" + redirection
    url += "&text=" + text
    url += "&url=" + redirectUrl
    window.open(url, '_blank').focus();
}
