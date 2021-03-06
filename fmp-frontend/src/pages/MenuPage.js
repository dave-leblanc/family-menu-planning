 // frontend/src/App.js

 import React, { Component } from "react";
 import Modal from "../components/Modal";
 import axiosInstance from "../axiosAPI";

 class ManuPage extends Component {
   constructor(props) {
     super(props);
     this.state = {
       activeItem: {
        recipe_name: "",
        date: "",
        meal_time: "",
      },
      menuList: []
     };
   }
   componentDidMount() {
     this.refreshList();
   }
   refreshList = () => {
    axiosInstance
       .get("/menus/this_week/")
       .then(res => {
         this.setState({ menuList: res.data })
       })
       .catch(err => console.log(err));
   };
   
   renderItems = () => {
     return this.state.menuList.map(item => (
       <li
         key={item.id}
         className="list-group-item d-flex justify-content-between align-items-center"
       >
         <span
           className={`menu-title mr-2`}
           title={item.date}
         >
           {item.recipe.name}
         </span>
         <span>
           <button
             onClick={() => this.editItem(item)}
             className="btn btn-secondary mr-2"
           >
             {" "}
             Edit{" "}
           </button>
           <button
             onClick={() => this.handleDelete(item)}
             className="btn btn-danger"
           >
             Delete{" "}
           </button>
         </span>
       </li>
     ));
   };
   toggle = () => {
     this.setState({ modal: !this.state.modal });
   };
   handleSubmit = item => {
     this.toggle();
     if (item.id) {
      axiosInstance
         .put(`/menus/${item.id}/`, item)
         .then(res => this.refreshList());
       return;
     }
     axiosInstance
       .post("/menus/", item)
       .then(res => this.refreshList());
   };
   handleDelete = item => {
    axiosInstance
       .delete(`/menus/${item.id}`)
       .then(res => this.refreshList());
   };
   createItem = () => {
     const item = { recipe_name: "", date: "", meal_time: "" };
     this.setState({ activeItem: item, modal: !this.state.modal });
   };
   editItem = item => {
     this.setState({ activeItem: item, modal: !this.state.modal });
   };
   render() {
     return (
       <main className="content">
         <h1 className="text-white text-uppercase text-center my-4">Menu app</h1>
         <div className="row ">
           <div className="col-md-6 col-sm-10 mx-auto p-0">
             <div className="card p-3">
               <div className="">
                 <button onClick={this.createItem} className="btn btn-primary">
                   Add task
                 </button>
               </div>
               <ul className="list-group list-group-flush">
                 {this.renderItems()}
               </ul>
             </div>
           </div>
         </div>
         {this.state.modal ? (
           <Modal
             activeItem={this.state.activeItem}
             toggle={this.toggle}
             onSave={this.handleSubmit}
           />
         ) : null}
       </main>
     );
   }
 }
 export default ManuPage;