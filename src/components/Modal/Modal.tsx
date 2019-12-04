import * as React from 'react';
import ReactDOM from 'react-dom';


export interface IModal {
    title: string
    isOpen: boolean
    actions: any[]
    onRequestClose: () => void
}

const Modal: React.FC<IModal> = (props) => {

    const modal = React.useRef<HTMLDivElement | null>(null);

    if(props.isOpen) {
        return ReactDOM.createPortal(
            <div className="modal is-active">
                <div className="modal-background" />
                <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{props.title}</p>
                    <button className="delete" aria-label="close" onClick={props.onRequestClose} />
                </header>
                <section className="modal-card-body">
                    {props.children}
                </section>
                <footer className="modal-card-foot">
                    {props.actions}
                </footer>
                </div>
            </div>,
            document.body
        );
    }

    return null; 
}

export default Modal;