import css from '../styles.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChangeInput = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmitForm = event => {
    event.preventDefault();

    if (this.state.value.trim() === '') {
      alert('Write smth...!');
      return;
    }

    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmitForm}>
          <button type="submit" className={css.SearchFormButton}>
            GO!
            {/* <span className={css.SearchFormButtonLabel}></span> */}
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeInput}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
