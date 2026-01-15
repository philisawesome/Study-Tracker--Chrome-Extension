interface Props {
  onClick: () => void;
}

function Log({ onClick }: Props) {
  return (
    <div className="controls">
      <button onClick={onClick}>Logs</button>
    </div>
  );
}

export default Log;
