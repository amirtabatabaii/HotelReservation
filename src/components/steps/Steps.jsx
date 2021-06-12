import React, { Component } from "react";
import "./steps.css";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepProgressBar from "react-step-progress";
import { setSelectedHotel } from "../../redux/action";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.setSelectedHotel(
      this.findHotelFilteredById(
        this.props.detailsOfHotels,
        localStorage.getItem("hotel_id")
      )
    );
  }

  addDataToLocalStorage = (itemName, itemValue) => {
    localStorage.setItem(itemName, itemValue);
  };

  hotelOnChange = (value) => {
    this.props.setSelectedHotel(
      this.findHotelFilteredById(this.props.detailsOfHotels, value)
    );
    // this.setState({ hotel_id: value });
    this.addDataToLocalStorage("hotel_id", value);
  };

  hotelOnSearch = (val) => {
    this.props.setSelectedHotel(
      this.findHotelFilteredById(this.props.detailsOfHotels, val)
    );
    // this.setState({ hotel_id: val });
    this.addDataToLocalStorage("hotel_id", val);
  };

  findHotelFilteredById = (array, id) => {
    return array.find((htl) => {
      return htl.hotel_id == id;
    });
  };

  pickerOnChange = (dates, dateStrings) => {
    // this.setState({ start_date: dateStrings[0], end_date: dateStrings[1] });
    this.addDataToLocalStorage("start_date", dateStrings[0]);
    this.addDataToLocalStorage("end_date", dateStrings[1]);
  };

  adultInputNumberOnChange = (value) => {
    // this.setState({ adult: value });
    this.addDataToLocalStorage("adult", value);
  };

  childInputNumberOnChange = (value) => {
    // this.setState({ child: value });
    this.addDataToLocalStorage("child", value);
  };

  roomSelectedOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "room_type") localStorage.setItem(name, value);
    if (name === "room_scenic") localStorage.setItem(name, value);
  };

  step1Validator = () => {
    if (
      !localStorage.getItem("hotel_id") ||
      !localStorage.getItem("start_date") ||
      !localStorage.getItem("end_date")
    )
      return false;
    return true;
  };

  step2Validator = () => {
    if (
      !localStorage.getItem("room_type") ||
      !localStorage.getItem("room_scenic")
    )
      return false;
    return true;
  };

  step3Validator = () => {
    // return a boolean
  };

  onFormSubmit = () => {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  };

  render() {
    return (
      <div className='p-2'>
        <StepProgressBar
          startingStep={0}
          onSubmit={this.onFormSubmit}
          previousBtnName='<< Geri'
          nextBtnName='Kaydet ve Devam Et'
          steps={[
            {
              label: "Otel Tarih Seçimi",
              name: "step 1",
              content: (
                <StepOne
                  adultInputNumberOnChange={this.adultInputNumberOnChange}
                  childInputNumberOnChange={this.childInputNumberOnChange}
                  pickerOnChange={this.pickerOnChange}
                  hotelOnSearch={this.hotelOnSearch}
                  hotelOnChange={this.hotelOnChange}
                />
              ),
              validator: this.step1Validator,
            },
            {
              label: "Oda Tipi Manzara Seçimi",
              name: "step 2",
              content: (
                <StepTwo roomSelectedOnChange={this.roomSelectedOnChange} />
              ),
              validator: this.step2Validator,
            },
            {
              label: "Önizleme Ödeme İşlemleri",
              name: "step 3",
              content: <StepThree />,
              validator: this.step3Validator,
            },
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listOfHotels: state.listOfHotels,
  detailsOfHotels: state.detailsOfHotels,
  selectedHotel: state.selectedHotel,
});

export default connect(mapStateToProps, { setSelectedHotel })(
  withRouter(Steps)
);
