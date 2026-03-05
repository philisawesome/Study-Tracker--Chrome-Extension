interface Props {
  onClick: () => void;
}

function Log({ onClick }: Props) {
  return (
    <div className="controls">
      <button className="log-button" onClick={onClick}>
        LOGS
      </button>
    </div>
  );
}

export default Log;
