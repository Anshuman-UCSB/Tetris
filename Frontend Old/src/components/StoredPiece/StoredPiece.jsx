import Piece from "../Piece/Piece.jsx";
import './StoredPiece.css'

export default function StoredPiece({ piece }) {
    return (
        <>
            <div className="stored">
                <p>Stored Piece</p>
                <div className="centered-flex">
                    <Piece piece={piece}/>
                </div>
            </div>
        </>
    )
}