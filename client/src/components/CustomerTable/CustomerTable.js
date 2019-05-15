import React, { Component } from "react";
import { Table } from 'semantic-ui-react';
import ModalCustomer from '../ModalCustomer/ModalCustomer';
import ModalDelete from '../ModalDelete/ModalDelete';


class CustomerTable extends Component {
  render() {
    let customers = this.props.customers;

    customers = customers.map((customer, index) => (
      <Table.Row key={customer._id}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{customer.firstname}</Table.Cell>
        <Table.Cell>{customer.lastname}</Table.Cell>
        <Table.Cell>{customer.email}</Table.Cell>
        <Table.Cell>
          <ModalCustomer
            headerTitle="Edit User"
            buttonTriggerTitle="Edit"
            buttonSubmitTitle="Save"
            buttonColor="blue"
            customerID={customer._id}
            onUpdated={this.props.onUpdated}
            server={this.props.server}
          />
          <ModalDelete
            headerTitle="Delete User"
            buttonTriggerTitle="Delete"
            buttonColor="black"
            customer={customer}
            onDeleted={this.props.onDeleted}
            server={this.props.server}
          />
        </Table.Cell>
      </Table.Row>
    ));


    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>#</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{customers}</Table.Body>
      </Table>
    );
  }
}

export default CustomerTable;
