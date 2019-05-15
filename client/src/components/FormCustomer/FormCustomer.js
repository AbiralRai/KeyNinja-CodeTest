import React, { Component } from "react";
import { Message, Form, Button } from "semantic-ui-react";
import axios from "axios";

class FormCustomer extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    formClassName: "",
    formSuccessMessage: "",
    formErrorMessage: "",
  };
  
  componentWillMount() {
         
    // Grab the data if customer id is provided
    if (this.props.customerID) {

      axios
        .get(`${this.props.server}/api/customers/${this.props.customerID}`)
        .then(res => {
          this.setState({
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            email: res.data.email
            
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
      e.preventDefault();

      const customer = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email
        }
        const setMethod = this.props.customerID ? "put" : "post";
        const getCustomerID = this.props.customerID ? this.props.customerID : "";
        
        axios({
            method: setMethod,
            responseType: 'json',
            url: `${this.props.server}/api/customers/${getCustomerID}`,
            data: customer
        })
        .then( res => {
            this.setState({
                formClassName: 'success',
                formSuccessMessage: res.data.msg
            });

            if(!this.props.customerID){
                this.setState({
                    firstname: '',
                    lastname: '',
                    email: ''
                });
                this.props.onAdded(res.data.result);   
            }
            else{
                this.props.onUpdated(res.data.result)
            }
        })
        .catch( err => {
            if(err.response){
                if(err.response.data){
                    this.setState({
                        formClassName: 'warning',
                        formErrorMessage: err.response.data.msg
                    });
                }
            }
            else{
                this.setState({
                    formClassName: 'warning',
                    formErrorMessage: 'Something went wrong. ' + err 
                });
            }
        });
    }
        
render(){
    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;
    return(
        <Form
            className={formClassName}
            onSubmit={this.handleSubmit}
        >

            <Form.Input
                label='firstname'
                type='text'
                placeholder='Enter your firstname'
                name='firstname'
                maxLength='40'
                required
                value={this.state.firstname}
                onChange={this.handleChange}
            />
            <Form.Input
                label='lastname'
                type='text'
                placeholder='Enter your lastname'
                name='lastname'
                maxLength='40'
                required
                value={this.state.lastname}
                onChange={this.handleChange}
            />
            <Form.Input
                label='email'
                type='email'
                placeholder='Enter your email'
                name='email'
                maxLength='40'
                required
                value={this.state.email}
                onChange={this.handleChange}
            />
            <Message
                success
                color='green'
                header='Successful'
                content={formSuccessMessage}
            />
            <Message
                warning
                color='yellow'
                header='Error*'
                content={formErrorMessage}
            />
            <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
            <br/> <br/>
        </Form>
    );
}
}


export default FormCustomer;