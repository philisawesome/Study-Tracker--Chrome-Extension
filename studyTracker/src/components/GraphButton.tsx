interface Props {
  onClick: () => void;
}

function GraphButton({ onClick }: Props) {
  return (
    <div className="controls">
      <button className="graph-button" onClick={onClick}>
        GRAPH
      </button>
    </div>
  );
}

export default GraphButton;
