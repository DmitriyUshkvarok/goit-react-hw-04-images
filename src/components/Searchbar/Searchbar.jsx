import Container from 'components/Container/Container';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!query) {
      toast.error('Please, enter your name image!', {
        autoClose: 3000,
        theme: 'dark',
      });
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <Container>
      <header className={css.searchbar}>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            className={css.input}
            name="query"
            type="text"
            autoсomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleChange}
            value={query}
          />
          <button
            type="submit"
            className={css.button}
            // disabled={query ? false : true}
          >
            <span className="button-label">Search</span>
          </button>
        </form>
      </header>
    </Container>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
