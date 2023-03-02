import { Watch } from 'react-loader-spinner';
import css from './Loader.module.css';

function Loader() {
  return (
    <div className={css.loader}>
      <Watch
        height="180"
        width="180"
        radius="48"
        color="gold"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <p className={css.loaderText}>Loading...будь это реакт неладный</p>
    </div>
  );
}

export default Loader;
