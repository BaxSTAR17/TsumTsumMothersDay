let mouseDown = false;
let lastRow = 5
let columnAmount = 6
let randrota
let column0Value = []
let column1Value = []
let column2Value = []
let column3Value = []
let column4Value = []
let column5Value = []
let column6Value = []
let column7Value = []
let column8Value = []
let column9Value = []
let currentPowerup = 0
let backseatPowerup = 1
let scorist = 0;
let numOfMomSelected = []
let randMom0 = []
let randMom1 = []
let randMom2 = []
let randMom3 = []
let randMom4 = []
let randMom5 = []
let randMom6 = []
let randMom7 = []
let randMom8 = []
let randMom9 = []
let popCounter2 = 0
let randMomSelect = [randMom0, randMom1, randMom2, randMom3, randMom4, randMom5, randMom6, randMom7, randMom8, randMom9];
let currentColumn = [column0Value, column1Value, column2Value, column3Value, column4Value, column5Value, column6Value, column7Value, column8Value, column9Value]
let numOfMom = []
let init = 0;
let grpinit = 0;
let momFinref
let posBot
let posLef
let playState = 0;
let rotatorT
let rotatorM
let currentColArray1
let currentColArray
let currentRandMom
let currentColArray2
let currentColArray0
let currentRandMom1
let currentRandMom2
let popCounter = 0;
let numOfMomUnselect = []
let powerupBatt = 100
let lastMomSelected
// power on/going, pieceofpower on/going
let pog;
let ppog;
let currentColArray3
//centerofgravity && crustcenterofgravity
let cog = 0
let ccog = 0
//const
const bgMusic = new Audio("capricorntalks.ogg")
const field = document.querySelector('.playspace')
const scorer = document.querySelector('.score')
const pauser = document.querySelector('.pause')
const timist = document.querySelector('.timer')
const powerist = document.querySelector('.powerup')
const backuppowerist = document.querySelector('.powerupselector')
const teddyFX = new Audio("teddy.mp3")
const miraFX = new Audio("miradel.mp3")
const matchFX = new Audio("MATCH.mp3")
const powerFX = new Audio("POWERUP.mp3")

bgMusic.play()

field.addEventListener("mousedown", mousePress)
field.addEventListener("mouseup", mouseReleased)
pauser.addEventListener("click", pausingMoments)
powerist.addEventListener("click", activatePowerup)
backuppowerist.addEventListener("click", powerupSwitch)

InitializeGame();
timist.textContent = `${powerupBatt}%`

function InitializeGame() {
    if (grpinit < 10) {
        InitializeTsumTsum()
        grpinit++
        init = 0
        setTimeout(InitializeGame, 100)
    }
}

function mousePress() {
    mouseDown = true
}

function mouseReleased() {
    mouseDown = false
}

function InitializeTsumTsum () {
    while (init < columnAmount ) {
        //tsumtsum settings 
        currentColumn[grpinit].push(document.createElement('button'))
        currentColArray = currentColumn[grpinit]
        currentColArray[init].classList.add(`${grpinit}`)
        currentColArray[init].id = `${init}`
        currentColArray[init].addEventListener("mousemove", startMatching)
        field.appendChild(currentColArray[init])
        //tsumtsumstyle
        currentColArray[init].style.width = "45px"
        currentColArray[init].style.height = "45px"
        currentColArray[init].style.position = "absolute"
        posBot = 45 * init
        posLef = 45 * grpinit
        currentColArray[init].style.bottom = `${posBot}px`
        currentColArray[init].style.left = `${posLef}px`
        randrota = Math.floor(Math.random() * 360)
        currentColArray[init].style.transform = `rotate(${randrota}deg)`
        currentRandMom = randMomSelect[grpinit]
        momFinref = Math.floor(Math.random()*4)
        currentRandMom.push(momFinref)
        currentColArray[init].style.background = `url(${pickARandomMom()})`
        currentColArray[init].style.border = "solid"
        currentColArray[init].style.borderColor = `${pickARandomColor()}`
        currentColArray[init].style.backgroundColor = `${pickARandomColor()}`
        currentColArray[init].style.borderRadius = "20px"
        currentColArray[init].style.color = "rgba(0, 0, 0, 0)"
        currentColArray[init].textContent = `${pickARandomColor()}`
        //adds initor
        init++
    } 
}

function startMatching (a) {
    if ((mouseDown == true) && (playState == 0)) {
        a.target.style.opacity = "0.5"
        a.target.removeEventListener("mousemove", startMatching)
        numOfMom.push(a.target)
        numOfMomSelected.push(a.target)
        playState++
        currentRandMom = randMomSelect[a.target.className]
        momFinref = a.target.textContent//currentRandMom[currentColumn[a.target.className].indexOf(a.target)]
        a.target.addEventListener("mouseup", removeMatching)
        lastMomSelected = a.target
    }
    else if ((mouseDown == true) && (currentRandMom = randMomSelect[a.target.className]) && (playState == 1) && (a.target.textContent == momFinref)) {
        a.target.removeEventListener("mousemove", startMatching)
        a.target.style.opacity = "0.5"
        lastMomSelected.removeEventListener("mouseup", removeMatching)
        numOfMom.push(a.target)
        numOfMomSelected.push(a.target)
        a.target.addEventListener("mouseup", startPopping)
    }
}

//difficulty function instead of pause
function pausingMoments () {
    if (numOfMom.length < 1) {
        grpinit = 0
        columnAmount++
        lastRow++
        InitializeGame()
    }
}

function pickARandomMom(){
    switch (momFinref) {
        case 0:
            return "mom0.png"
        case 1:
            return "mom1.png"
        case 2:
            return "mom2.png"
        case 3:
            return "mom4.png"
    }
}

function pickARandomColor(){
    switch (momFinref) {
        case 0:
            return "white"
        case 1:
            return "lightgreen"
        case 2:
            return "lightblue"
        case 3:
            return "lightpink"
    }
}

function removeMatching(b) {
    b.target.style.opacity = "1"
    numOfMom.splice(0, 1)
    playState = 0
    lastMomSelected = 0;
    b.target.addEventListener("mousemove", startMatching)
}

function startPopping() {
   playState = 0
   matchFX.play()
   popCounter = 0
   popCounter2 = 0
   cog = 0
   scorist += 40 * numOfMom.length
   scorer.textContent = `. Score:${scorist}`
   checkWin()
   if (powerupBatt < 100) {
        powerupBatt += 10;
        timist.textContent = `${powerupBatt}%`
   }
   while (popCounter < numOfMomSelected.length) {
        cog = 0
        numOfMomSelected[popCounter].style.opacity = "0"
        currentColArray1 = currentColumn[numOfMomSelected[popCounter].className]
        currentColArray1.splice(currentColArray1.indexOf(numOfMomSelected[popCounter]), 1)
        currentRandMom1 = randMomSelect[numOfMomSelected[popCounter].className]
        currentRandMom1.splice(currentColArray1.indexOf(numOfMomSelected[popCounter]), 1)
        popCounter++
   }
   gravityCheck()
   numOfMomSelected.splice(0, numOfMomSelected.length)
}

function activatePowerup() {
    powerFX.play()
    switch (currentPowerup) {
        case 0:
            animateTeddy()
            teddypowerup()
            powerupBatt = 0
            timist.textContent = `${powerupBatt}%`
        case 1:
            animateMira()
            mirapowerup()
            powerupBatt = 0
            timist.textContent = `${powerupBatt}%`
    }
}

function powerupSwitch() {
    if (currentPowerup < 1) {
        powerist.style.backgroundImage = "url(mira.png)"
        backuppowerist.style.backgroundImage = "url(littleteddy.png)"
        currentPowerup++
        backseatPowerup--
    }
    else if (currentPowerup == 1) {
        powerist.style.backgroundImage = "url(teddy.png)"
        backuppowerist.style.backgroundImage = "url(littlemira.png)"
        currentPowerup--
        backseatPowerup++
    }
}

function checkWin() {
    if (numOfMom.length > ((columnAmount * 10) - 1)) {
        scorer.textContent = `.YOU WIN! SCORE: ${scorist}`
        currentRandMom2 = document.createElement('div')
        field.appendChild(currentRandMom2)
        currentRandMom2.style.width = "450px"
        currentRandMom2.style.height = "250px"
        currentRandMom2.style.position = "absolute"
        currentRandMom2.style.bottom = "100px"
        currentRandMom2.style.left = "0px"
        currentRandMom2.style.borderRadius = "60px"
        currentRandMom2.style.border = "solid"
        currentRandMom2.style.backgroundColor = "orange"
        currentRandMom2.style.borderColor = "white"
        currentRandMom2.style.color = "white"
        currentRandMom2.style.fontSize = "40px"
        currentRandMom2.style.textAlign = "center"
        currentRandMom2.textContent = "HAPPY MOTHER'S DAY!! THANK YOU FOR EVERYTHING, MOMMY!! <3"
    }
}

function animateTeddy() {
    if (powerupBatt > 99) {
        rotatorT = 0
        let teddyface = document.querySelector('.teddyface')
        console.log(teddyface)
        field.appendChild(teddyface)
        //style
        teddyface.style.width = "120px"
        teddyface.style.height = "120px"
        teddyface.style.position = "absolute"
        teddyface.style.background = "url(bigteddy.png)"
        teddyface.style.bottom = "80px"
        teddyface.style.left = "170px"
        teddyface.style.transition = "opacity 1s"
        teddyface.style.opacity = "2"
        setTimeout(removeTeddy(teddyface), 100)
    }
}

function fadeTeddy(teddyface) {
    teddyface.style.transition = "opacity 1s"
    teddyface.style.opacity = "0"
}

function animateMira() {
    if (powerupBatt > 99) {
        rotatorM = 0
        let miraface = document.createElement('div')
        field.appendChild(miraface)
        //style
        miraface.style.width = "120px"
        miraface.style.height = "120px"
        miraface.style.position = "absolute"
        miraface.style.background = "url(bigmira.png)"
        miraface.style.bottom = "45px"
        miraface.style.left = "90px"
        miraface.style.borderRadius = "50px"
        upMira(miraface)
        setTimeout(removeMira, 100)
    }
}

function upMira(miraface) {
    miraface.style.transition = "bottom 1s"
    miraface.style.transition = "left 1s"
    miraface.style.bottom = "270px"
    miraface.style.left = "170px"
}

function fadeMira(miraface) {
    miraface.style.transition = "opacity 1s"
    miraface.style.opacity = "0"
}

function teddypowerup() {
    pog = 3;
    ppog = 1;
    teddyFX.play()
    if (powerupBatt > 99) {
        while (pog < 7) {
            currentColArray3 = currentColumn[pog]
            while (ppog < lastRow) {
                currentColArray3[ppog].removeEventListener("mousemove", startMatching)
                currentColArray3[ppog].style.opacity = "0"
                numOfMom.push(currentColArray3[ppog])
                checkWin()
                gravityCheck()
                ppog++
            }
            pog++
            ppog = 1;
        }
    }
}

function mirapowerup() {
    pog = 0
    ppog = 0
    miraFX.play()
    if (powerupBatt > 99) {
        currentColArray2 = currentColumn[0]
        currentColArray3 = currentColumn[9]
        while (ppog < columnAmount) {
            currentColArray3[ppog].removeEventListener("mousemove", startMatching)
            currentColArray3[ppog].style.opacity = "0"
            numOfMom.push(currentColArray3[ppog])
            currentColArray2[ppog].removeEventListener("mousemove", startMatching)
            currentColArray2[ppog].style.opacity = "0"
            numOfMom.push(currentColArray2[ppog])
            checkWin()
            ppog++
        }
        pog = 1
        while (pog < 10) {
            currentColArray3 = currentColumn[pog]
            currentColArray3[0].removeEventListener("mousemove", startMatching)
            currentColArray3[0].style.opacity = "0"
            numOfMom.push(currentColArray3[0])
            currentColArray3[lastRow].removeEventListener("mousemove", startMatching)
            currentColArray3[lastRow].style.opacity = "0"
            numOfMom.push(currentColArray3[lastRow])
            checkWin()
            pog++
        }
    }
}

function removeTeddy(teddyface) {
    if (rotatorT < 360) {
        teddyface.style.rotate = `${rotatorT}deg`
        rotatorT++
        setTimeout(removeTeddy, 1)
    }
}

function removeMira(miraface) {
    if (rotatorM < 360) {
        miraface.style.rotate = `${rotatorM}deg`
        rotatorM++
        setTimeout(removeMira, 1)
    }

}

function gravityCheck() {
    cog = 0
    ccog = 0
    while (cog < 10) {
        currentColArray0 = currentColumn[cog]
        console.log(currentColArray0)
        ccog = 0
        while (ccog < currentColArray0.length) {
            posBot = 45 * ccog
            currentColArray0[ccog].style.bottom = `${posBot}px`
            ccog++
        }
        cog++
    }
}
