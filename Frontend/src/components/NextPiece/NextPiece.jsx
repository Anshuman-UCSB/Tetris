import {Square} from "../Grid/Grid.jsx";
import './NextPiece.css'

export default function NextPiece({ nextPiece }) {

    return (
        <>
            <div className="next">
                <div className="flex-container">
                    <Square color_ind="bg"/>
                </div>
            </div>
        </>
    )
}