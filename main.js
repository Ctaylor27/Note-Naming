const app = () => {
    const body = document.body
const noteImg = document.querySelector(".noteImg")
const noteImgFs = document.querySelector('.displayFs')
const checkContainer = document.querySelector(".checkContainer")
const xIcon = document.querySelector('.fa-times')

const randButton = document.getElementById("random")
const trebleButton = document.querySelector('#Treble');
const bassButton = document.querySelector('#Bass');
const fsButton = document.querySelector('#fullscreen')


let currentSelection = 1;
let mode = "bc";

const images = {
    "bc": {
        "G2": false,
        "A2": false,
        "B2": false,
        "C3": true,
        "D3": true,
        "E3": true,
        "F3": false,
        "G3": false,
        "A3": false,
        "B3": false,
        "C4": false
    },
    'tc': {
        "C4": true,
        "D4": true,
        "E4": true,
        "F4": false,
        "G4": false,
        "A4": false,
        "B4": false,
        "C5": false,
        "D5": false,
        "E5": false,
        "F5": false
    }
}

let keys = Object.keys(images[mode])
// Sets img source 
const setImg = (current) => {
    let selection = Math.floor(Math.random() * keys.length)
    if (current != selection && images[mode][keys[selection]]) {
        currentSelection = selection
        return selection
    } else {
        return setImg(current)
    }
    
}

const updateImg = () => {
    let selection = setImg(currentSelection)
    noteImg.src = "imgs/" + mode + "imgs/" + keys[selection] + mode + ".png"
    noteImgFs.src = "imgs/" + mode + "imgs/" + keys[selection] + mode + ".png"
    document.querySelector('h3').innerText = keys[selection].split('')[0]
}

const checkBoxesEvent = (mode) => {
    for (i = 0; i < checkBoxes.length; i++){
        checkBoxes[i].addEventListener('change', (e) => {
            if (images[mode][e.target.name]){
                images[mode][e.target.name] = false
            } else if (!images[mode][e.target.name]){
                images[mode][e.target.name] = true
            }
        })
    }
}

const setActive = (button) => {
    if (button.className == 'controls inactive'){
        if(button.id == 'Treble'){
            trebleButton.className = 'controls active'
            bassButton.className = 'controls inactive'
            mode = 'tc'
            checkBoxes = drawChecks()
            checkBoxesEvent(mode)
        } else {
            trebleButton.className = 'controls inactive'
            bassButton.className = 'controls active'
            mode = 'bc'
            checkBoxes = drawChecks()
            checkBoxesEvent(mode)
        }
        updateImg()
    }
}

const cStatus = () => {
    console.log(images[mode])
}

const drawChecks = () => {
    keys = Object.keys(images[mode])
    checkContainer.innerHTML = ""
    for (img in keys) {
        let check = document.createElement('div')
        check.id = keys[img]
        check.className = 'check'

        // Create Label
        let label = document.createElement('label')
        label.for = keys[img]
        label.innerText = keys[img]
        check.append(label)

        // Create Check
        let input = document.createElement('input')
        input.type = 'checkbox'
        input.id = keys[img]
        input.name = keys[img]
        input.className = 'checkbox'
        if (images[mode][keys[img]]) {
            input.checked = true
        } else {
            input.checked = false
        }
        check.append(input)
        checkContainer.append(check)
    }
    return document.querySelectorAll('.checkbox')
}
let checkBoxes = drawChecks()


// Add event listener to checkboxes


checkBoxesEvent(mode)

//Fullscreen option for the image itself.

//EVENT LISTENERS
body.addEventListener('keyup', e => {
    if (e.code == "Space") {
        updateImg()
    }
})

//Button Listeners
randButton.addEventListener('click', () => {
    updateImg()
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
}

app()