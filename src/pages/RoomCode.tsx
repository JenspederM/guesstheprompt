export function RoomCode({ roomCode }: { roomCode: string | undefined }) {
  const copyToClipboard = () => {
    const roomCode = document.getElementById("roomCode") as HTMLSpanElement;
    const range = document.createRange();
    range.selectNode(roomCode);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    navigator.clipboard.writeText(roomCode.innerText);
    window.getSelection()?.removeAllRanges();
  };

  return (
    <div className="flex space-x-2 py-8 px-4 text-2xl bg-base-300 shadow-lg rounded-box text-center items-center">
      <span className="text-sm">Your room code is</span>
      <button
        className="flex items-center font-mono uppercase text-primary-content"
        id="roomCode"
        onClick={copyToClipboard}
      >
        {roomCode}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-current"
        >
          <path d="M10 3V5H5V19H19V14H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H10ZM17.5858 5H13V3H21V11H19V6.41421L12 13.4142L10.5858 12L17.5858 5Z"></path>
        </svg>
      </button>
    </div>
  );
}
