// selecting all reuired elements
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".options .playerX"),
selectOBtn = selectBox.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),

resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
replyBtn = resultBox.querySelector("button");


window.onload = ()=>{ //once window loaded
    //make sure all the boxes in the board are clickable
    for(let i = 0; i < allBox.length; i++) { //add onclick attribute in all available section's spans
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }


    selectXBtn.onclick = ()=>{
        selectBox.classList.add("hide"); // hide the select box on playerX button clicked.
        playBoard.classList.add("show"); //show the board section on playerX btton clicked.
    }
    selectOBtn.onclick = ()=>{
        selectBox.classList.add("hide"); // hide the select box on playerO button clicked.
        playBoard.classList.add("show"); //show the board section on playerO btton clicked.
        players.setAttribute("class", "players active player") // added three class names in player element
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X"; //suppose player will be X.
let runBot = true;

// user click function
function clickedBox(element){
    // console.log(element);
    if(players.classList.contains("player")){ // if players element has contains .player
        playerSign = "O"// if player will be O then we'll change the sign
        element.innerHTML = `<i class="${playerOIcon}"></i>`; // adding circle icon tag inside user clicked element
        players.classList.add("active");
        // if player select O then we'll change the playerSign value to O
        playerSign = "O";
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`; // adding cross icon tag inside user clicked element
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); // calling the winner function
    playBoard.style.pointerEvents = "none"; // once select then user can't select any other box untill box select.
    element.style.pointerEvents - "none"; //once user select any box then that box can't be selected again.
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); // generating random time delay sp bat will delay randomly to select box
    setTimeout(()=>{
        bot(runBot); // calling bot function
    }, randomDelayTime); // passing time delat time
   
}

// bot click function
function bot(runBot){
    if(runBot){ // if runBot is true then run the following codes
        //first change the playerSign...so if user has X value in id then bot will have O
    playerSign = "O";
    let array = []; //creating empty array...we'll store unselected box index in this array
    for (let i = 0; i < allBox.length; i++) {
        if(allBox[i].childElementCount == 0){ // if span has no any child element
            array.push(i); // inserting unclicked or unselected boxes inside array means that span has no children
            // console.log(i + " " + "has no children");
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; // getting random index from array so bot will select random unselected box.
    if(array.length > 0){
    // allBox[randomBox].innerHTML = 
        if(players.classList.contains("player")){ // if players element has contains .player
           allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; // adding cross icon tag inside user clicked element
           players.classList.remove("active");
           // if user is O then the box id value will be X
           playerSign = "X";
           allBox[randomBox].setAttribute("id", playerSign);
        }else{
           allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; // adding circle icon tag inside user clicked element
           players.classList.remove("active");
           allBox[randomBox].setAttribute("id", playerSign);
        }
        selectWinner(); // calling the winner function 
    }
    allBox[randomBox].style.pointerEvents = "none"; // once bot select any box then user can't select or click on that box
    playBoard.style.pointerEvents = "auto";
    playerSign = "X"; //passing the X value 
    }
}

// let work on select the winner
function getClass(idname){
    return document.querySelector(".box" + idname).id; // returning id name
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}
function selectWinner(){ // if one combination of them matched then select the winner
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)){
        console.log(playerSign + " " + "is the winner");
        // once match won by someone then it should stop the bot
        runBot = false;
        bot(runBot);
        setTimeout(()=>{ //we'll delay to show result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);  //700 ms delay

        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }else{
        // if match has drawn
        // first we'll check all id...if all span has no won the game then we'll draw the game
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8)){
            runBot = false;
        bot(runBot);
        setTimeout(()=>{ //we'll delay to show result box
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);  //700 ms delay

        wonText.textContent = `Match has been drawn!`;
        }
    }
}

replyBtn.onclick = ()=>{
    window.location.reload(); // reload the current page
}