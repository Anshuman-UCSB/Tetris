import {Square, EmptySquare} from "./Squares";
// import './Piece.css'

export default function Piece({ piece }) {
    return (
    <div className="w-11/12">
        {{
        "O":<div className="w-1/2 mx-auto">
                <div className="flex">
                    <Square color_ind="O"/>
                    <Square color_ind="O"/>
                </div>
                <div className="flex">
                    <Square color_ind="O"/>
                    <Square color_ind="O"/>
                </div>
            </div>,
        "Z":<div className="w-3/4 mx-auto">
            <div className="flex">
                <Square color_ind="Z"/>
                <Square color_ind="Z"/>
                <EmptySquare/>
            </div>
            <div className="flex">
                <EmptySquare/>
                <Square color_ind="Z"/>
                <Square color_ind="Z"/>
            </div>
            </div>,
        "S":<div className="w-3/4 mx-auto">
            <div className="flex">
                <EmptySquare/>
                <Square color_ind="S"/>
                <Square color_ind="S"/>
            </div>
            <div className="flex">
                <Square color_ind="S"/>
                <Square color_ind="S"/>
                <EmptySquare/>
            </div>
            </div>,
        "I":<div className="w-1/1 mx-auto">
            <div className="flex">
                <Square color_ind="I"/>
                <Square color_ind="I"/>
                <Square color_ind="I"/>
                <Square color_ind="I"/>
            </div>
            </div>,
        "J":<div className="w-3/4 mx-auto">
            <div className="flex">
                <EmptySquare/>
                <EmptySquare/>
                <Square color_ind="J"/>
            </div>
            <div className="flex">
                <Square color_ind="J"/>
                <Square color_ind="J"/>
                <Square color_ind="J"/>
            </div>
            </div>,
        "L":<div className="w-3/4 mx-auto">
            <div className="flex">
                <Square color_ind="L"/>
                <EmptySquare/>
                <EmptySquare/>
            </div>
            <div className="flex">
                <Square color_ind="L"/>
                <Square color_ind="L"/>
                <Square color_ind="L"/>
            </div>
            </div>,
        "T":<div className="w-3/4 mx-auto">
            <div className="flex">
                <EmptySquare/>
                <Square color_ind="T"/>
                <EmptySquare/>
            </div>
            <div className="flex">
                <Square color_ind="T"/>
                <Square color_ind="T"/>
                <Square color_ind="T"/>
            </div>
            </div>,
        }[piece]}
    </div>);
}