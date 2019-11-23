const MAX_HISTORY = 10;
const BASE_DICE = 5;

let data = {
    rolls: [0,0,0,0,0,0,0,0,0,0],
    count: 0,
    lastRoll: 0,
}

let vm = new Vue({
    el: "#app",
    data: data
})


let rollDie = function(target){
    let roll = Math.floor(Math.random() * 10) + 1;
    if (roll == 10){
        console.log("Explode");
        return 1 + rollDie(target);
    }
    else if (roll < 10 && roll >= target){
        console.log("Success");
        return 1;
    }
    else {
        console.log("Failure");
        return 0;
    }
}

let rollDice = function(numDice, target){
    let totalRoll = 0;
    
    for (let i = 0; i < numDice; i += 1){
        totalRoll += rollDie(target)
    }

    //console.log("NumDice: " + numDice);
    //console.log("Total Roll: " + totalRoll);
    return totalRoll;
}


let displayResult = function(numDice, target){
    let result = rollDice(numDice, target);
    data.count += 1;
    data.lastRoll = numDice + " (TN " + target + ")";

    data.rolls.unshift(result);
    if (data.rolls.length > MAX_HISTORY){
        data.rolls.pop();
    }
}