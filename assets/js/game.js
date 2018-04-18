//Find Labels in the User area
//Playing variable to turn "the game" off
var playing = true;
const SCOREBOARD = document.getElementById('scoreboard');
var scoreboardDataPlayer;
var scoreboardDataCpu;
var playerScore = 0;
var cpuScore = 0;

//User Variables
var user = document.getElementById('user');
var options = user.querySelectorAll('label');

//CPU Variables
var cpu = document.getElementById('cpu');
var cpuOptions = cpu.querySelectorAll('label');

//Loop over inputs and give class if clicked on
for (var i=0; i < options.length; i++)  {
    //Variable with individual inputs
    var selected = options[i];

    //If you click on a radio button
    selected.onclick = function(e) {
        selected = e.target;
        //console.log(e.target);
        if (playing === true) {
            //
            resultCalc(player(selected), cpuPlayer(cpuOptions));
            //Turn off playing
            playing = false;
        }
    }
}


//Toggle class on selected DIMS
function player(selected) {
    if (!selected.classList.contains('active')) {
        selected.classList.add('active');
        var selectedInput = selected.querySelector('input');
        return selectedInput.value;
    }
}

//Highlight option for CPU
function cpuPlayer(cpuOptions) {
    //Pick random label from CPU section
    var randomPick = cpuOptions[Math.floor(Math.random() * cpuOptions.length)];
    // Give active class to selected option
    randomPick.classList.add('active');
    var selectedCpuInput = randomPick.querySelector('input');
    return selectedCpuInput.value;
}

function resultCalc(userPick, cpuPick) {
    //console.log(userPick + ', ' + cpuPick);

    //Lose Scenario
    if (cpuPick % 3 + 1 == userPick) {
        var result = "CPU Won";
    }
    //Win Scenario
    else if (userPick % 3 + 1 == cpuPick) {
        var result = "You Won";
    }
    //Draw Scenario
    else {
        var result = "Round Draw"
    }
    scoreboard(result);
    message(result);
    scoreboardBuild();

}

function message(msg) {
    var main = document.getElementsByTagName('main');
    var messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    messageContainer.innerHTML = '<h1>' + msg + '</h1><button type="button" onclick="newGame(this.parentNode)"><i class="material-icons">refresh</i></button>';
    main[0].appendChild(messageContainer);
}

function newGame(dialog) {
    playing = true;
    var activeElements = document.querySelectorAll(".active");
    for (var i = 0; i < activeElements.length; i++) {
        activeElements[i].classList.remove("active");
    }
    dialog.remove();
}

var scoreboard = function(result) {
    if (result == "You Won") {
        scoreboardDataPlayer = "Win";
        scoreboardDataCpu = "";
        playerScore ++;
    }
    else if (result == "CPU Won") {
        scoreboardDataPlayer = "";
        scoreboardDataCpu = "Win";
        cpuScore ++;
    }
    else {
        scoreboardDataPlayer = "Draw";
        scoreboardDataCpu = "Draw";
    }

};
var scoreboardBuild = function() {
    var table = SCOREBOARD.querySelector("tbody");
    var resultRow = table.querySelector('tr');
    var row = document.createElement("tr");
    row.innerHTML = "";
    row.innerHTML = "<td>" + scoreboardDataPlayer + "</td><td>" + scoreboardDataCpu + "</td>";
    setTimeout(function() {
        resultRow.childNodes[1].innerHTML = playerScore;
        resultRow.childNodes[3].innerHTML = cpuScore;
        table.appendChild(row);
    }, 821);
}
