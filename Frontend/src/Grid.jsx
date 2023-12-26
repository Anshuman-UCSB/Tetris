import { useState, useEffect } from 'react'
import './Grid.css'

export default function Grid() {
  const handleKeyDown = (event) => {
    // console.log("event pressed: "+event.key+" and "+event.keyCode);
    if (event.key === "ArrowLeft" || event.keyCode === 37){
      console.log("Left pressed");
    }
    if (event.key === "ArrowRight" || event.keyCode === 39){
      console.log("Right pressed");
    }
    if (event.key === "ArrowDown" || event.keyCode === 40){
      console.log("Down pressed");
    }
    if (event.key === "ArrowUp" || event.keyCode === 38){
      console.log("Up pressed");
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  let dims = [10,20];
  const generateKey = (row, col) => `${row}-${col}`;
  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < dims[1]; row++){
      for (let col = 0; col < dims[0]; col++){
        const key = generateKey(row, col);
        grid.push(<Square key={key} />);
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

function Square(){
  return (
    <div className='square'/>
  )
}