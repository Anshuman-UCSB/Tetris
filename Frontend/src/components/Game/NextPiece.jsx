import Piece from "./Piece";

export default function NextPiece({ nextPieces }) {
    return (
        <>
            <p>Next Pieces</p>
            {nextPieces.slice(0,6).map((v, i)=>{
                return <Piece piece={v} key={i}/>
            })}
        </>
    )
}