import Piece from "../Piece/Piece.jsx";
import './NextPiece.css'

export default function NextPiece({ nextPieces }) {
    return (
        <>
            <div className="next">
                <p>Next Pieces</p>
                <div className="padding"/>
                {nextPieces.slice(0,6).map((v, i)=>{
                    return <Piece piece={v} key={i}/>
                })}
            </div>
        </>
    )
}