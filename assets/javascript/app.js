$(document).ready(function(){
    var intervalId;
    var timeClear;
    var clockRunning = false;
    var time = 90;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var checked = false;

    $("#start").click(start);

    $("#submit").click(submit);

    $("#reset").click(reset);



    function start() {
        $("#submit").show();
        $("#trivia").show();
        $("#start").hide();
        // Starts Time
        if (!clockRunning) {
          timeClear = setTimeout(timeUp, 1000 * time);
          intervalId = setInterval(count, 1000);
          clockRunning = true;
          $("#timer").text("1:30");
        }
    
    }

    function timeUp() {
        score();
        $("#submit").hide();
        $("#reset").show();
        $("#trivia").hide();
        $("#results").show();
        console.log("done");
        $("#results").append("<h2>Time's Up!</h2>");
        $("#results").append("<h2>Correct: " +correct +"</h2>");
        $("#results").append("<h2>Incorrect: " +incorrect +"</h2>");
        $("#results").append("<h2>Unanswered: " +unanswered +"</h2>");
        clearInterval(intervalId);
        clockRunning= false;

    }

    function submit(){
        score();
        clearTimeout(timeClear);
        $("#submit").hide();
        $("#reset").show();
        $("#results").show();
        time=0;
        $("#trivia").hide();
        $("#results").append("<h2>Correct: " +correct +"</h2>");
        $("#results").append("<h2>Incorrect: " +incorrect +"</h2>");
        $("#results").append("<h2>Unanswered: " +unanswered +"</h2>");
        clearInterval(intervalId);
        clockRunning=false;
    }

    function reset(){
        time = 90;
        $("timer").empty();
        $("#results").hide();
        $("#reset").hide();
        uncheck();
        start();

    }

    function count() {
        if (converted > "00:00" || time > 0){
        time--;
        var converted = timeConverter(time);
        console.log(converted);
        $("#timer").text(converted);
        }
    }

    function timeConverter(t) {

        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);
        
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        
        if (minutes === 0) {
            minutes = "0";
        }
        else if (minutes < 10) {
            minutes = minutes;
        }
        
        return minutes + ":" + seconds;
    }

    function score() {
        var qs=["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"];
        for (t=0; t<qs.length; t++){
            var radios = document.getElementsByName(qs[t]);
            console.log(radios);
            for (var i = 0, length = radios.length; i < length; i++){
                if (radios[i].checked){
                    console.log(radios[i].value);
                    if (radios[i].value == 1){
                        correct = correct+1;
                        console.log("Correct: " +correct);
                    }else if (radios[i].value == 0){
                        incorrect= incorrect+1;
                        console.log("Incorrect: " +incorrect);
                    }
                    break;
                }
            }
        }
        unanswered= 10-correct-incorrect;
    }

    function uncheck(){
        var list=[];
        for (i=1; i<31; i++){
            list.push(i);
        }
        for (y=0; y<list.length; y++){
        document.getElementById(list[y]).checked = false;
        }
    }

});