import { Component } from 'react';
import { Modal } from '../Modal/Modal';
import css from '../styles.module.css';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleImgClick = e => {
    this.toggleModal();
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props.picture;
    return (
      <>
        <li className={css.ImageGalleryItemImage} onClick={this.toggleModal}>
          <img className={css.image} src={webformatURL} alt={tags} />
        </li>

        {this.state.showModal && (
          <Modal src={largeImageURL} alt={tags} onClick={this.handleImgClick} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
