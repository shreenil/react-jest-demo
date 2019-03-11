import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser, updateUser } from "../../redux/actions/userActions";

const countries = () => {
  return [
    "USA",
    "India",
    "UK",
    "Japan",
    "Canada",
    "Chaina",
    "Spain",
    "Greece",
    "France"
  ];
};

export class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.location.state.user,
      MODE: this.props.location.state.MODE,
      formGroup:
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.user
          ? this.props.location.state.user
          : {
              name: "",
              address: "",
              country: "",
              profilePhoto: "",
              phoneNumber: ""
            },
      formErrors: {
        name: "",
        address: "",
        country: "",
        profilePhoto: "",
        phoneNumber: ""
      },
      validations: {
        name: this.validateRequired,
        address: this.validateRequired,
        country: this.validateRequired,
        phoneNumber: this.validatePhoneNumber,
        profilePhoto: null
      },
      formPrestine: true
    };
  }

  validateRequired(field, inputtxt) {
    if (!inputtxt) {
      return field + " is required";
    }
    return "";
  }

  validatePhoneNumber(field, inputtxt) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneno)) {
      return "";
    } else {
      return "Please enter valid Phone number(000-0000-0000).";
    }
  }

  handleChange = event => {
    if(this.state.formPrestine) {
      this.setState({
        formPrestine: false
      })
    }
    let field = event.target.name;
    let value = event.target.value;
    this.setState({
      formGroup: {
        ...this.state.formGroup,
        [field]: value
      },
      formErrors: {
        ...this.state.formErrors,
        [field]: this.state.validations[field](field, value)
      }
    });
  };

  handleImageChange = event => {
    this.setState({
      formErrors: { ...this.state.formErrors, profilePhoto: "" }
    });
    
    let isInvalid = false;
    let file = event.target.files[0];
    console.log('file: ', file);
    if (!file) return;
    let file_extension = file.name.split(".").pop();
    if (file_extension !== "jpg" && file_extension !== "png") {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          profilePhoto:
            this.state.formErrors.profilePhoto +
            " Only .jpg and .png files are allowed."
        }
      });
      isInvalid = true;
    }
    if (file.size > 50000) {
      this.setState({
        formErrors: {
          ...this.state.formErrors,
          profilePhoto:
            this.state.formErrors.profilePhoto +
            " File size must be less then 50kb."
        }
      });
      isInvalid = true;
    }
    console.log(
      "this.state.formErrors.profilePhoto: ",
      this.state.formErrors.profilePhoto
    );

    if (!isInvalid) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        

        this.setState({
          formGroup: { ...this.state.formGroup, profilePhoto: e.target.result }
        });
      };
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    // this.props.location.submitHandler(this.state.formGroup);
    if (this.state.MODE === "ADD") this.props.addUser(this.state.formGroup);
    else {
      let users = Object.assign({}, this.state.user, this.state.formGroup);
      this.props.updateUser(users);
    }
    this.props.history.goBack();
  };

  componentDidMount() {}

  hasError() {
    let { name, address, country, profilePhoto, phoneNumber } = this.state.formErrors;
    if (name || address || country || profilePhoto || phoneNumber) {
        return true;
    } else {
      if(this.state.MODE != 'EDIT' && this.state.formPrestine)
        return true;      
      return false;
    }
  }

  render() {
    let { formErrors, formGroup, MODE } = this.state;
    let image = null;
    let nameErr = <span style={{ color: "red" }}>{formErrors.name}</span>;
    let addressErr = <span style={{ color: "red" }}>{formErrors.address}</span>;
    let countryErr = <span style={{ color: "red" }}>{formErrors.country}</span>;
    let phonenoErr = (
      <span style={{ color: "red" }}>{formErrors.phoneNumber}</span>
    );
    let imageErr = (
      <span style={{ color: "red" }}>{formErrors.profilePhoto}</span>
    );

    let countryList = countries().map(c => <option key={c}>{c}</option>);

    image = formGroup.profilePhoto ? (
      <img alt="" src={formGroup.profilePhoto} style={{ height: "80px" }} />
    ) : null;

    return (
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">{MODE === "ADD" ? "Add" : "Edit"} User</h4>
        </div>
        <div className="card-body">
          <form
            ref={myForm => (this.myForm = myForm)}
            onSubmit={this.handleSubmit}
          >
            <div className="form-group">
              <label id="name">Name</label>
              <input
                className="form-control"
                name="name"
                type="text"
                value={this.state.formGroup.name}
                onChange={this.handleChange}
                required
              />
              {nameErr}
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea className="form-control"
                name="address"
                value={this.state.formGroup.address}
                onChange={this.handleChange}></textarea>
              {/* <input
                className="form-control"
                name="address"
                type="text"
                value={this.state.formGroup.address}
                onChange={this.handleChange}
                required
              /> */}
              {addressErr}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                className="form-control"
                name="phoneNumber"
                placeholder="000-0000-0000"
                type="text"
                value={this.state.formGroup.phoneNumber}
                onChange={this.handleChange}
                required
              />
              {phonenoErr}
            </div>
            <div className="form-group">
              <label>Country</label>
              {/* <input
                className="form-control"
                name="country"
                type="text"
                value={this.state.formGroup.country}
                onChange={this.handleChange}
                required
              /> */}
              <select
                className="form-control"
                name="country"
                value={this.state.formGroup.country}
                onChange={this.handleChange}
              >
                {countryList}
              </select>
              {countryErr}
            </div>
            <div className="form-group">
              <label>Profile Photo</label>
              <input
                className="form-control"
                name="profilePhoto"
                type="file"
                onChange={this.handleImageChange}
              />
              {imageErr}
              <br />
              {image}
            </div>
            <button
              type="submit"
              disabled={this.hasError()}
              className="btn btn-success"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { addUser, updateUser }
)(UserForm);
