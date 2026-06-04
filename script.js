const board = document.getElementById("sudoku-board");

const samplePuzzle = [
 [5,3,0,0,7,0,0,0,0],
 [6,0,0,1,9,5,0,0,0],
 [0,9,8,0,0,0,0,6,0],
 [8,0,0,0,6,0,0,0,3],
 [4,0,0,8,0,3,0,0,1],
 [7,0,0,0,2,0,0,0,6],
 [0,6,0,0,0,0,2,8,0],
 [0,0,0,4,1,9,0,0,5],
 [0,0,0,0,8,0,0,7,9]
];

createBoard();

function createBoard(){

    for(let row=0; row<9; row++){

        for(let col=0; col<9; col++){

            const input=document.createElement("input");

            input.type="number";
            input.min=1;
            input.max=9;

            if(samplePuzzle[row][col]!==0){

                input.value=samplePuzzle[row][col];
                input.readOnly=true;
                input.classList.add("fixed");

            }

            board.appendChild(input);
        }
    }
}

function getBoard(){

    const inputs=document.querySelectorAll("input");

    let grid=[];

    for(let row=0; row<9; row++){

        grid[row]=[];

        for(let col=0; col<9; col++){

            const value=inputs[row*9+col].value;

            grid[row][col]=value ? parseInt(value) : 0;
        }
    }

    return grid;
}

async function setBoard(grid){

    const inputs=document.querySelectorAll("input");

    for(let row=0; row<9; row++){

        for(let col=0; col<9; col++){

            const cell=inputs[row*9+col];

            if(!cell.readOnly){

                await new Promise(resolve =>
                    setTimeout(resolve,30)
                );

                cell.value=grid[row][col];
            }
        }
    }
}

function isValid(grid,row,col,num){

    for(let x=0; x<9; x++){

        if(grid[row][x]===num)
            return false;

        if(grid[x][col]===num)
            return false;
    }

    let startRow=row-row%3;
    let startCol=col-col%3;

    for(let i=0;i<3;i++){

        for(let j=0;j<3;j++){

            if(grid[startRow+i][startCol+j]===num)
                return false;
        }
    }

    return true;
}

function solve(grid){

    for(let row=0; row<9; row++){

        for(let col=0; col<9; col++){

            if(grid[row][col]===0){

                for(let num=1; num<=9; num++){

                    if(isValid(grid,row,col,num)){

                        grid[row][col]=num;

                        if(solve(grid))
                            return true;

                        grid[row][col]=0;
                    }
                }

                return false;
            }
        }
    }

    return true;
}

async function solveSudoku(){

    let grid=getBoard();

    if(solve(grid)){

        await setBoard(grid);

        setTimeout(()=>{
            alert("🎉 Sudoku Solved Successfully!");
        },200);

    }else{

        alert("❌ No Solution Found!");
    }
}

function clearBoard(){

    const inputs=document.querySelectorAll("input");

    inputs.forEach(input=>{

        if(!input.readOnly){

            input.value="";
        }
    });
}
