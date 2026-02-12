interface Props {
  onClick: () => void;
}

function TreeButton({ onClick }: Props) {
  return (
    <div className="controls">
      <button className="tree-button" onClick={onClick}>
        tree
      </button>
    </div>
  );
}

export default TreeButton;
