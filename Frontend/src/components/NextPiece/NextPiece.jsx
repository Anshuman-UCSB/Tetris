import {Square} from "../Grid/Grid.jsx";
import Piece from "../Piece/Piece.jsx";
import './NextPiece.css'

export default function NextPiece({ nextPiece }) {

    return (
        <>
            <div className="next">
                {/* <div className="flex-container"> */}
                    <Piece piece={nextPiece}/>
                    {/* <Square className="img-square"></Square> */}
                    <h1>{nextPiece}</h1>
                {/* </div> */}
            </div>
        </>
    )
}