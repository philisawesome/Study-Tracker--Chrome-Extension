interface Props {
  onClick: () => void;
}

function GraphButton({ onClick }: Props) {
  return (
    <div id="graph-container" className="controls">
      <button className="graph-button" onClick={onClick}>
        graph
      </button>
    </div>
  );
}

export default GraphButton;
