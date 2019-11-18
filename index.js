//display two rows, one positive, one negative, both with zero
//media query version has different lengths of rows with buttons, possibly?
//accessibility
//PWA

const MAX_HISTORY = 10;
const BASE_DICE = 5;

let data = {
    rolls: [0,0,0,0,0,0,0,0,0,0],
    count: 0,
    lastModifier: "+0"
}

let vm = new Vue({
    el: "#app",
    data: data
})

let changeIndex = function(){
    if (data.currentIndex < 2) {
        data.currentIndex += 1;
    }
    else {
        data.currentIndex = 0;
    }
}

let rollDie = function(){
    let roll = Math.floor(Math.random() * 2);
    //console.log("Roll: " + roll);
    return roll;
}

let rollDice = function(numDice){
    let totalRoll = 0;
    
    for (let i = 0; i < numDice; i += 1){
        totalRoll += rollDie()
    }

    //console.log("NumDice: " + numDice);
    //console.log("Total Roll: " + totalRoll);
    return totalRoll;
}

let rollCheck = function(modifier){
    let result = 0;
    
    if (modifier < 0){
        result = rollDice(BASE_DICE + Math.abs(modifier))
        result += modifier;
    }
    else {
        result = rollDice(BASE_DICE + modifier)
    }

    return result;
}

let displayResult = function(modifier){
    let result = rollCheck(modifier);
    data.count += 1;
    if (modifier > -1){
        data.lastModifier = "+" + modifier;
    }
    else {
        data.lastModifier = modifier;
    }

    data.rolls.unshift(result);
    if (data.rolls.length > MAX_HISTORY){
        data.rolls.pop();
    }
}