import {Square, EmptySquare} from "../Grid/Grid.jsx";
// import './Piece.css'

export default function Piece({ piece }) {
    return {
        "O":<div>
                <div className="flex-container">
                    <Square color_ind="O"/>
                    <Square color_ind="O"/>
                </div>
                <div className="flex-container">
                    <Square color_ind="O"/>
                    <Square color_ind="O"/>
                </div>
            </div>,
        "Z":<div>
            <div className="flex-container">
                <Square color_ind="Z"/>
                <Square color_ind="Z"/>
                <EmptySquare/>
            </div>
            <div className="flex-container">
                <EmptySquare/>
                <Square color_ind="Z"/>
                <Square color_ind="Z"/>
            </div>
            </div>,
        "S":<div>
            <div className="flex-container">
                <EmptySquare/>
                <Square color_ind="S"/>
                <Square color_ind="S"/>
            </div>
            <div className="flex-container">
                <Square color_ind="S"/>
                <Square color_ind="S"/>
                <EmptySquare/>
            </div>
            </div>,
        "I":<div>
            <div className="flex-container">
                <Square color_ind="I"/>
                <Square color_ind="I"/>
                <Square color_ind="I"/>
                <Square color_ind="I"/>
            </div>
            </div>,
        "J":<div>
            <div className="flex-container">
                <EmptySquare/>
                <EmptySquare/>
                <Square color_ind="J"/>
            </div>
            <div className="flex-container">
                <Square color_ind="J"/>
                <Square color_ind="J"/>
                <Square color_ind="J"/>
            </div>
            </div>,
        "L":<div>
            <div className="flex-container">
                <Square color_ind="L"/>
                <EmptySquare/>
                <EmptySquare/>
            </div>
            <div className="flex-container">
                <Square color_ind="L"/>
                <Square color_ind="L"/>
                <Square color_ind="L"/>
            </div>
            </div>,
        "T":<div>
            <div className="flex-container">
                <EmptySquare/>
                <Square color_ind="T"/>
                <EmptySquare/>
            </div>
            <div className="flex-container">
                <Square color_ind="T"/>
                <Square color_ind="T"/>
                <Square color_ind="T"/>
            </div>
            </div>,
    }[piece]
}