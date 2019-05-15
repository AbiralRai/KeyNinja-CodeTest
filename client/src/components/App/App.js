import React, { Component } from 'react';
import { Container } from "semantic-ui-react";
import '../../index.css';
import axios from 'axios';

import AppHeader from './AppHeader';
import CustomerTable from '../CustomerTable/CustomerTable';
import ModalCustomer from '../ModalCustomer/ModalCustomer'

class App extends Component {
  state = {
    customers: []
  };

  server = process.env.PORT || "";

  componentDidMount() {
    axios
      .get(`${this.server}/api/customers/`)
      .then(res => {
        this.setState({ customers: res.data });
      })
      .catch(function(error) {
        console.log("componentdidmount error: ", error);
      });
  }

  handleAdd = customer => {
    let customers = [...this.state.customers, customer];
    this.setState({
      customers: customers
    });
  };

  handleUpdate = customer => {
    let customers = this.state.customers;
    for (let i = 0, n = customers.length; i < n; i++) {
      if (customers[i]._id === customer._id) {
        customers[i].firstname = customer.firstname;
        customers[i].lastname = customer.lastname;
        customers[i].email = customer.email;
        break;
      }
    }
    this.setState({ customers: customers });
  };

  handleDelete = customer => {
    let customers = this.state.customers;
    customers = customers.filter(c => {
      return c._id !== customer._id;
    });
    this.setState({ customers: customers });
  };

  render() {
    return (
      <div className="App">
        <AppHeader />
        <Container>
          <ModalCustomer
            headerTitle="Add Customer"
            buttonTriggerTitle="Add new"
            buttonSubmitTitle="Add"
            buttonColor="green"
            onAdded={this.handleAdd}
            server={this.server}
          />
          <CustomerTable
            onUpdated={this.handleUpdate}
            onDeleted={this.handleDelete}
            customers={this.state.customers}
            server={this.server}
          />
        </Container>
        <br />
      </div>
    );
  }
}

export default App;
