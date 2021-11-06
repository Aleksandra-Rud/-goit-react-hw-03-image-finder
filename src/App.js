import React, { Component } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import { getPictures } from "./services/apiService";

class App extends Component {
  state = {
    query: "",
    page: 1,
    images: [],
    // filter: "",
    showModal: false,
    largeImage: "",
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevState.query;
    const nextSearchQuery = this.state.query;
    if (prevSearchQuery !== nextSearchQuery) {
      this.addPicture();
    }
    if (prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  handleSearchBarSubmit = (query) => {
    this.setState({
      query: query,
      // page: 1,
      // images: [],
    });
  };

  addPicture = () => {
    const { query, page } = this.state;

    this.setState({
      isLoasing: true,
    });

    getPictures(query, page)
      .then((response) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...response],
          page: prevState + 1,
        }))
      )
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  reset = () => {
    this.setState({
      images: [],
      page: 1,
    });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  onOpenModal = (e) => {
    e.preventDefault();
    this.setState({
      largeImage: e.target.dataset.img,
    });
    this.toggleModal();
  };

  render() {
    const { images, largeImage, isLoading, showModal } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchBarSubmit} reset={this.reset} />
        {isLoading && <Loader />}
        <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        {images.length > 0 && <Button onClick={this.addPicture} />}

        {showModal && (
          <Modal onClick={this.toggleModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
