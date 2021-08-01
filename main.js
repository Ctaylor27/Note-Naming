const body = document.body
const noteImg = document.querySelector(".noteImg")
const noteImgFs = document.querySelector('.displayFs')
const checkContainer = document.querySelector(".checkContainer")
const xIcon = document.querySelector('.fa-times')

const randButton = document.getElementById("random")
const trebleButton = document.querySelector('#Treble');
const bassButton = document.querySelector('#Bass');
const fsButton = document.querySelector('#fullscreen')
const checkBoxes = document.querySelectorAll(".checkbox")

let mode = "bc";

const bcimages = [
    "G2",
    "A2",
    "B2",
    "C3",
    "D3",
    "E3",
    "F3",
    "G3",
    "A3",
    "B3",
    "C4"
]
const tcimages = [
    "C4",
    "D4",
    "E4",
    "F4",
    "G4",
    "A4",
    "B4",
    "C5",
    "D5",
    "E5",
    "F5"
]

const bccheckStatus = {
    "A2" : false,
    "A3" : false,
    "B2" : true,
    "B3" : false,
    "C3" : true,
    "C4" : false,
    "D3" : true,
    "E3" : true,
    "F3" : false,
    "G2" : false,
    "G3" : false
 }
const tccheckStatus = {
    "C4" : true,
    "D4" : true,
    "E4" : true,
    "F4" : true,
    "G4" : false,
    "A4" : false,
    "B4" : false,
    "C5" : false,
    "D5" : false,
    "E5" : false,
    "F5" : false
}

let currentSelection;

// Add event listener to checkboxes
for (i = 0; i < checkBoxes.length; i++){
    checkBoxes[i].addEventListener('change', (e) => {
        for (let status in bccheckStatus){
            if (e.target.name == status){
                console.log(status)
                if (e.target.checked == true){
                    bccheckStatus[status] = true
                } else if (e.target.checked == false) {
                    bccheckStatus[status] = false
                }
            }
        }
        cStatus()
    })
}

//EVENT LISTENERS
body.addEventListener('keyup', (e) => {
    if (e.code == "Space") {
        if (mode == "bc"){
            noteImg.src = "imgs/" + mode + "imgs/" + bcimages[setImg(currentSelection)] + mode + ".png"
            noteImgFs.src = "imgs/" + mode + "imgs/" + bcimages[setImg(currentSelection)] + mode + ".png"
        } else if (mode == "tc") {
            noteImg.src = "imgs/" + mode + "imgs/" + tcimages[setImg(currentSelection)] + mode + ".png"
            noteImgFs.src = "imgs/" + mode + "imgs/" + tcimages[setImg(currentSelection)] + mode + ".png"
        }     
    }
})
//Button Listeners
randButton.addEventListener('click', () => {
    noteImg.src = "imgs/" + mode + "imgs" + images[setImg(currentSelection)] + mode + ".png"
})

trebleButton.addEventListener('click', (e) => {
    setActive(e.target)
})
bassButton.addEventListener('click', (e) => {
    setActive(e.target)
})
fsButton.addEventListener('click', () => {
    noteImgFs.classList.remove('deactivate')
    xIcon.classList.remove('deactivate')
})
xIcon.addEventListener('click', () => {
    noteImgFs.classList.add('deactivate')
    xIcon.classList.add('deactivate')
})

// Sets img source 
const setImg = (current) => {
    let selection = Math.floor(Math.random() * bcimages.length)
    if (mode == 'bc') {
        for (i = 0; i < 30000; i++) {
            if (bccheckStatus[bcimages[selection]] == false || current == selection) {
                selection = Math.floor(Math.random() * bcimages.length)
            } else {
                currentSelection = selection
                return selection
            }   
        }
    } else if (mode == "tc") {
        for (i = 0; i < 30000; i++) {
            if (tccheckStatus[tcimages[selection]] == false || current == selection) {
                selection = Math.floor(Math.random() * tcimages.length)
            } else {
                currentSelection = selection
                return selection
            }   
        }
    }
}

const setActive = (button) => {
    if (button.className == 'controls inactive'){
        if(button.id == 'Treble'){
            trebleButton.className = 'controls active'
            bassButton.className = 'controls inactive'
            mode = 'tc'
            drawChecks()
        } else {
            trebleButton.className = 'controls inactive'
            bassButton.className = 'controls active'
            mode = 'bc'
            drawChecks()
        }
    }
    console.log(mode)
}

const cStatus = () => {
    console.log(bccheckStatus)
}

const drawChecks = () => {
    checkContainer.innerHTML = ""
    for (img in bcimages) {
        if (mode == "bc"){
            let check = document.createElement('div')
            check.id = bcimages[img]
            check.className = 'check'
    
            // Create Label
            let label = document.createElement('label')
            label.for = bcimages[img]
            label.innerText = bcimages[img]
            check.append(label)
    
            // Create Check
            let input = document.createElement('input')
            input.type = 'checkbox'
            input.id = bcimages[img]
            input.name = bcimages[img]
            input.className = 'checkbox'
            if (bccheckStatus[bcimages[img]] == true) {
                input.checked = true
            } else {
                input.checked = false
            }
            check.append(input)
            checkContainer.append(check)
        } else if (mode == "tc") {
            let check = document.createElement('div')
            check.id = tcimages[img]
            check.className = 'check'
    
            // Create Label
            let label = document.createElement('label')
            label.for = tcimages[img]
            label.innerText = tcimages[img]
            check.append(label)
    
            // Create Check
            let input = document.createElement('input')
            input.type = 'checkbox'
            input.id = tcimages[img]
            input.name = tcimages[img]
            input.className = 'checkbox'
            if (tccheckStatus[tcimages[img]] == true) {
                input.checked = true
            } else {
                input.checked = false
            }
            check.append(input)
            checkContainer.append(check)
        }
    }
}
//Fullscreen option for the image itself.

drawChecks()