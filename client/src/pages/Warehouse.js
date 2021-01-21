import { Component } from "react";
import axios from "axios";
import Warehouses from "../components/Warehouses/Warehouses.js";
import Nav from "../components/Nav/Nav";
import { API_URL } from "../Utils/Utils";
import WarehouseDetail from "../components/WarehouseDetail/WarehouseDetail";
class Warehouse extends Component {
  state = {
    main: {},
    currPage: "warehouse",
    deleteToggle: false,
    deleteInfo: {
      deleteId: null,
      deleteName: null,
    },
    warehouseInv: null,
  };

  getWarehouseInv(query) {
    axios
      .get(API_URL + "/warehouse/" + query)
      .then((response) => {
        this.setState({ warehouseInv: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.getWarehouseInv(this.props.match.params.id);
    } else {
      axios.get("http://localhost:8080/warehouse").then((response) => {
        this.setState({ main: response.data });
      });
    }
  }

  handleComfirm = () => {
    axios
      .delete(
        "http://localhost:8080/warehouse/" + this.state.deleteInfo.deleteId
      )
      .then((response) => {
        this.setState({
          main: response.data,
          deleteToggle: false,
        });
      });
  };

  handleDelete = (id, name) => {
    this.setState({
      deleteToggle: true,
      deleteInfo: {
        deleteId: id,
        deleteName: name,
      },
    });
  };

  mainToggle = () => {
    this.setState({
      deleteToggle: false,
    });
  };

  componentDidUpdate(prevProps) {
    let query = this.props.match.params.id;
    if (prevProps.match.params.id !== query) {
      this.getWarehouseInv(query);
    }
    if (prevProps.match.params.id && this.props.match.path === "/") {
      axios.get("http://localhost:8080/warehouse").then((response) => {
        this.setState({
          main: response.data,
          warehouseInv: null,
          currPage: "warehouse",
        });
      });
    }
  }

  render() {
    return (
      <div>
        <Nav currPage={this.state.currPage} />
        {!this.state.warehouseInv && (
          <Warehouses
            list={this.state.main}
            handleConfirm={this.handleComfirm}
            handleDelete={this.handleDelete}
            mainToggle={this.mainToggle}
            deleteToggle={this.state.deleteToggle}
            deleteInfo={this.state.deleteInfo}
          />
        )}
        {this.state.warehouseInv && (
          <WarehouseDetail warehouse={this.state.warehouseInv} />
        )}
      </div>
    );
  }
}

export default Warehouse;
