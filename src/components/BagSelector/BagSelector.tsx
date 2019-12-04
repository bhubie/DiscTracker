import * as React from 'react';
import { useState } from 'react';
import Select from '../Select';
import { Button, Size, Color } from '../FormComponents/FormComponents';
import { ModalEditBag } from '../Modal/ModalEditBag';
import { useBagsFacade } from '../../Hooks/useBagsFacade';

export const BagSelector: React.SFC<{}> = () => {

    const [{bags, selectedBag}, updateSelectedBag, addBag, editBag, deleteBag] = useBagsFacade();

    const [[showModal, modalType], setShowModal] = useState([false, '']);

    const modal = showModal ? 
        <ModalEditBag 
            value={modalType === 'Edit' ? selectedBag!.name : ''}
            modalTitle={modalType === 'New' ? 'New Bag' : 'Edit Bag'}
            handleCloseModal={() => {setShowModal([false, ''])}}
            handleSaveBag={(name: string) =>{
                modalType === 'New' ? addBag(name) : editBag(selectedBag!.id, name);
                setShowModal([false, '']);
            }}
        /> 
        : 
        undefined;
    
    return (
        <div id="bagSelector" className="columns is-desktop" style={{alignItems: 'center'}}>
            <div className="column">
                <Select
                options={bags}
                onChange={updateSelectedBag}
                showLoadingIndicator={true}
                loadingMessage="Loading Bags..."
                selectLabel="name"
                selectValue="id"
                placeHolder="test"
                showPlaceHolder={false}
                id="bagSelectorElement"
                />
            </div>
            <div className="buttons column" >
                <Button onClick={() => setShowModal([true, 'New'])} size={Size.Small} color={Color.Primary} >
                    New Bag
                </Button>
                <Button onClick={() => setShowModal([true, 'Edit'])} size={Size.Small} color={Color.Primary}>
                    Edit Bag Name
                </Button>
                <Button onClick={() => deleteBag(selectedBag!.id)} size={Size.Small} color={Color.Primary}>
                    Delete Bag
                </Button>
            </div>
            {modal}
                   
        </div>
    )
}