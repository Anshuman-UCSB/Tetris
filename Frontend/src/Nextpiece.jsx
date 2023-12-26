

export default function NextPiece({ nextPiece, children }) {

    return (
        <>
            <div className="next">
                <p>Next: {nextPiece}</p>
            </div>
        </>
    )
}