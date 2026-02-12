interface Props {
  onClick: () => void;
}

function HomeButton({ onClick }: Props) {
  return (
    <div className="controls">
      <button className="home-button" onClick={onClick}>
        Home
      </button>
    </div>
  );
}

export default HomeButton;
