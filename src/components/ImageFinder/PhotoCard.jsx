export const PhotoCard = ({ data, handleClick }) => {
  return (
    <li>
      <img
        src={data.webformatURL}
        alt="photo"
        onClick={(event) => handleClick(event, data.largeImageURL)}
      />
    </li>
  );
};
