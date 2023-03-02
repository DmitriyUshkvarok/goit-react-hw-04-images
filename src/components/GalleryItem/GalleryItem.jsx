import PropTypes from 'prop-types';
import css from './GalleryItem.module.css';

function GalleryItem({
  webformatURL,
  largeImageURL,
  openModal,
  toggleOnLoading,
  tags = 'image',
}) {
  return (
    <li className={css.galleryItem}>
      <img
        onClick={e => {
          openModal(e.target.dataset.large);
          toggleOnLoading();
        }}
        src={webformatURL}
        data-large={largeImageURL}
        alt={tags}
        className={css.galleryItemImg}
      />
    </li>
  );
}

export default GalleryItem;

GalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  toggleOnLoading: PropTypes.func.isRequired,
};
