// the main variable 
let controlBox = document.querySelector('.control-box'),
    btnStar = document.querySelector('#star'),
    theInput = document.querySelector('#input'),
    username = document.querySelector('#username'),
    spanCheck = document.querySelector('#check'),
    succes = document.querySelector('#true'),
    field = document.querySelector('#false'),
    endGameCongat = document.querySelector('#next'),
    endGameRetry = document.querySelector('#retry'),
    starMusic = document.querySelector('#starAudio'),
    bloxkGame = document.querySelector('.block-game'),
    blocksContainer = document.querySelector('.box-game'),
    duration = 1000,
    tries = 0;

let blocks = Array.from(blocksContainer.children);

window.onload = () => {
    theInput.focus();
}

// add your name and star game
btnStar.addEventListener('click', () => {
    let theString = theInput.value;

    if (theString === "" && theString === null) {
        username.innerHTML = "مجهول";
    } else {
        username.innerHTML = theInput.value;
    }

    controlBox.style.display = "none";
    starMusic.play();



});





// create range of empty array of keys

let orderRange = [...Array(blocks.length).keys()];
shaffle(orderRange);


// function shaffle 
function shaffle(array) {
    let random,
        temp,
        current = array.length;
    while(current > 0) {
        random = Math.floor(Math.random() * blocks.length);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}

// open block game
blocks.forEach((block, index) => {
    let random = Math.floor(Math.random(orderRange.length));
    block.style.order = orderRange[index];
    block.addEventListener('click', () => {
        flipBlockFun(block);
    });
});


// flip block fonction 
function flipBlockFun(blockSelected) {
    blockSelected.classList.add('flip');
    // collected all flipped cards
    let allFlipBlocks = blocks.filter(flipBlock => flipBlock.classList.contains('flip'));


    // if thers two block selected 
    if (allFlipBlocks.length === 2) {
        stopClick();
        blockMatch(allFlipBlocks[0], allFlipBlocks[1]);
    }
}

// function stop clicking 
function stopClick() {
    blocksContainer.classList.add('no-clicking');
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

// check block match 
function blockMatch(firstBlock, secondBlock) {
    if (firstBlock.dataset.img === secondBlock.dataset.img) {

        firstBlock.classList.remove('flip');
        secondBlock.classList.remove('flip');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
        succes.play();

    } else {
        let theTries = document.querySelector('#tries');
        let myTries = tries += 1;
        theTries.innerHTML = myTries;
        setTimeout(() => {
            firstBlock.classList.remove('flip');
            secondBlock.classList.remove('flip');
        }, duration);
        field.play();
    }
    let cardNotMatch = document.querySelectorAll('.block-game:not(.has-match)');
    if (cardNotMatch.length === 0) {
        setTimeout(() => {
            if(cardNotMatch.length === 0) {
                if (tries <= 10) {
                    let nubTries = document.querySelector('.final-game #numeber-tries');
                    nubTries.innerHTML = tries;
                    document.querySelector('.final-game').style.display = "flex";
                    starMusic.remove();
                    endGameCongat.play();
                    let playGameAgain = document.querySelector('.final-game #play-again');
                    playGameAgain.addEventListener('click', () => {
                        setTimeout(() => {
                            location.href = "/game/index.html";
                        }, 1000);
                    });
                } else {
                    document.querySelector('.game-over').style.display = "flex";
                    starMusic.pause();
                    endGameRetry.play();
                    clearInterval(countDow);
                    let nubTries = document.querySelector('.game-over #numeber-tries');
                    nubTries.innerHTML = tries;
                    let playAgain = document.querySelector('.game-over #play-again');
                    playAgain.addEventListener('click', () => {
                        repaetGame();
                        document.querySelector('.game-over').style.display = "none";
                    });
                }

            }
        }, 1000);
        
    }
}

function repaetGame() {
    document.querySelectorAll('.block-game').forEach(block => {
        document.querySelector('#tries').innerHTML  = 0;
        tries = 0;
        this.location.reload();
    });
}



// ====== timer =====
let divOftimer = document.getElementById('timer'),
secound = 60,
countDow = setInterval(() => {
    secoundPass();
}, 1000);

function secoundPass() {
    let min = Math.floor(secound / 60);
    let sec = secound % 60;
    divOftimer.innerHTML = min + ":" + sec;;

    if (secound > 0) {
        secound = secound - 1;
    } else {
        clearInterval(countDow);
        document.querySelector('.game-over-timer').style.display = "flex";
        starMusic.pause();
        endGameRetry.play();
        let retry = document.querySelector('#play-again-timer');
        retry.addEventListener('click', () => {
            document.querySelector('.game-over-timer').style.display = "none";
            this.location.reload();
        });
    }

}
// ====== timer =====