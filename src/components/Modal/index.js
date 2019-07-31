import React from 'react';
import PropTypes from 'prop-types';


const Modal = ({
  title, open, onRequestClose, actions, children,
}) => {
  if (open) {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" onClick={onRequestClose} />
          </header>
          <section className="modal-card-body">
            {children}
          </section>
          <footer className="modal-card-foot">
            {actions}
          </footer>
        </div>
      </div>
    );
  }

  return null;
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  actions: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
