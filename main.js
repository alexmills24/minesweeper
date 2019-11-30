const grid = document.getElementById("grid");

//generates a 10x10 grid
generateGrid = () => {
  grid.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    row = grid.insertRow(i);
    for (let j = 0; j < 10; j++) {
      cell = row.insertCell(j);
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
  for (let i = 0; i < 20; i++) {
    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);
    let cell = grid.rows[row].cells[column];
    cell.setAttribute("data-mine", "true");
  }
}

//highlights all mines in red
revealMines = () => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = grid.rows[i].cells[j];
      if (cell.getAttribute("data-mine") == "true")
        cell.className = "mine";
    }
  }
}

checkLevelCompletion = () => {
  let levelComplete = true;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
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
  if (cell.getAttribute("data-mine") == "true") {
    revealMines();
    alert("Game Over");
  } else {
    //counts and displays the number of adjacent mines
    cell.className = "clicked"
    let mineCount = 0;
    let cellRow = cell.parentNode.rowIndex;
    let cellColumn = cell.cellIndex;
    for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
      for (let j = Math.max(cellColumn - 1, 0); j <= Math.min(cellColumn + 1, 9); j++) {
        if (grid.rows[i].cells[j].getAttribute("data-mine") == "true") mineCount++;
      }
    }
    cell.innerHTML = mineCount;
    if (mineCount == 0) {
      //Reveal all adjacent cells as they do not have a mine
      for (var i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
        for (var j = Math.max(cellColumn - 1, 0); j <= Math.min(cellColumn + 1, 9); j++) {
          //Recursive Call
          if (grid.rows[i].cells[j].innerHTML == "") clickCell(grid.rows[i].cells[j]);
        }
      }
    }
    checkLevelCompletion();
  }
}
generateGrid();

