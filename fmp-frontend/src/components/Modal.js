 // frontend/src/components/Modal.js

 import React, { Component } from "react";
 import {
   Button,
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter,
   Form,
   FormGroup,
   Input,
   Label
 } from "reactstrap";

 export default class CustomModal extends Component {
   constructor(props) {
     super(props);
     this.state = {
       activeItem: this.props.activeItem
     };
   }
   handleChange = e => {
     let { name, value } = e.target;
     if (e.target.type === "checkbox") {
       value = e.target.checked;
     }
     const activeItem = { ...this.state.activeItem, [name]: value };
     this.setState({ activeItem });
   };
   render() {
     const { toggle, onSave } = this.props;
     return (
       <Modal isOpen={true} toggle={toggle}>
         <ModalHeader toggle={toggle}> Menu Recipe </ModalHeader>
         <ModalBody>
           <Form>
             <FormGroup>
               <Label for="recipe_name">Recipe</Label>
               <Input
                 type="text"
                 name="recipe_name"
                 value={this.state.activeItem.recipe_name}
                 onChange={this.handleChange}
                 placeholder="Enter Menu Recipe"
               />
             </FormGroup>
             <FormGroup>
               <Label for="date">Date</Label>
               <Input
                 type="text"
                 name="date"
                 value={this.state.activeItem.date}
                 onChange={this.handleChange}
                 placeholder="Enter Menu date"
               />
             </FormGroup>
             <FormGroup>
               <Label for="meal_time">Meal Time</Label>
               <Input
                 type="text"
                 name="meal_time"
                 value={this.state.activeItem.meal_time}
                 onChange={this.handleChange}
                 placeholder="Enter Menu Meal Time"
               />
             </FormGroup>
           </Form>
         </ModalBody>
         <ModalFooter>
           <Button color="success" onClick={() => onSave(this.state.activeItem)}>
             Save
           </Button>
         </ModalFooter>
       </Modal>
     );
   }
 }