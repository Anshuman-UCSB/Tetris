import {Square} from "../Grid/Grid.jsx";
import Piece from "../Piece/Piece.jsx";
import './NextPiece.css'

export default function NextPiece({ nextPieces }) {
    return (
        <>
            <div className="next">
                {nextPieces.slice(0,4).map((v, i)=>{
                    return <Piece piece={v} key={i}/>
                })}
            </div>
        </>
    )
}