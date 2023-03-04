import PropTypes from 'prop-types';
import css from './Button.module.css';
function Button({ handleIncrement }) {
  return (
    <button
      className={css.btnLoadMore}
      type="button"
      onClick={() => {
        handleIncrement();
      }}
    >
      Load More
    </button>
  );
}

export default Button;

Button.propTypes = {
  handleIncrement: PropTypes.func.isRequired,
};
