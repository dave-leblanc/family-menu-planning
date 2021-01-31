  // frontend/src/App.js

  import React, { Component } from "react";
  import Modal from "./components/Modal";
  const menuItems = [
    {
      id: 1,
      recipe: "Go to Market",
      date: "Sat Jan 30",
      meal_time: "Supper",
      completed: false
    },
    {
      id: 2,
      recipe: "Study",
      date: "Sun Jan 31",
      meal_time: "Supper",
      completed: false
    },
    {
      id: 3,
      recipe: "Sally's books",
      date: "Mon Feb 1",
      meal_time: "Supper",
      completed: false
    },
    {
      id: 4,
      recipe: "Article",
      date: "Tue Feb 2",
      meal_time: "Supper",
      completed: false
    }
  ];
  class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        viewCompleted: false,
        activeItem: {
          recipe: "",
          date: "",
          meal_time: "",
          completed: false
        },
        menuList: menuItems
      };
    }
    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };
    handleSubmit = item => {
      this.toggle();
      alert("save" + JSON.stringify(item));
    };
    handleDelete = item => {
      alert("delete" + JSON.stringify(item));
    };
    createItem = () => {
      const item = { recipe: "", date: "", meal_time: "", completed: false };
      this.setState({ activeItem: item, modal: !this.state.modal });
    };
    editItem = item => {
      this.setState({ activeItem: item, modal: !this.state.modal });
    };
    displayCompleted = status => {
      if (status) {
        return this.setState({ viewCompleted: true });
      }
      return this.setState({ viewCompleted: false });
    };
    renderTabList = () => {
      return (
        <div className="my-5 tab-list">
          <span
            onClick={() => this.displayCompleted(true)}
            className={this.state.viewCompleted ? "active" : ""}
          >
            complete
          </span>
          <span
            onClick={() => this.displayCompleted(false)}
            className={this.state.viewCompleted ? "" : "active"}
          >
            Incomplete
          </span>
        </div>
      );
    };
    renderItems = () => {
      const { viewCompleted } = this.state;
      const newItems = this.state.menuList.filter(
        item => item.completed === viewCompleted
      );
      return newItems.map(item => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={`menu-title mr-2 ${
              this.state.viewCompleted ? "completed-menu" : ""
            }`}
            title={item.date}
          >
            {item.recipe}
          </span>
          <span>
            <button
              onClick={() => this.editItem(item)}
              className="btn btn-secondary mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => this.handleDelete(item)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </span>
        </li>
      ));
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
                {this.renderTabList()}
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
  export default App;