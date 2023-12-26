import { useState } from 'react'
import './Grid.css'


export default function Grid( { squares } ) {

  function updateSquares(Game){
    console.log(fetchData());
  }

  let dims = [10,20];
  const generateKey = (row, col) => `${row}-${col}`;
  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < dims[1]; row++){
      for (let col = 0; col < dims[0]; col++){
        const key = generateKey(row, col);
        grid.push(<Square key={key} color_ind={squares[row][col]}/>);
      }
    }
    return grid;
  }
  return (
    <div className='grid-container'>
      {renderGrid()}
    </div>
  )
}

function Square({ color_ind }){
  let colors = ["505050", 'red', 'green'];
  return (
    <div style={{backgroundColor: colors[color_ind]}} className='square'/>
  )
}