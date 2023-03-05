import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';
import fetchApi from 'service/fetchApi';
import Container from 'components/Container/Container';
import Gallery from 'components/Gallery/Gallery';
import Searchbar from 'components/Searchbar/Searchbar';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  LOADING: 'loading',
};

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  // const [status, setStatus] = useState(Status.IDLE);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [urlModal, setUrlModal] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    function onRenderGallery(query, page) {
      fetchApi(query, page)
        .then(({ hits, totalHits }) => {
          setItems([...items, ...hits]);
          setLoader(false);
          if (hits.length) {
            setShowButton(true);
          }

          if (page * 12 >= totalHits) {
            setShowButton(false);
          }

          if (!hits.length) {
            toast.error('Sorry, image not found!', {
              autoClose: 3000,
              theme: 'dark',
            });
          }
        })
        .catch(error =>
          toast.error('error mother fucker', {
            autoClose: 3000,
            theme: 'dark',
          })
        );
    }

    if (query) {
      onRenderGallery(query, page);
    }
  }, [query, page, items]);

  const handleFormSubmit = newQuery => {
    if (newQuery === query) {
      return;
    }

    if (!newQuery) {
      toast.error('Please, enter your name image!', {
        autoClose: 3000,
        theme: 'dark',
      });
      return;
    }

    setItems([]);
    setQuery(newQuery);
    setPage(1);
    // setStatus(Status.LOADING);
  };

  const handleIncrement = () => {
    setPage(page + 1);
    setLoader(!loader);
  };

  const openModal = url => {
    toggleShowModal();
    setUrlModal(url);
  };

  const closeModal = () => {
    toggleShowModal();
    setUrlModal('');
    setLoader(false);
  };

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  const toggleOnLoading = () => {
    setLoader(!loader);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <Container>
        {loader && <Loader />}
        <Gallery
          items={items}
          openModal={openModal}
          toggleOnLoading={toggleOnLoading}
        />

        {showButton && (
          <Button
            handleIncrement={handleIncrement}
            toggleOnLoading={toggleOnLoading}
          />
        )}
        <ToastContainer />
      </Container>

      {showModal && (
        <Modal onClose={closeModal}>
          {loader && <Loader />}
          <img
            onLoad={toggleOnLoading}
            src={urlModal}
            alt=""
            className={css.imgModal}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
