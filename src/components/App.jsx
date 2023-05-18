import { Component } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

export class App extends Component {
  state = {
    serchText: '',
  };

  handleSerchText = serchText => {
    this.setState({ serchText });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSerchText} />
        <ImageGallery serchText={this.state.serchText} />
      </div>
    );
  }
}
