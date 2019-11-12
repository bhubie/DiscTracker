import * as React from 'react';
import { useState } from 'react';
import Modal from './Modal'
import classNames from 'classnames';


export interface IModalEditBagProps {
  value: string
  modalTitle: string
  handleCloseModal: () => void
  handleSaveBag: (bagName: string) => void
}

export const ModalEditBag: React.SFC<IModalEditBagProps> = (props) => {

    const [bagName, setBagName] = useState(props.value);
    const bagNameInputCSSClass = classNames('input', {
        'is-success': bagName !== '',
        'is-danger': bagName === ''
    });

    const isSaveButtonDisabled = bagName === '' ? true : false;
 
    const modalButtons = [
        <button
          onClick={props.handleCloseModal}
          className="button"
          key="positiveButton"
        >
          Cancel
        </button>,
        
        <button
          className="button is-success"
          onClick={() => props.handleSaveBag(bagName)}
          disabled={isSaveButtonDisabled}
          key="negativeButton"
        >
          Save
        </button>,
      ];


    return (
        <Modal
            title={props.modalTitle}
            isOpen={true}
            onRequestClose={props.handleCloseModal}
            actions={modalButtons}
        >
            <input
            type="text"
            className={bagNameInputCSSClass}
            id="bagNameTextField"
            onChange={(event) => {setBagName(event.target.value)}}
            value={bagName}
            placeholder="Bag Name"
            />
        </Modal>
    )
}