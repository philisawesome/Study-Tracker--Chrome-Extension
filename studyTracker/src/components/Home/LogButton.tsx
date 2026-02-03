interface Props {
  onClick: () => void;
}

function Log({ onClick }: Props) {
  return (
    <div id="log-container" className="controls">
      <button className="log-button" onClick={onClick}>
        logs
      </button>
    </div>
  );
}

export default Log;
