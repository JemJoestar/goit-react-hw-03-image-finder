import css from "./ImageFinder.module.css"

export const PhotoList = ({ photos }) => {
  return (
    <ul className={css.photoList}>
      {photos.map(photo => (
        <li className={css.photoListItem}key={photo.id}>
          <img src={photo.webformatURL} alt="photo" />
        </li>
      ))}
    </ul>
  );
};
