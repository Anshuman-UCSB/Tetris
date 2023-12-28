import "./modal.css";

export default function PausedModal({ show }) {
  return (
    <>
      {show && (
        <div className="pause-modal">
          <h1 className="modal-content">Paused</h1>
        </div>
      )}
    </>
  );
}
