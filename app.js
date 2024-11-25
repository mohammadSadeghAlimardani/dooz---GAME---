//get elements :
const alert = document.querySelector(".alert");
const chooseSign = document.querySelector(".chooseSign");
const form = document.querySelector("form");
const startButton = document.querySelector("#start-btn");
const radioInputs = [...document.querySelectorAll("input")];
let sign; 

//submit form :
form.addEventListener("submit", submitForm);
function submitForm(event){
    event.preventDefault();
    //if user does not select any input
    const no__Input__Selected = radioInputs.every(radioInput => radioInput.checked == false);
    if(no__Input__Selected){
        alert.classList.add("show");
        setTimeout(() => {
            alert.classList.remove("show");
        }, 3500);
        return;
    }
    chooseSign.classList.add("hide");


    //what is sign :
    const selectedInput = radioInputs.find(radioInput => radioInput.checked == true);
    if(selectedInput.id == "circle"){
        sign = "circle";
    }else if(selectedInput.id == "times"){
        sign = "times";  
    }
}


//click boxes
const boxes = [...document.querySelectorAll(".box")];
const boxArray = [];
let numberClickedBoxes = 0;

boxes.forEach((box, boxIndex) => {
    box.addEventListener("click", function(event){
        let soundEffect;
        numberClickedBoxes++;
        let icon;
        if(sign == "circle"){
            //play sound
            soundEffect = document.querySelector("audio.circle-fadeIn-music");
            soundEffect.play();
            //show icon
            icon = box.querySelector('i[class="fa-regular fa-circle"]');
            icon.classList.add("show");
            // push to array
            boxArray[boxIndex] = "circle";
        }else if(sign == "times"){
            //play sound
            soundEffect = document.querySelector("audio.times-fadeIn-music");
            soundEffect.play();
            //show icon
            icon = box.querySelector('i[class="fa-solid fa-times"]');
            icon.classList.add("show");
            //push to array
            boxArray[boxIndex] = "times";
        }
    
        //change sign to another one :
        if(sign == "circle"){
            sign = "times";
        }else{
            sign = "circle";
        }

        //check victory :
        const victoryConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        victoryConditions.forEach(condition => {
            let setBoxArray = [];
            for (const index of condition) {
                setBoxArray.push(boxArray[index]);
            }
            const CircleVictory = setBoxArray.every(index => index == "circle");
            const TimesVictory = setBoxArray.every(index => index == "times");

            if(CircleVictory || TimesVictory){
                const victoryMessage = document.querySelector(".victory-message");
                //who won ?
                CircleVictory 
                    ? 
                victoryMessage.querySelector("h2").textContent = "Circle WON"
                    :
                victoryMessage.querySelector("h2").textContent = "Times WON"
                //play sound
                const victoryMusic = document.querySelector("audio.victory-music");
                victoryMusic.play();
                //show victory message
                setTimeout(() => {
                    victoryMessage.classList.add("show");
                }, 250);
            }else if(numberClickedBoxes == 9){
                const equalMessage = document.querySelector(".equal-message");
                setTimeout(() => {
                    equalMessage.classList.add("show");
                }, 250);
                const equalMusic = document.querySelector("audio.equal-music");
                equalMusic.play();
            }
        })
    })
})