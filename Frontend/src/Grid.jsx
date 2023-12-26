import { useState } from 'react'
import './Grid.css'


export default function Grid( { squares } ) {
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
  let colors = {
    "bg":"505050",
    "I":"blue",
    "O":"yellow",
    "T":"magenta",
    "J":"darkblue",
    "L":"orange",
    "S":"green",
    "Z":"red",
  };
  return (
    <div style={{backgroundColor: colors[color_ind]}} className='square'/>
  )
}