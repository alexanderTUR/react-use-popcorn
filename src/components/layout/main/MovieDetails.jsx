export const MovieDetails = ({ selectedMovieId, onCloseMovie }) => {
  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      {selectedMovieId}
    </div>
  );
};
