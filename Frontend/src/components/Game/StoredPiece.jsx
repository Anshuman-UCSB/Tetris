import Piece from "./Piece";

export default function StoredPiece({ storedPiece }) {
    return (
        <div className="flex flex-col gap-4 items-center overflow-hidden min-w-36 max-h-[16vh] bg-slate-500 rounded-lg">
            <h1 className="font-mono text-2xl font-extrabold text-slate-200 mx-auto">Next</h1>
            <Piece piece={storedPiece}/>
        </div>
    )
}