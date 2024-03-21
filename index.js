const body = document.getElementById('body');
const colorPicker = document.getElementById('color-picker');
const colorSchemePicker = document.getElementById('color-scheme-picker');
const getSchemeBtn = document.getElementById('get-scheme-btn');
const colorBars = document.getElementById('color-bars');
const darkModeSwitch = document.getElementById('dark-mode-switch');
const darkModeCheckbox = document.getElementById('dark-mode-checked');
const hexText = document.getElementsByClassName('hex-text');

// Button event listeners

getSchemeBtn.addEventListener('click', () => {
    const seedColor = colorPicker.value.slice(1);
    const colorScheme = colorSchemePicker.value;

    fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${colorScheme}&count=5`)
        .then(response => response.json())
        .then(data => {
            mapColorsToBars(data.colors)
        });
});

darkModeSwitch.addEventListener('click', () => {

    if (darkModeCheckbox.checked) {
        darkModeCheckbox.checked = false;
        body.classList.remove('dark-mode-background');
        colorSchemePicker.classList.remove('dark-mode-background', 'dark-mode-text');
        getSchemeBtn.classList.remove('dark-mode-btn');
        
        removeDarkModeTextFromHex();
    } else {
        darkModeCheckbox.checked = true;
        body.classList.add('dark-mode-background');
        colorSchemePicker.classList.add('dark-mode-background', 'dark-mode-text');
        getSchemeBtn.classList.add('dark-mode-btn');
        
        addDarkModeTextToHex();
    };
});

// Clicking on a color to copy hex

document.addEventListener('click', (e) => {
    if (e.target.dataset.color) {
        navigator.clipboard.writeText(e.target.dataset.color);

        console.log(`Copied hex ${e.target.dataset.color} to clipboard.`);
    };
});

function mapColorsToBars(colorsArr) {

    colorBars.innerHTML = ``;

    for (let color of colorsArr) {
        colorBars.innerHTML += `
            <div class="color-${colorsArr.indexOf(color)} color-bar-formatting" id="color-${colorsArr.indexOf(color)}" data-color="${color.hex.clean}"></div>
        `;

        document.getElementById(`color-${colorsArr.indexOf(color)}`).style.backgroundColor = `${color.hex.value}`;
    };

    for (let color of colorsArr) {
        colorBars.innerHTML += `
            <p class="color-${colorsArr.indexOf(color)}-hex hex-text" data-color="${color.hex.clean}">${color.hex.value}</p>
        `;
    };
};

// Hex color text doesn't update when done inside of a for loop for some reason. 

function addDarkModeTextToHex() {
    hexText[0].classList.add('dark-mode-text');
    hexText[1].classList.add('dark-mode-text');
    hexText[2].classList.add('dark-mode-text');
    hexText[3].classList.add('dark-mode-text');
    hexText[4].classList.add('dark-mode-text');
}

function removeDarkModeTextFromHex() {
    hexText[0].classList.remove('dark-mode-text');
    hexText[1].classList.remove('dark-mode-text');
    hexText[2].classList.remove('dark-mode-text');
    hexText[3].classList.remove('dark-mode-text');
    hexText[4].classList.remove('dark-mode-text');    
}

// function darkModeHexText() {

//     // for (let hex of hexText) {
//     //     if (hex.classList.contains('dark-mode-text')) {
//     //         hex.classList.remove('dark-mode-text');
//     //     } else {
//     //         hex.classList.add('dark-mode-text');
//     //         console.log(hex.classList)
//     //     };
//     // };
// };