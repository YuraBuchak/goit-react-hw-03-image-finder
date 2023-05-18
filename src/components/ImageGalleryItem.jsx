import { Component } from 'react';
import { Modal } from './Modal';
import css from './styles.module.css';

// export const ImageGalleryItem = ({ pictures }) =>
//   pictures.map(({ id, webformatURL, largeImageURL }, index) => (
//     <li key={index} className={css.ImageGalleryItemImage}>
//       <img src={webformatURL} alt="" />
//     </li>
//   ));

// export const ImageGalleryItem = ({ webformatURL }) => {
//   return (
//     <li className={css.ImageGalleryItemImage}>
//       <img src={webformatURL} alt="" />
//     </li>
//   );
// };

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
    const { webformatURL, largeImageURL } = this.props.picture;
    return (
      <>
        <li className={css.ImageGalleryItemImage} onClick={this.toggleModal}>
          <img src={webformatURL} alt="" />
        </li>

        {this.state.showModal && (
          <Modal src={largeImageURL} onClick={this.handleImgClick} />
        )}
      </>
    );
  }
}
