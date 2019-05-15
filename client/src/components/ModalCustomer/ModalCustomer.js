



import React, { Component } from "react";
import { Button, Modal,  } from "semantic-ui-react";
import FormCustomer from '../FormCustomer/FormCustomer';


class ModalCustomer extends Component {
  render() {
    return (
      <Modal
        trigger={
          <Button color={this.props.buttonColor}>
            {this.props.buttonTriggerTitle}
          </Button>
        }
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
      >
        <Modal.Header>{this.props.headerTitle}</Modal.Header>
        <Modal.Content>
          <FormCustomer
            buttonSubmitTitle={this.props.buttonSubmitTitle}
            buttonColor={this.props.buttonColor}
            customerID={this.props.customerID}
            onAdded={this.props.onAdded}
            onUpdated={this.props.onUpdated}
            server={this.props.server}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default ModalCustomer;
