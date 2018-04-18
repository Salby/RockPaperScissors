//Find Labels in the User area
//Playing variable to turn "the game" off
var playing = true;

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
            //Run CPU Random function and add result from.... result
            resultCalc(toggleClass(selected), cpuPlayer(cpuOptions));
            //Turn off playing
            playing = false;
        }
    }
}


//Toggle class on selected DIMS
function toggleClass(selected) {
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
        console.log('CPU Vandt');
        var result = "CPU Won";
    }
    //Win Scenario
    else if (userPick % 3 + 1 == cpuPick) {
        console.log('Du vandt');
        var result = "You Won";
    }
    //Draw Scenario
    else {
        console.log('Uafgjort');
        var result = "Round Draw"
    }

    message(result);

}

function message(msg) {
    var body = document.getElementsByTagName('body');
    var messageContainer = document.createElement('div');
    messageContainer.classList.add('message');
    messageContainer.innerHTML = '<h1>' + msg + '</h1><div><button type="button" onclick="newGame()"><i class="material-icons">refresh</i></button></div>';
    body[0].appendChild(messageContainer);
}