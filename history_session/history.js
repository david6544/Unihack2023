//user name, old strak
//time when you finished
var but = document.querySelector('#but');
//select the streak
var strk = document.querySelector('#streak');
var bestScore = null;


but.onclick = function(){
    var name = document.querySelector("#item").value;
    window.localStorage.setItem('name', JSON.stringify(name));

    var streak = strk.value;
    var lastTime = (new Date()).getTime();

    var history = JSON.parse(window.localStorage.getItem('history'));

    if(history != null && history.length >= 10){
        history.shift();
    }

    var savedJson = {streak, lastTime};
    if(history == null) history = [];

    history.push(savedJson);
    window.localStorage.setItem('history', JSON.stringify(history));

    console.log("inserted: ");
    console.log(savedJson);

    if(bestScore == null){
        bestScore = savedJson;
    }
    else if(savedJson.streak > bestScore.streak){
        bestScore = savedJson;
    }
};

var disp = document.querySelector('#disp');
disp.onclick = function(){
    var history = JSON.parse(window.localStorage.getItem('history'));
    if(history == null) return;

    var curTime = (new Date()).getTime();
    console.log(history.length);
    for(let i = 0; i < history.length; i++){
        var outputString = "streak: ";
        outputString += history[i].streak;
        outputString += " | ";

        var lastTime = history[i].lastTime;
        var timeDiff = curTime - lastTime;
        timeDiff = timeDiff/1000;

        var timeSince = timeSinceLast(timeDiff);
        var tmpStr = getOutputStr(timeSince);

        outputString += tmpStr;

        console.log(outputString);
    }
}



function getOutputStr(timeSince){
    var outputString = "";
    for(var timeType in timeSince){
        if(timeSince[timeType] != 0){
            outputString = String(timeSince[timeType]) + " " + timeType;
            if(timeSince[timeType] > 1){
                outputString += "s ";
            }
            else{
                outputString += " ";
            }
            outputString +=  "ago";
            break;
        }
    }

    if(outputString == ""){
        outputString = "not long ago";
    }


    return outputString;
}

function timeSinceLast(timeDiff){
    var minutes = Math.floor(timeDiff / 60);
    var hours = 0;
    if(minutes >= 60){
        hours = Math.floor(minutes / 60);
        minutes = minutes - (60 * hours);
    }

    var days = 0;
    if(hours >= 24){
        days = Math.floor(hours / 24);
        hours = hours - (24 * days);
    }

    var months = 0;
    if(days >= 30){
        months = Math.floor(days / 30);
        days = days - (30 * months);
    }

    var years = 0;
    if(months >= 12){
        years = Math.floor(months / 12);
        months = months - (12 * years);
    }

    return {"year":years,"month":months,"day":days,"hour":hours,"minute":minutes};
};