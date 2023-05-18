import css from './styles.module.css';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { fetchPicture } from './Api';
import { Loader } from './Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from './Button';

export class ImageGallery extends Component {
  state = {
    pictures: null,
    isLoading: false,
    page: 1,
    totalPages: null,
  };

  handleLoadMorePicture = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.serchText !== prevProps.serchText) {
      try {
        this.setState({ pictures: null, page: 1, isLoading: true });

        const { hits, totalHits } = await fetchPicture(
          this.props.serchText,
          this.state.page
        );

        if (hits.length === 0) {
          Notiflix.Notify.info('No results!');
        }

        this.setState({
          pictures: hits,
          totalPages: Math.ceil(totalHits / 12),
          isLoading: false,
        });

        // console.log(dataPicture);
      } catch (error) {
        console.log(error);
        this.setState({ isLoading: false });
      }
    }

    if (prevState.page < this.state.page) {
      try {
        const { hits } = await fetchPicture(
          this.props.serchText,
          this.state.page
        );

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...hits],
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const { pictures, isLoading, page, totalPages } = this.state;

    return (
      <>
        {isLoading && <Loader />}
        {pictures?.length === 0 && <span>Sorry, there are no pictures...</span>}

        {pictures?.length > 0 && (
          <ul className={css.ImageGallery}>
            {pictures.map((picture, index) => (
              <ImageGalleryItem key={index} picture={picture} />
            ))}
          </ul>
        )}

        {pictures?.length > 0 && page !== totalPages && (
          <Button loadMore={this.handleLoadMorePicture} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchText: PropTypes.string,
};
