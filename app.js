// DECLARING VARIABLES *************************************************************************

// RESET BUTTON VARIABLES

// BACKGROUND COLOR CHANGE VARIABLES

const HEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const COLORbtn = document.getElementById("set-color-button");
const REMOVEcolorBTN = document.getElementById("remove-color-button");

// CLOCK VARIABLES

const DEFINECLOCK = document.getElementById("set-clock-button");
const STARTCLOCK = document.getElementById("start-clock-button");
const CLOCKTIMER = document.getElementById("clock-timer");
const CLOCKDESIGN = document.querySelector(".clock");
var myTimer;
var countdownTime;

// MODULES VARIABLES

const ADDNOTES = document.getElementById("notes-add-button");
const REMOVENOTES = document.getElementById("notes-remove-button");
const MODULESTITLE = document.getElementById("modules-input-title");
const MODULESINPUT = document.getElementById("modules-input");
let modules = document.getElementById("modules-notes");
let modulesClone;
let modulesDivId = 20; /* plates already using Ids starting from zero. Need to make this start from 10 so it doesnt
match the plates Ids */

// LINKS VARIABLES

const LINKSCLEARbtn = document.getElementById("links-clear");
const LINKSADDbtn = document.getElementById("links-add");
const LINKSREMOVEbtn = document.getElementById("links-remove");
let linksInput = document.getElementById("links-input");
let defaultLinks = document.querySelector(".links");
let newLiName;
let linksArray = ["MANUALS", "FMN", "ABC"];

// FORGET ME NOT VARIABLES

const LASTFMNCODE = document.getElementById("fmn-final-result");
let fmn = document.querySelector("#fmn-stage-input");
let fmnResult = document.querySelector("#fmn-stage");
let stageNumbers = [];
let firstNumber = 0;
let secondNumber = 0;
let allOtherNumbers = 0;
let finalCodeArray = [];
let firstNumberDivided;
let secondNumberDivided;
let allOtherNumbersDivided;

// LEFT PANEL VARIABLES

const SERIALNUMBER = document.getElementById("serial-number");
const BATTERIESINPUT = document.getElementById("batteries-input");
const LITINPUT = document.getElementById("lit-input");
const UNLITINPUT = document.getElementById("unlit-input");
let serialNumberArray = [];
let serialNumberStr = "";
let serialNumberRegex = /[0-9]/g;
let serialNumberNumbers;
let litArr = [];
let unlitArr = [];
let litIndicators;

// PORTS VARIABLES

const ADDPLATE = document.getElementById("add-port");
const REMOVEPLATE = document.getElementById("remove-port");
let NewPlateDiv = document.querySelector(".ports-selection");
let ports;
let plateDivId = 0;

// RESET THE BOARD ************************************************************************************************

function newGame() {

    /*BODY*/
    document.body.style.backgroundColor = "black";

    /*CLOCK*/
    clearInterval(myTimer);
    CLOCKTIMER.textContent = "00:00:00";
    CLOCKTIMER.style.color = "aqua";
    CLOCKDESIGN.style.backgroundColor = "rgb(41, 41, 41)";

    /*LINKS*/
    linksInput.value = "";
    LINKSCLEARbtn;

    /*FMN INPUT VALUE*/
    fmn.value = "";
    LASTFMNCODE.value = "";

    /*LEFT PANEL VALUES*/
    SERIALNUMBER.value = "";
    BATTERIESINPUT.value = "";
    LITINPUT.value = "";
    UNLITINPUT.value = "";

    /*PORTS CLEAR*/

    /*MODULES VALUES*/
    MODULESTITLE.value = "";
    MODULESINPUT.value = "";

};

// CHANGE BACKGROUND COLOR *****************************************************************************

COLORbtn.addEventListener("click", function () {

    let hexColor = "#";

    for (let i = 0; i < 6; i++) {
        hexColor += HEX[getRandomNumber()];
    };

    document.body.style.backgroundColor = hexColor;

});

function getRandomNumber() {

    return Math.floor(Math.random() * HEX.length);

};

REMOVEcolorBTN.addEventListener("click", function () {

    document.body.style.backgroundColor = "black";

})

// CLOCK *********************************************************************************************

DEFINECLOCK.addEventListener("click", function () {

    clearInterval(myTimer);
    CLOCKTIMER.style.color = "aqua";
    CLOCKDESIGN.style.border = "0.2rem 0.2rem solid black";
    CLOCKDESIGN.style.backgroundColor = "rgb(41, 41, 41)";
    countdownTime = prompt("SET THE CLOCK TIMER IN SECONDS");

})

STARTCLOCK.addEventListener("click", function () {

    myTimer = setInterval(myClock, 1000);

    function myClock() {

        --countdownTime;
        var seconds = countdownTime % 60;
        var secondsInMinutes = (countdownTime - seconds) / 60;
        var minutes = secondsInMinutes % 60;
        var hours = (secondsInMinutes - minutes) / 60;

        if (hours <= 9) {
            CLOCKTIMER.textContent = "0" + hours + ":" + minutes + ":" + seconds;
        }

        else {
            CLOCKTIMER.textContent = hours + ":" + minutes + ":" + seconds;
        }

        if (countdownTime <= 300) {
            CLOCKTIMER.style.color = "black";
            CLOCKDESIGN.style.backgroundColor = "YELLOW";

            if (minutes <= 9) {
                CLOCKTIMER.textContent = "0" + minutes + ":" + seconds;

                if (seconds <= 9) {
                    CLOCKTIMER.textContent = "0" + minutes + ":" + "0" + seconds;

                } else {
                    CLOCKTIMER.textContent = minutes + ":" + seconds;
                }

            } else {
                CLOCKTIMER.textContent = minutes + ":" + seconds;
            }
        };

        if (countdownTime < 60) {
            CLOCKTIMER.style.color = "black";
            CLOCKDESIGN.style.backgroundColor = "red";

            if (seconds <= 9) {
                CLOCKTIMER.textContent = "0" + seconds;

            } else {
                CLOCKTIMER.textContent = seconds;
            }

        };

        if (countdownTime === 0) {
            clearInterval(myTimer);
            CLOCKTIMER.textContent = "BOMB EXPLODED";
            alert("BOMB EXPLODED")
        }
    }
})

// MODULES NOTES ADD AND REMOVE *********************************************************************

ADDNOTES.addEventListener("click", function () {

    modulesClone = modules.cloneNode(true);
    modulesDivId += 1;
    modulesClone.setAttribute('id', modulesDivId);
    modules.after(modulesClone);

    if (MODULESTITLE.value !== "" || MODULESINPUT.value !== "") {

        MODULESTITLE.value = "";
        MODULESINPUT.value = "";

    }

}
);

REMOVENOTES.addEventListener("click", function () {

    document.getElementById(modulesDivId).remove();
    modulesDivId = modulesDivId - 1;

})

// LINKS ADD AND REMOVE ********************************************************************************

LINKSCLEARbtn.addEventListener("click", function () {

    linksInput.value = "";

})

LINKSADDbtn.addEventListener("click", function () {

    if (linksInput.value === "") {
        alert("YOU NEED TO WRITE A NAME");
    }

    else if (linksArray.indexOf(linksInput.value) === - 1) {
        let newLi = document.createElement("li");
        let newAnchor = document.createElement("a");
        newLiName = linksInput.value;
        linksArray.push(newLiName.toUpperCase());
        newAnchor.innerText = newLiName;
        newLi.appendChild(newAnchor);
        defaultLinks.appendChild(newLi);
        newAnchor.setAttribute("target", "_blank")
        newAnchor.setAttribute("id", ("links-" + newLiName.toLowerCase()));
        newAnchor.href = prompt("INSERT LINK");
    }

    else {
        alert("THAT LINK'S NAME ALREADY EXISTS")
    }
})

LINKSREMOVEbtn.addEventListener("click", function () {

    let defaultLinksNames = linksArray;

    if (linksInput.value === "") {
        alert("YOU NEED TO TYPE A LINK NAME TO BE REMOVED")
    }

    else if (defaultLinksNames.indexOf(linksInput.value) > - 1) {
        document.getElementById("links-" + linksInput.value.toLowerCase()).remove();
        linksArray.splice(defaultLinksNames.indexOf(linksInput.value), 1);
        plateDivId = plateDivId - 1
    }

    else {
        alert("THAT LINK'S NAME DOES NOT EXIST!")
    }
})

// FORGET ME NOT *********************************************************************************

// GET THE SERIAL NUMBER INTO AN ARRAY AND MORE

SERIALNUMBER.addEventListener("input", function () {

    if (SERIALNUMBER.value === "") {
        serialNumberStr = "";
        return serialNumberArray = []
    }

    if (SERIALNUMBER.value.length > serialNumberArray.length) {
        let lastDigInserted = SERIALNUMBER.value.slice(-1);
        serialNumberArray.push(lastDigInserted);
        serialNumberStr = serialNumberArray.toString();
        serialNumberNumbers = serialNumberStr.match(serialNumberRegex)
    }

    if (SERIALNUMBER.value.length < serialNumberArray.length) {
        serialNumberArray.pop();
        serialNumberStr = serialNumberArray.toString();
        serialNumberNumbers = serialNumberStr.match(serialNumberRegex)
    }

})

// GET THE LIT AND UNLIT INPUTS INTO ARRAYS

LITINPUT.addEventListener("input", function () {

    let litNumber;
    let litArrStrNoSpaces;
    let litArrStrNoComas;
    let litArrStr;

    if (LITINPUT.value === "") {
        return litArr = []
    }

    if (LITINPUT.value.length > litArr.length) {
        litArr.push(LITINPUT.value.slice(-1));
        litArrStr = litArr.toString();
        litArrStrNoComas = litArrStr.replace(/,/g, "");
        litArrStrNoSpaces = litArrStrNoComas.replace(/ /g, "");
        litNumber = litArrStrNoSpaces.length;
        litIndicators = litNumber / 3;
    }

    if (LITINPUT.value.length < litArr.length) {
        litArr.pop();
    }

})

// FMN - GET THE STAGE'S NUMBERS TO STORE SO LATER WE CAN USE THEM TO GET THE FINAL CODE

fmn.addEventListener("input", function () {

    if (fmn.value === "") {
        stageNumbers = [];
        fmnResult.innerText = "0"
        finalCodeArray = [];
        LASTFMNCODE.value = finalCodeArray
    }

    else if (SERIALNUMBER.value === "") {
        fmn.value = "";
        alert("SERIAL NUMBER IS EMPTY");
    }

    else if (fmn.value.length > stageNumbers.length) {

        let lastNumInserted = fmn.value.slice(-1);

        stageNumbers.push(Number(lastNumInserted));
        fmnResult.innerText = stageNumbers.length;
        runCalc();
    }

    else if (fmn.value.length < stageNumbers.length) {
        stageNumbers.pop(Number());
        fmnResult.innerText = stageNumbers.length;
        finalCodeArray.pop();
        LASTFMNCODE.value = finalCodeArray;
        let finalCodeArrayNoComas = LASTFMNCODE.value;
        finalCodeArrayNoComas = finalCodeArrayNoComas.replace(/,/g, "-");
        LASTFMNCODE.value = finalCodeArrayNoComas;
    }

})

function runCalc() {

    if (stageNumbers.length == 0) {
        return null
    }

    if (stageNumbers.length == 1) {
        fmnFirst();
        finalCode();
    }

    if (stageNumbers.length == 2) {
        fmnSecond();
        finalCode();
    }

    if (stageNumbers.length > 2) {
        fmnAllOtherNumbers();
        finalCode();
    }

}

// FMN GET THE FIRST NUMBER

function fmnFirst() {

    firstNumber = stageNumbers[0];
    let car = UNLITINPUT.value.toUpperCase();

    if (car === "CAR") {
        firstNumber = firstNumber + 2;
        firstNumberDivided = Array.from(String(firstNumber), Number);

        if (firstNumberDivided.length > 1) {
            firstNumberDivided = firstNumberDivided[1];
            finalCodeArray.push(firstNumberDivided);
            console.log("1stNumber - CAR 1");
        }
        else {
            finalCodeArray.push(firstNumber);
            console.log("1stNumber - CAR 2");
        }
    }

    else if (UNLITINPUT.value.length > LITINPUT.value.length) {
        firstNumber = firstNumber + 7;
        firstNumberDivided = Array.from(String(firstNumber), Number);

        if (firstNumberDivided.length > 1) {
            firstNumberDivided = firstNumberDivided[1];
            finalCodeArray.push(firstNumberDivided);
            console.log("1stNumber - MORE UNLITS 1");
        }
        else {
            finalCodeArray.push(firstNumber);
            console.log("1stNumber - MORE UNLITS 2");
        }
    }

    else if (UNLITINPUT.value.length === 0 && LITINPUT.value.length !== 0) {
        firstNumber = parseInt(firstNumber) + parseInt(litIndicators);
        firstNumberDivided = Array.from(String(firstNumber), Number);

        if (firstNumberDivided.length > 1) {
            firstNumberDivided = firstNumberDivided[1];
            finalCodeArray.push(firstNumberDivided);
            console.log("1stNumber - NUMBER OF LITS 1");
        }
        else {
            finalCodeArray.push(firstNumber);
            console.log("1stNumber - NUMBER OF LITS 2");
        }
    }

    else {
        firstNumber = firstNumber + Number(serialNumberNumbers[serialNumberNumbers.length - 1]);
        firstNumberDivided = Array.from(String(firstNumber), Number);

        if (firstNumberDivided.length > 1) {
            firstNumberDivided = firstNumberDivided[1];
            finalCodeArray.push(firstNumberDivided);
            console.log("1stNumber - ELSE 1");
        }
        else {
            finalCodeArray.push(firstNumber);
            console.log("1stNumber - ELSE 2");
        }
    }

}

// FMN GET THE SECOND NUMBER

function fmnSecond() {

    let serialChecked = document.querySelector("#Serial").checked;
    secondNumber = stageNumbers[1];

    if (serialChecked && serialNumberNumbers.length >= 3) {
        secondNumber = parseInt(secondNumber) + 3;
        secondNumberDivided = Array.from(String(secondNumber), Number);

        if (secondNumberDivided.length > 1) {
            secondNumberDivided = secondNumberDivided[1];
            finalCodeArray.push(secondNumberDivided);
            console.log("2ndNumber - SERIAL PORT 1");
        }
        else {
            finalCodeArray.push(secondNumber);
            console.log("2ndNumber - SERIAL PORT 2");
        }

    }

    else if (firstNumberDivided % 2 === 0) {
        secondNumber = parseInt(firstNumberDivided) + 1 + secondNumber;
        secondNumberDivided = Array.from(String(secondNumber), Number);

        if (secondNumberDivided.length > 1) {
            secondNumberDivided = secondNumberDivided[1];
            finalCodeArray.push(secondNumberDivided);
            console.log("2ndNumber - LAST EVEN 1");
        }
        else {
            finalCodeArray.push(secondNumber);
            console.log("2ndNumber - LAST EVEN 2");
        }
    }

    else {
        secondNumber = parseInt(finalCodeArray[0]) - 1 + secondNumber;
        secondNumberDivided = Array.from(String(secondNumber), Number);

        if (secondNumberDivided.length > 1) {
            secondNumberDivided = secondNumberDivided[1];
            finalCodeArray.push(secondNumberDivided);
            console.log("2ndNumber - ELSE 1");
        }
        else {
            finalCodeArray.push(secondNumber);
            console.log("2ndNumber - ELSE 2");
        }
    }

}

// FMN GET ALL THE OTHER NUMBERS

function fmnAllOtherNumbers() {

    let largestSerialDigit = Math.max(...serialNumberNumbers);
    let serialOddDigits = serialNumberNumbers.filter(n => n % 2);
    let smallestSerialOddDigit = Math.min(...serialOddDigits);
    let lastTwoEvenOne = finalCodeArray[finalCodeArray.length - 1];
    let lastTwoEvenTwo = finalCodeArray[finalCodeArray.length - 2];
    allOtherNumbers = stageNumbers[stageNumbers.length - 1];

    if (finalCodeArray[finalCodeArray.length - 1] === 0 || finalCodeArray[finalCodeArray.length - 2] === 0) {
        allOtherNumbers = parseInt(allOtherNumbers) + largestSerialDigit;
        allOtherNumbersDivided = Array.from(String(allOtherNumbers), Number);

        if (allOtherNumbersDivided.length > 1) {
            allOtherNumbersDivided = allOtherNumbersDivided[1];
            finalCodeArray.push(allOtherNumbersDivided);
            console.log("OtherNumbers - LAST ZEROS 1");
        }
        else {
            finalCodeArray.push(allOtherNumbers);
            console.log("OtherNumbers - LAST ZEROS 2");
        }

    }

    else if (lastTwoEvenOne % 2 === 0 && lastTwoEvenTwo % 2 === 0) {

        if (serialOddDigits.length > 0) {
            allOtherNumbers = parseInt(allOtherNumbers) + smallestSerialOddDigit;
            allOtherNumbersDivided = Array.from(String(allOtherNumbers), Number);

            if (allOtherNumbersDivided.length > 1) {
                allOtherNumbersDivided = allOtherNumbersDivided[1];
                finalCodeArray.push(allOtherNumbersDivided);
                console.log("OtherNumbers - LAST EVEN 1");
            }
            else {
                finalCodeArray.push(allOtherNumbers);
                console.log("OtherNumbers - LAST EVEN 2");
            }

        }

        else {
            allOtherNumbers = parseInt(allOtherNumbers) + 9;
            allOtherNumbersDivided = Array.from(String(allOtherNumbers), Number);

            if (allOtherNumbersDivided.length > 1) {
                allOtherNumbersDivided = allOtherNumbersDivided[1];
                finalCodeArray.push(allOtherNumbersDivided);
                console.log("OtherNumbers - LAST IS A 9 - 1");
            }
            else {
                finalCodeArray.push(allOtherNumbers);
                console.log("OtherNumbers - LAST IS A 9 - 2");
            }

        }
    }

    else {
        let lastSum = lastTwoEvenOne + lastTwoEvenTwo;
        allOtherNumbersDivided = Array.from(String(lastSum), Number);

        if (allOtherNumbersDivided.length > 1) {
            allOtherNumbersDivided = allOtherNumbersDivided[0];
            allOtherNumbers = allOtherNumbers + allOtherNumbersDivided;
            allOtherNumbersDivided = Array.from(String(allOtherNumbers), Number);

            if (allOtherNumbersDivided.length > 1) {
                allOtherNumbersDivided = allOtherNumbersDivided[1];
                finalCodeArray.push(allOtherNumbersDivided);
                console.log("OtherNumbers - ELSE_ONE 1");
            }
            else {
                finalCodeArray.push(allOtherNumbersDivided);
                console.log("OtherNumbers - ELSE_ONE 2");
            }

        }

        else {
            allOtherNumbers = parseInt(allOtherNumbers) + parseInt(allOtherNumbersDivided);
            allOtherNumbersDivided = Array.from(String(allOtherNumbers), Number);

            if (allOtherNumbersDivided.length > 1) {
                allOtherNumbersDivided = allOtherNumbersDivided[1];
                finalCodeArray.push(allOtherNumbersDivided);
                console.log("OtherNumbers - ELSE_TWO 1");
            }
            else {
                finalCodeArray.push(allOtherNumbers);
                console.log("OtherNumbers - ELSE_TWO 2");
            }

        }

    }

}

// FMN FINAL CODE COPY TO PAGE *****************************

function finalCode() {

    LASTFMNCODE.value = finalCodeArray;
    let finalCodeArrayNoComas = LASTFMNCODE.value;
    finalCodeArrayNoComas = finalCodeArrayNoComas.replace(/,/g, "-");
    LASTFMNCODE.value = finalCodeArrayNoComas;

}

// PORTS ADD OR REMOVE ***************************************************************************

ADDPLATE.addEventListener("click", function (e) {

    ports = NewPlateDiv.cloneNode(true);
    plateDivId += 1;
    ports.style.display = "grid";
    ports.setAttribute('id', "ports " + plateDivId);
    NewPlateDiv.after(ports);
    e.preventDefault();
    console.log(ports)

}
);

REMOVEPLATE.addEventListener("click", function (e) {

    document.getElementById("ports " + plateDivId).remove();
    plateDivId = plateDivId - 1;
    e.preventDefault();

})