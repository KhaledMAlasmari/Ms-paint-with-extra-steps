const canvas = document.getElementById("grid-wrapper");
let isDrawing = false;
let eraserClicked = false;
let eraserMouseClicked = false;

let checkIfMouseIsClicked = (item) => {
    item.addEventListener('mousedown', () => {
        if (eraserClicked) {
            item.style.cssText = "background-color = #000000; transition: background-color 250ms linear;";
            eraserMouseClicked = true;
        }
        else {
            isDrawing = true;
        }
    });
}

let drawOnCanvas = (item) => {
    item.addEventListener('mousemove', () => {
        if (eraserClicked == false && isDrawing) {
            item.style.cssText = changeDrawingColor();
        }
        else if (eraserClicked && eraserMouseClicked) {
            item.style.cssText = "background-color = #000000; transition: background-color 250ms linear;";
        }
    })
}

let checkIfMouseUnclicked = (item) => {
    item.addEventListener('drag', () => {
        isDrawing = false;
        eraserMouseClicked = false;
    })
    item.addEventListener('mouseup', () => {
        isDrawing = false;
        eraserMouseClicked = false;
    })
}



const createDivElements = () => {
    let divElement = document.createElement('div');
    divElement.className = 'grid-item';
    checkIfMouseIsClicked(divElement)
    drawOnCanvas(divElement);
    checkIfMouseUnclicked(divElement)
    divElement.draggable = false;
    divElement.ondrag = 'return false';
    return divElement;
}

const clearCanvas = () => {
    canvas.childNodes.forEach((item) => {
        item.style.cssText = "background-color = #000000;";
    })
}


let getNumberOfPixels = (numPixels) => {
    return Math.round(canvas.offsetWidth / numPixels)
}


const removeElements = () => {
    canvas.childNodes.forEach((child) => {
        child.remove()
    })
}

const addElements = (size) => {
    for (let i = 0; i < size * size; i++) {
        canvas.appendChild(createDivElements());
    }
}


const addPixelsToCanvas = (size) => {
    let col = "grid-template-columns: "
    let row = "grid-template-rows: "
    let numPixels = getNumberOfPixels(size);
    for (let i = 0; i < numPixels; i++) {
        col += size + "px ";
        row += size + "px ";
    }
    removeElements()
    addElements(numPixels)
    canvas.style.cssText = col + "; " + row;
}




const defaultCanvasSize = () => {
    let size = 30;
    addPixelsToCanvas(size)
}

const changeCanvasSize = () => {
    let userSizeEntry = 0;
    while (userSizeEntry < 10 || userSizeEntry > 100) {
        if (userSizeEntry != null)
            userSizeEntry = prompt("Please enter a size between 10 and 100: ")
        else {
            return
        }
    }
    clearCanvas();
    addPixelsToCanvas(userSizeEntry);
}


const clearContentFromPixel = () => {
    eraserClicked = !eraserClicked;
    isDrawing = false;

}

const changeDrawingColor = () => {
    color = document.getElementById('favcolor');
    return 'background-color: ' + String(color.value) + "; " + "transition: background-color 250ms linear;"
}

defaultCanvasSize()

