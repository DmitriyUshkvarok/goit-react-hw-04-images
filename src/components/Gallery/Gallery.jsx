import PropTypes from 'prop-types';
import GalleryItem from 'components/GalleryItem/GalleryItem';
import css from './Gallery.module.css';

function Gallery({ items, openModal, toggleOnLoading }) {
  return (
    <>
      <ul className={css.gallery}>
        {items.map(({ id, webformatURL, largeImageURL, tags }) => (
          <GalleryItem
            key={id}
            openModal={openModal}
            toggleOnLoading={toggleOnLoading}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        ))}
      </ul>
    </>
  );
}
export default Gallery;

Gallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  openModal: PropTypes.func.isRequired,
  toggleOnLoading: PropTypes.func.isRequired,
};
