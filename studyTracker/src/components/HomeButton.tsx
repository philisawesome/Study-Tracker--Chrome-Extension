interface Props {
  onClick: () => void;
}

function HomeButton({ onClick }: Props) {
  return (
    <div className="buttons">
      <button className="homeButton" onClick={onClick}>
        Home
      </button>
    </div>
  );
}

export default HomeButton;
