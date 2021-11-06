import React from "react";
import PropTypes from "prop-types";

function ImageGalleryItem({ image, onOpenModal }) {
  console.log(image);
  return (
    <li className="ImageGalleryItem">
      <img
        src={image.webformatURL}
        alt=""
        className="ImageGalleryItem-image"
        onClick={onOpenModal}
        data-img={image.largeImageURL}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
