const Clue = () => {
  const clueInlineStyles = {
    backgroundColor: 'bisque',
    color: 'rgb(99, 86, 86)',
    textAlign: 'center',
    padding: '5px',
    fontSize: '1.5rem',
    fontWeight: 800,
  };

  return (
    <div>
      <p className="clue" style={clueInlineStyles}>
        Bitte aktivieren Sie Ihre GeoLocation oder geben Sie eine Stadt ein!
      </p>
    </div>
  );
};

export default Clue;
