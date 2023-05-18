import css from './styles.module.css';

export const ImageGalleryItem = ({ pictures }) =>
  pictures.map(({ id, webformatURL, largeImageURL }, index) => (
    <li key={index} className={css.ImageGalleryItemImage}>
      <img src={webformatURL} alt="" />
    </li>
  ));
