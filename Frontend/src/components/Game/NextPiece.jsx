import Piece from "./Piece";

export default function NextPiece({ nextPieces }) {
    return (
        <div className="flex flex-col gap-4 items-center overflow-hidden min-w-36 max-h-[50vh] bg-slate-500 rounded-lg">
            <h1 className="font-mono text-2xl font-extrabold text-slate-200 mx-auto">Next</h1>
            {nextPieces.slice(0,6).map((v, i)=>{
                return <Piece piece={v} key={i}/>
            })}
        </div>
    )
}