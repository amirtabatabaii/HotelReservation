import React, { Component } from "react";
import axios from "axios";
import Header from "./header";
import Steps from "../steps/Steps";
import { HotelListsApi, HotelDetailsApi } from "../../utility/apiUrl";
import {
  getHotelLists,
  getHotelsDetails,
  setSelectedHotel,
} from "../../redux/action";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  async componentDidMount() {
    await axios.get(HotelListsApi).then((res) => {
      if (res.status === 200) this.props.getHotelLists(res.data);
    });

    await axios.get(HotelDetailsApi).then((res) => {
      if (res.status === 200) this.props.getHotelsDetails(res.data);
    });

    this.props.setSelectedHotel(
      this.props.detailsOfHotels.find(
        (htl) => htl.hotel_id == localStorage.getItem("hotel_id")
      )
    );
  }

  render() {
    return (
      <>
        <Header />
        <Steps />
        {/* <Footer/> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  listOfHotels: state.listOfHotels,
  detailsOfHotels: state.detailsOfHotels,
});

export default connect(mapStateToProps, {
  getHotelLists,
  getHotelsDetails,
  setSelectedHotel,
})(withRouter(Home));
