const body = document.body
const noteImg = document.querySelector(".noteImg")
const noteImgFs = document.querySelector('.displayFs')
const checkContainer = document.querySelector(".checkContainer")
const xIcon = document.querySelector('.fa-times')

const randButton = document.getElementById("random")
const trebleButton = document.querySelector('#Treble');
const bassButton = document.querySelector('#Bass');
const fsButton = document.querySelector('#fullscreen')

const images = [
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

const checkStatus = {
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
let currentSelection;

for (img in images) {
    let check = document.createElement('div')
    check.id = images[img]
    check.className = 'check'

    // Create Label
    let label = document.createElement('label')
    label.for = images[img]
    label.innerText = images[img]
    check.append(label)

    // Create Check
    let input = document.createElement('input')
    input.type = 'checkbox'
    input.id = images[img]
    input.name = images[img]
    input.className = 'checkbox'
    if (checkStatus[images[img]] == true) {
        input.checked = true
    } else {
        input.checked = false
    }
    check.append(input)


    checkContainer.append(check)
}

const checkBoxes = document.querySelectorAll(".checkbox")


// Add event listener to checkboxes
for (i = 0; i < checkBoxes.length; i++){
    checkBoxes[i].addEventListener('change', (e) => {
        for (let status in checkStatus){
            if (e.target.name == status){
                console.log(status)
                if (e.target.checked == true){
                    checkStatus[status] = true
                } else if (e.target.checked == false) {
                    checkStatus[status] = false
                }
            }
        }
        cStatus()
    })
}

//EVENT LISTENERS
body.addEventListener('keyup', (e) => {
    if (e.code == "Space") {
        noteImg.src = "bcimgs/" + images[setImg(currentSelection)] + "bc.png"
        noteImgFs.src = "bcimgs/" + images[setImg(currentSelection)] + "bc.png"
    }
})
//Button Listeners
randButton.addEventListener('click', () => {
    noteImg.src = "bcimgs/" + images[setImg(currentSelection)] + "bc.png"
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
    let selection = Math.floor(Math.random() * images.length)
    for (i = 0; i < 30000; i++) {
        if (checkStatus[images[selection]] == false || current == selection) {
            selection = Math.floor(Math.random() * images.length)
        } else {
            currentSelection = selection
            return selection
        }   
    }
}

const setActive = (button) => {
    if (button.className == 'controls inactive'){
        if(button.id == 'Treble'){
            trebleButton.className = 'controls active'
            bassButton.className = 'controls inactive'
        } else {
            trebleButton.className = 'controls inactive'
            bassButton.className = 'controls active'
        }
    }
}

const cStatus = () => {
    console.log(checkStatus)
}

//Fullscreen option for the image itself.