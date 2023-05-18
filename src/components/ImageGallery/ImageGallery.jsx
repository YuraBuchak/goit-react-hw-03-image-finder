import css from '../styles.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ pictures }) => {
  return (
    <ul className={css.ImageGallery}>
      {pictures.map((picture, index) => (
        <ImageGalleryItem key={index} picture={picture} />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
};
