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
    "bg":"#404E4D",
    "I":"#5BC0EB",
    "O":"#FDE74C",
    "T":"#9BC53D",
    "J":"#C3423F",
    "L":"#91818A",
    "S":"#CA895F",
    "Z":"#CA3CFF",
    "g": "#a2a6a6"
  };
  return (
    <div style={{backgroundColor: colors[color_ind]}} className='square'/>
  )
}