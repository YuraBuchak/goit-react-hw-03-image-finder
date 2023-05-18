import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchPicture } from '../api/Api';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

// import css from './styles.module.css';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    serchText: '',
    pictures: null,
    isLoading: false,
    page: 1,
    totalPages: null,
  };

  handleSerchText = serchText => {
    this.setState({ serchText, page: 1 });
  };

  handleLoadMorePicture = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.serchText !== prevState.serchText) {
      try {
        this.setState({ pictures: null, page: 1, isLoading: true });

        const { hits, totalHits } = await fetchPicture(
          this.state.serchText,
          this.state.page
        );

        if (hits.length === 0) {
          Notiflix.Notify.info('No results!');
        }

        const filtredHits = hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );

        this.setState({
          pictures: filtredHits,
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
          this.state.serchText,
          this.state.page
        );

        const filtredHits = hits.map(
          ({ id, largeImageURL, webformatURL, tags }) => {
            return { id, largeImageURL, webformatURL, tags };
          }
        );

        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...filtredHits],
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const { pictures, isLoading, page, totalPages } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSerchText} />
        {isLoading && <Loader />}
        {pictures?.length === 0 && <span>Sorry, there are no pictures...</span>}
        {pictures?.length > 0 && <ImageGallery pictures={pictures} />}
        {pictures?.length > 0 && page !== totalPages && (
          <Button loadMore={this.handleLoadMorePicture} />
        )}
      </div>
    );
  }
}
