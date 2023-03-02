import { Component } from 'react';
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
class App extends Component {
  state = {
    query: '',
    page: 1,
    totalHits: null,
    showButton: false,
    status: Status.IDLE,
    items: [],
    showModal: false,
    urlModal: '',
    loader: false,
  };

  async onRenderGallery(query, page) {
    this.setState({ loader: true });

    await fetchApi(query, page)
      .then(({ hits, totalHits }) => {
        this.setState({
          items: [...this.state.items, ...hits],
          totalHits: totalHits,
        });
        this.setState({ loader: false });

        if (hits.length) {
          this.setState({
            showButton: true,
          });
        }

        if (page * 12 >= totalHits) {
          this.setState({
            showButton: false,
          });
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

  componentDidUpdate(prevProps, prevState) {
    const newQuery = this.state.query;
    const newPage = this.state.page;

    if (this.state.status === Status.LOADING) {
      this.setState({ status: Status.PENDING });
      this.onRenderGallery(newQuery, newPage);
    }

    if (this.state.status !== Status.LOADING && prevState.page !== newPage) {
      this.onRenderGallery(newQuery, newPage);
    }

    if (!this.state.showModal && !prevState.showModal) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  handleFormSubmit = query => {
    this.setState({
      items: [],
      query,
      page: 1,
      totalHits: null,
      status: Status.LOADING,
    });
  };

  handleIncrement = () => {
    this.setState({ page: this.state.page + 1 });
  };

  openModal = url => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: url,
    }));
  };

  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      urlModal: '',
    }));
  };

  toggleOnLoading = () => {
    this.setState(({ loader }) => ({ loader: !loader }));
  };

  render() {
    const { urlModal, items, showModal, showButton, loader } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Container>
          {loader && <Loader />}
          <Gallery
            items={items}
            openModal={this.openModal}
            toggleOnLoading={this.toggleOnLoading}
          />
          {showButton && <Button handleIncrement={this.handleIncrement} />}
          <ToastContainer />
        </Container>

        {showModal && (
          <Modal onClose={this.closeModal}>
            {loader && <Loader />}
            <img
              onLoad={this.toggleOnLoading}
              src={urlModal}
              alt=""
              className={css.imgModal}
            />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
