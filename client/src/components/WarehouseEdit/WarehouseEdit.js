import React from "react";
import axios from "axios";
import { API_URL } from "../../Utils/Utils";
import "./WarehouseEdit.scss";
import goBack from "../../assets/icons/arrow_back-24px.svg";
import Nav from "../Nav/Nav";
import { ReactComponent as Error } from "../../assets/icons/error-24px.svg";
import { Link } from "react-router-dom";

class WarehouseEdit extends React.Component {
  state = {
    name: "",
    address: "",
    city: "",
    country: "",
    contact: {
      contactName: "",
      position: "",
      phone: "",
      email: "",
    },
    // Field errors
    whNameError: false,
    whAddressError: false,
    whCityError: false,
    whCountryError: false,
    whContactNameError: false,
    whContactPositionError: false,
    whContactPhoneError: false,
    whContactEmailError: false,

    // Nav state
    currPage: "warehouse",
  };

  componentDidMount() {
    let query = this.props.match.params.id;

    axios
      .get(API_URL + "/warehouse/" + query)
      .then((response) => {
        this.setState({
          ...response.data.warehouse,
          contact: {
            ...response.data.warehouse.contact,
            contactName: response.data.warehouse.contact.name,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateName = (e) => {
    this.setState({
      name: e.target.value,
      whNameError: false,
    });
  };

  updateAddress = (e) => {
    this.setState({
      address: e.target.value,
      whAddressError: false,
    });
  };

  updateCity = (e) => {
    this.setState({
      city: e.target.value,
      whCityError: false,
    });
  };

  updateCountry = (e) => {
    this.setState({
      country: e.target.value,
      whCountryError: false,
    });
  };

  updateContactName = (e) => {
    this.setState({
      contact: {
        ...this.state.contact,
        contactName: e.target.value,
      },
      whContactNameError: false,
    });
  };

  updateContactPosition = (e) => {
    this.setState({
      contact: {
        ...this.state.contact,
        position: e.target.value,
      },
      whContactPositionError: false,
    });
  };

  updateContactPhone = (event) => {
    const phoneVal = event.target.value.replace(/\D/g, "").substr(0, 11);
    let formattedPhone = "";

    for (let i = 0; i < phoneVal.length; i++) {
      if (isNaN(phoneVal[i])) {
        continue;
      }
      if (i === 0) {
        formattedPhone += "+";
      }
      if (i === 1) {
        formattedPhone += " (";
      }
      if (i === 4) {
        formattedPhone += ") ";
      }
      if (i === 7) {
        formattedPhone += "-";
      }
      formattedPhone += phoneVal[i];
    }
    this.setState({
      contact: {
        ...this.state.contact,
        phone: formattedPhone,
      },
      whContactPhoneError: false,
    });
  };

  updateContactEmail = (e) => {
    this.setState({
      contact: {
        ...this.state.contact,
        email: e.target.value,
      },
      whContactEmailError: false,
    });
  };

  validateForm = () => {
    const { name, address, city, country } = this.state;
    const { contactName, position, phone, email } = this.state.contact;

    const validInput = {
      name: true,
      address: true,
      city: true,
      country: true,
      contact: {
        contactName: true,
        position: true,
        phone: true,
        email: true,
      },
    };

    if (!name) {
      validInput.name = false;
      this.setState({
        whNameError: true,
      });
    }

    if (!address) {
      validInput.address = false;
      this.setState({
        whAddressError: true,
      });
    }

    if (!city) {
      validInput.city = false;
      this.setState({
        whCityError: true,
      });
    }

    if (!country) {
      validInput.country = false;
      this.setState({
        whCountryError: true,
      });
    }

    if (!contactName) {
      validInput.contact.contactName = false;
      this.setState({
        whContactNameError: true,
      });
    }

    if (!position) {
      validInput.contact.position = false;
      this.setState({
        whContactPositionError: true,
      });
    }

    if (!phone) {
      validInput.contact.phone = false;
      this.setState({
        whContactPhoneError: true,
      });
    }

    if (phone.length <= 16) {
      validInput.contact.phone = false;
      this.setState({
        whContactPhoneError: true,
      });
    }

    if (!email) {
      validInput.contact.email = false;
      this.setState({
        whContactEmailError: true,
      });
    }

    if (!email.split("").includes("@")) {
      validInput.contact.email = false;
      this.setState({
        whContactEmailError: true,
      });
      console.log("Provide a valid email");
    }

    if (
      validInput.name &&
      validInput.address &&
      validInput.city &&
      validInput.country &&
      validInput.contact.contactName &&
      validInput.contact.position &&
      validInput.contact.phone &&
      validInput.contact.email
    ) {
      return true;
    }
  };

  editWarehouse = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      let warehouseId = this.props.match.params.id;

      axios
        .put("http://localhost:8080/warehouse/" + warehouseId, this.state)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });

      window.setTimeout(() => {
        this.props.history.push(this.props.match.params.id);
      }, 500);
    }
  };

  render() {
    const { name, address, city, country } = this.state;
    const { contactName, position, phone, email } = this.state.contact;

    const filledName = this.state.whNameError
      ? "warehouse-edit__details-input warehouse-edit__details-input--error"
      : "warehouse-edit__details-input";

    const filledAddress = this.state.whAddressError
      ? "warehouse-edit__details-input warehouse-edit__details-input--error"
      : "warehouse-edit__details-input";

    const filledCity = this.state.whCityError
      ? "warehouse-edit__details-input warehouse-edit__details-input--error"
      : "warehouse-edit__details-input";

    const filledCountry = this.state.whCountryError
      ? "warehouse-edit__details-input warehouse-edit__details-input--error"
      : "warehouse-edit__details-input";

    const filledContactName = this.state.whContactNameError
      ? "warehouse-edit__details-input warehouse-edit__details-input--error"
      : "warehouse-edit__details-input";

    const filledContactPosition = this.state.whContactPositionError
      ? "warehouse-edit__details-input warehouse-edit__details-input--error"
      : "warehouse-edit__details-input";

    const filledContactPhone = this.state.whContactPhoneError
      ? "warehouse-edit__details-input warehouse-edit__details-input--error"
      : "warehouse-edit__details-input";

    const filledContactEmail = this.state.whContactEmailError
      ? "warehouse-edit__details-input warehouse-edit__details-input--error"
      : "warehouse-edit__details-input";

    return (
      <div>
        <Nav currPage={this.state.currPage} />
        <section className="warehouse-edit">
          <div className="warehouse-edit__header">
            <Link to={`/warehouse/${this.props.match.params.id}`}>
              <img
                className="warehouse-edit__goback"
                src={goBack}
                alt="go back arrow"
              />
            </Link>
            <h1 className="warehouse-edit__title">Edit Warehouse</h1>
          </div>
          <form className="warehouse-edit__form" onSubmit={this.editWarehouse}>
            <div className="warehouse-edit__wrapper">
              <div className="warehouse-edit__details">
                <h1 className="warehouse-edit__details-title">
                  Warehouse Details
                </h1>
                <h3 className="warehouse-edit__details-label">
                  Warehouse Name
                </h3>
                <input
                  className={filledName}
                  type="text"
                  name="name"
                  onChange={this.updateName}
                  value={name}
                  placeholder="Warehouse Name"
                />
                {this.state.whNameError && (
                  <h5 className="warehouse-edit__details-input-error">
                    <Error className="warehouse-edit__details-input-icon" />
                    This Field is required
                  </h5>
                )}
                <h3 className="warehouse-edit__details-label">
                  Street Address
                </h3>
                <input
                  className={filledAddress}
                  type="text"
                  name="address"
                  onChange={this.updateAddress}
                  value={address}
                  placeholder="Address"
                />
                {this.state.whAddressError && (
                  <h5 className="warehouse-edit__details-input-error">
                    <Error className="warehouse-edit__details-input-icon" />
                    This Field is required
                  </h5>
                )}
                <h3 className="warehouse-edit__details-label">City</h3>
                <input
                  className={filledCity}
                  type="text"
                  name="city"
                  onChange={this.updateCity}
                  value={city}
                  placeholder="City"
                />
                {this.state.whCityError && (
                  <h5 className="warehouse-edit__details-input-error">
                    <Error className="warehouse-edit__details-input-icon" />
                    This Field is required
                  </h5>
                )}
                <h3 className="warehouse-edit__details-label">Country</h3>
                <input
                  className={filledCountry}
                  type="text"
                  name="country"
                  onChange={this.updateCountry}
                  value={country}
                  placeholder="Country"
                />
                {this.state.whCountryError && (
                  <h5 className="warehouse-edit__details-input-error">
                    <Error className="warehouse-edit__details-input-icon" />
                    This Field is required
                  </h5>
                )}
              </div>
              <div className="warehouse-edit__details">
                <h1 className="warehouse-edit__details-title">
                  Contact Details
                </h1>
                <h3 className="warehouse-edit__details-label">Contact Name</h3>
                <input
                  className={filledContactName}
                  type="text"
                  name="contactName"
                  onChange={this.updateContactName}
                  value={contactName}
                  placeholder="Contact Name"
                />
                {this.state.whContactNameError && (
                  <h5 className="warehouse-edit__details-input-error">
                    <Error className="warehouse-edit__details-input-icon" />
                    This Field is required
                  </h5>
                )}
                <h3 className="warehouse-edit__details-label">Position</h3>
                <input
                  className={filledContactPosition}
                  type="text"
                  name="position"
                  onChange={this.updateContactPosition}
                  value={position}
                  placeholder="Position"
                />
                {this.state.whContactPositionError && (
                  <h5 className="warehouse-edit__details-input-error">
                    <Error className="warehouse-edit__details-input-icon" />
                    This Field is required
                  </h5>
                )}
                <h3 className="warehouse-edit__details-label">Phone Number</h3>
                <input
                  className={filledContactPhone}
                  type="text"
                  name="phone"
                  onChange={this.updateContactPhone}
                  value={phone}
                  placeholder="Phone Number"
                  autoComplete="off"
                />
                {this.state.whContactPhoneError && (
                  <h5 className="warehouse-edit__details-input-error">
                    <Error className="warehouse-edit__details-input-icon" />
                    This Field is required
                  </h5>
                )}
                <h3 className="warehouse-edit__details-label">Email</h3>
                <input
                  className={filledContactEmail}
                  type="text"
                  name="email"
                  onChange={this.updateContactEmail}
                  value={email}
                  placeholder="Email"
                />
                {this.state.whContactEmailError && (
                  <h5 className="warehouse-edit__details-input-error">
                    <Error className="warehouse-edit__details-input-icon" />
                    This Field is required
                  </h5>
                )}
              </div>
            </div>
            <div className="warehouse-edit__details-CTA">
              <Link to={`/warehouse/${this.props.match.params.id}`}>
                <button
                  type="button"
                  className="warehouse-edit__details-cancel"
                >
                  Cancel
                </button>
              </Link>

              <button className="warehouse-edit__details-save">Save</button>
            </div>
          </form>
        </section>
        <p className="warehouse-edit__details-footer">
          © InStock Inc. All Rights Reserved.
        </p>
      </div>
    );
  }
}

export default WarehouseEdit;
