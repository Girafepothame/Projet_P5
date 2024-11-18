// Fonction pour réinitialiser et nettoyer les éléments
function resetElement(element, defaultValue, settingKey) {
    if (element) {
        element.remove();
        element = null;
    }
    if (settings[settingKey] === null) {
        settings[settingKey] = defaultValue;
    }
    return element;
}

// Fonction pour initialiser les couleurs des éléments (vaisseau et canon)
function initColors() {
    colorPickerShip = resetElement(colorPickerShip, color(255, 255, 255), 'colorShip');
    colorPickerCannon = resetElement(colorPickerCannon, color(255, 255, 255), 'colorCannon');
    colorPickerShipDiv = resetElement(colorPickerShipDiv, null, 'colorShip');
    colorPickerCannonDiv = resetElement(colorPickerCannonDiv, null, 'colorCannon');
}

// Fonction principale pour gérer les réglages
function handleSettings() {
    settings.mode = 0;
    initColors();
    volumeSlider = resetElement(volumeSlider, 50, 'volumeSlider')
    assets.gameMusics = shuffle(assets.gameMusics);
}

// Fonction pour détecter si l'utilisateur est sur un appareil mobile
function handleNavigator() {
    const details = navigator.userAgent;
    const regexp = /android|iphone|kindle|ipad/i;
    mobile = regexp.test(details);
}

// Fonction pour configurer le canvas
function handleCanvas() {
    const container = document.getElementById('canvaGame');
    canvasC = createCanvas(container.offsetWidth, container.offsetHeight);
    canvasC.parent('canvaGame');

    gui = createGui();
    textFont(assets.font);
    backgroundGrid();
}

// Fonction pour dessiner la grille hexagonale
function backgroundGrid() {
    const hexRadius = 25;
    const hexWidth = sqrt(3) * hexRadius;
    const hexHeight = 2 * hexRadius;
    const cols = ceil(width / hexWidth);
    const rows = ceil(height / hexHeight);

    hexGrid = createGraphics(width, height);
    drawHexGrid(hexGrid, cols, rows, hexWidth, hexHeight, hexRadius);
}

// Fonction pour initialiser les joysticks
function handleJoysticks() {
    const joystickSize = min(width, height) / 5;  // 20% de la taille la plus petite de l'écran

    // Créer et configurer les deux joysticks
    j1 = createJoystick("Déplacement", width / 10, height - joystickSize - 20, joystickSize, joystickSize, -1, 1, 1, -1);
    j2 = createJoystick("Rotation", width - width / 10 - joystickSize, height - joystickSize - 20, joystickSize, joystickSize, -1, 1, 1, -1);

    // Appliquer les mêmes styles aux deux joysticks
    const joystickStyle = {
        strokeBg: color("#F7ECE1"),
        strokeBgHover: color("#F7ECE1"),
        strokeBgActive: color("#F7ECE1"),
        fillBg: color("#CAC4CE"),
        handleRadius: joystickSize / 2
    };

    j1.setStyle(joystickStyle);
    j2.setStyle(joystickStyle);
}



function drawHexGrid(pg, cols, rows, hexWidth, hexHeight, hexRadius) {
    pg.clear()
    for (let row = 0; row <= rows; row++) {
        for (let col = 0; col <= cols; col++) {
            let x = col * hexWidth
            let y = row * hexHeight

            if (col % 2 === 1) {
                y += hexHeight / 2
            }
            pg.push()
            drawHexagon(pg, x, y, hexRadius)
            pg.pop()
        }
    }
}

function drawHexagon(pg, x, y, radius) {
    pg.beginShape()
    pg.noStroke()
    pg.fill(50)

    for (let i = 0; i < 6; i++) {
        let angle = TWO_PI / 6 * i
        let xOffset = cos(angle) * radius
        let yOffset = sin(angle) * radius
        pg.vertex(x + xOffset, y + yOffset)
    }
    pg.endShape(pg.CLOSE)
}
