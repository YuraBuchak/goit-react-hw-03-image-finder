import css from './styles.module.css';
import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => {
  return (
    <button type="button" onClick={loadMore} className={css.Button}>
      Load more
    </button>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
