const grid = document.getElementById("grid");
let mines = document.getElementById("mine-amount");
let gridSize = document.getElementById("grid-size");

startGame = () => {
  generateGrid()
}

generateGrid = () => {
  grid.innerHTML = "";
  for (let i = 0; i < gridSize.value; i++) {
    row = grid.insertRow(i);
    for (let j = 0; j < gridSize.value; j++) {
      cell = row.insertCell(j);
      cell.id = `cell-${i}-${j}`
      cell.onclick = function () {
        clickCell(this);
      };
      let mine = document.createAttribute("data-mine");
      mine.value = "false";
      cell.setAttributeNode(mine);
    }
  }
  addMines();
}

//add mines randomly
addMines = () => {
  let minesPlaced = 0;
  while (minesPlaced < mines.value) {
    let row = Math.floor(Math.random() * gridSize.value);
    let column = Math.floor(Math.random() * gridSize.value);
    let cell = grid.rows[row].cells[column];
    console.log(cell.getAttribute("data-mine"), cell)
    if (cell.getAttribute("data-mine") === "false") {
      cell.setAttribute("data-mine", "true");
      minesPlaced++
    }

  }
}

//highlights all mines in red
revealMines = () => {
  for (let i = 0; i < gridSize.value; i++) {
    for (let j = 0; j < gridSize.value; j++) {
      let cell = grid.rows[i].cells[j];
      if (cell.getAttribute("data-mine") === "true")
        cell.className = "mine";
    }
  }
}

checkLevelCompletion = () => {
  let levelComplete = true;
  for (let i = 0; i < gridSize.value; i++) {
    for (let j = 0; j < gridSize.value; j++) {
      if ((grid.rows[i].cells[j].getAttribute("data-mine") == "false") && (grid.rows[i].cells[j].innerHTML == ""))
        levelComplete = false
    }
  }
  if (levelComplete) {
    alert("You Win");
    revealMines();
  }
}

//allows user to click on the cells and checks if they have clicked a mine
clickCell = (cell) => {
  if (cell.getAttribute("data-mine") === "true") {
    revealMines();
    alert("Game Over");
  } else {
    //counts and displays the number of adjacent mines
    cell.className = "clicked"
    let mineCount = 0;
    let cellRow = cell.parentNode.rowIndex;
    let cellColumn = cell.cellIndex;
    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, gridSize.value - 1); i++) {
      for (let j = Math.max(cellColumn - 1, 0); j <= Math.min(cellColumn + 1, gridSize.value - 1); j++) {
        if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") mineCount++;
      }
    }
    cell.innerHTML = mineCount;
    if (mineCount == 0) {
      //Reveal all adjacent cells as they do not have a mine
      for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, gridSize.value - 1); i++) {
        for (var j = Math.max(cellColumn - 1, 0); j <= Math.min(cellColumn + 1, gridSize.value - 1); j++) {
          //Recursive Call
          if (grid.rows[i].cells[j].innerHTML == "") clickCell(grid.rows[i].cells[j]);
        }
      }
    }
    checkLevelCompletion();
  }
}



const setFlag = e => {
  const element = document.getElementById(e.srcElement.id)
  if (element.style.backgroundImage) {
    element.style.backgroundImage = ""
  } else {
    element.style.backgroundImage = `url("./images/redflag.png")`
  }
}

document.getElementById("grid").addEventListener("contextmenu", e => setFlag(e))
