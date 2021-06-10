import React, { Component } from "react";
import Header from "./header";
import OtelDate from "../otelDate/index";
// import axiosGet from "../../utility/axiosGet";
import { HotelListsApi, HotelDetailsApi } from "../../utility/apiUrl";
import { withRouter } from "react-router-dom";
import { getHotelLists, getHotelsDetails } from "../../redux/action";
import { connect } from "react-redux";
import axios from "axios";

class index extends Component {
  async axiosGet(api, type) {
    await axios.get(api).then((res) => {
      switch (type) {
        case "HotelLists":
          this.props.getHotelLists(res.data);

        case "HotelsDetail":
          this.props.getHotelsDetails(res.data);

        // default: {
        // }
      }
    });
  }

  componentWillMount() {
    this.axiosGet(HotelListsApi, "HotelLists");
    this.axiosGet(HotelDetailsApi, "HotelsDetail");
  }

  render() {
    return (
      <>
        <Header />
        <OtelDate />

        <footer className='m-5 p-5'>
          <h1>footer</h1>
        </footer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  listOfHotels: state.listOfHotels,
  detailsOfHotels: state.detailsOfHotels,
});

export default connect(mapStateToProps, { getHotelLists, getHotelsDetails })(
  withRouter(index)
);
// export default index;
