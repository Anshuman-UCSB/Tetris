import Piece from "./Piece";

export default function NextPiece({ nextPieces }) {
    return (
        <div className="flex flex-col gap-4 items-center min-w-36 bg-slate-400 rounded-lg">
            <p>Next Pieces</p>
            {nextPieces.slice(0,6).map((v, i)=>{
                return <Piece piece={v} key={i}/>
            })}
        </div>
    )
}