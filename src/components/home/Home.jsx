import React, { Component } from "react";
import axios from "axios";
import Header from "./header";
// import MainStep from "../steps/MainStep";
import Steps from "../steps/Steps";
import { HotelListsApi, HotelDetailsApi } from "../../utility/apiUrl";
import { getHotelLists, getHotelsDetails } from "../../redux/action";
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
  }

  render() {
    return (
      <>
        <Header />
        <Steps />

        {/* <footer className='m-5 p-5'>
          <h1>footer</h1>
        </footer> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  listOfHotels: state.listOfHotels,
  detailsOfHotels: state.detailsOfHotels,
});

export default connect(mapStateToProps, { getHotelLists, getHotelsDetails })(
  withRouter(Home)
);
