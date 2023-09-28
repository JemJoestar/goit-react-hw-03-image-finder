import css from "./Modal.module.css"

export const Modal = ({ bigImgUrl, onCloseModal }) => {
  return `<div class="${css.overlay}" >
    <div class="${css.image}">
      <img src="${bigImgUrl}" alt="photo" />
    </div>
  </div>`;
};
