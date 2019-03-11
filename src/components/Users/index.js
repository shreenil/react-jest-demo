import React, { Component } from "react";
import UserRow from "./UserRow";
import styles from "./user.module.css";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/actions/userActions";

class Events extends Component {
  EDIT_MODE = false;

  componentWillMount() {
    this.props.fetchUsers();
  }

  enableEditMode = user => {
    this.props.history.push({
      pathname: "/edit",
      state: { MODE: "EDIT", user: user },
      submitHandler: this.saveRecord
    });
  };

  enableAddMode = () => {
    this.props.history.push({
      pathname: "/add",
      state: { MODE: "ADD" },
      submitHandler: this.saveRecord
    });
  };

  deleteButtonHandler = item => {
    if (window.confirm(`Are you sure want to delete this record ?`)) {
      this.props.deleteUser(item);
    }
  };

  render() {
    let { users } = this.props.users;
    let eventList = users ? (
      users.map(user => (
        <UserRow
          deleteButtonHandler={this.deleteButtonHandler}
          editButtonHandler={this.enableEditMode}
          key={user.id}
          user={user}
        />
      ))
    ) : (
      <tr>
        <td>No records to show.</td>
      </tr>
    );
    return (
      <div>
        <table  className="table table-bordered table-striped">
          <caption style={{ captionSide: "top" }} className={styles.caption}>
            <button
              onClick={() => this.enableAddMode()}
              className="btn btn-success"
            >
              <span className="glyphicon glyphicon-plus" /> Add new
            </button>
          </caption>
          <thead>
            <tr>
              <th>Profile Photo</th>
              <th>Name</th>
              <th>Address</th>
              <th>Country</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{eventList}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state, ownState) => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { fetchUsers, deleteUser }
)(Events);
