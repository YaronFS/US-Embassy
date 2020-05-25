import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const errorMessage = (props) => {

    const handleClose = () => {
        const { onClose } = props;

        onClose();
    }

    return (
        <Modal
            open={true}
            onClose={handleClose}
            size='small'
        >
            <Header icon='error' content='Error' />
            <Modal.Content>
                <h3>{props.content}</h3>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={handleClose} inverted>
                    <Icon name='checkmark' /> OK
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default errorMessage;
