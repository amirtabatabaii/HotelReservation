import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setSelectedHotel } from "../../redux/action";
import { Row, Col, Container } from "react-bootstrap";
import moment from "moment";
import {
  date_diff_indays,
  calc_price,
  find_hotel_name,
  find_room_type_scenic,
  find_room_price,
  find_room_percentage,
  calc_end_price,
  notification_with_icon,
} from "../../utility/utility";
import BankCard from "./stepThreeUtility/bankCard";
import CardDetail from "./stepThreeUtility/cardDetail";
import AllSelectedHotelDetail from "./stepThreeUtility/allDetail";
import CalcPrice from "./stepThreeUtility/calcPriceDetail";
import { Button, Form, Input, Space } from "antd";
import axios from "axios";
import { HotelCodeApi } from "../../utility/apiUrl";

const { Search } = Input;

class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crdt_number: "",
      crdt_name: "",
      crdt_month: "",
      crdt_year: "",
      crdt_cvv: "",
      coupon_code: "",
      coupon_code_discount: "",
    };
  }

  // componentWillMount() {
  //   this.props.setSelectedHotel(
  //     this.props.detailsOfHotels.find(
  //       (htl) => htl.hotel_id == localStorage.getItem("hotel_id")
  //     )
  //   );
  // }

  handelInputChange = (e) => {
    const txt = e.target.validity.valid ? e.target.value : "";

    this.setState(
      {
        [e.target.name]: txt, //e.target.value,
      },
      () => localStorage.setItem(e.target.name, txt)
    );
  };

  handleDateChange = (value) => {
    // console.log(value);
    if (value.label.length > 2)
      this.setState(
        {
          crdt_month: value.value.toString(),
        },
        () => localStorage.setItem("crdt_month", value.value.toString())
      );
    else
      this.setState(
        {
          crdt_year: value.value,
        },
        () => localStorage.setItem("crdt_year", value.value)
      );
  };

  onCodeSearch = (value) => {
    axios
      .get(HotelCodeApi + `?code=${value.code.toUpperCase()}`)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          if (res.data.length === 0)
            notification_with_icon(
              "error",
              "Code Bulunmadı",
              "Aradağımız Code Bulunmadı...!"
            );

          if (res.data.length >= 1) {
            //date
            const today = moment(moment().toDate()).format("YYYY-MM-DD");
            const code_date = res.data[0].expiration_at;
            // console.log(res.data[0].expiration_at);
            const diff = date_diff_indays(today, code_date);
            if (diff < 0)
              notification_with_icon(
                "error",
                "Code Geçersiz",
                "Girdiğiniz Code Tarih nedeniyle Geçersiz...!"
              );
            else {
              notification_with_icon(
                "success",
                "Code Başarıyla Eklendi",
                "Girdiğiniz Code Başarıyla Eklendi...!"
              );
              this.setState(
                {
                  coupon_code: res.data[0].code,
                  coupon_code_discount: res.data[0].discount_ammount,
                },
                () => {
                  localStorage.setItem("coupon_code", this.state.coupon_code);
                  localStorage.setItem(
                    "code_discount",
                    this.state.coupon_code_discount
                  );
                }
              );
            }
          }
        }
      });
  };

  render() {
    return (
      <div className='mt-5'>
        <Container>
          <Row className='w-100 m-auto justify-content-center '>
            <Col className='border rounded m-1' lg={7}>
              <Col lg={12}>
                <BankCard
                  crdt_number={this.state.crdt_number}
                  crdt_name={this.state.crdt_name}
                  crdt_month={this.state.crdt_month}
                  crdt_year={this.state.crdt_year}
                  crdt_cvv={this.state.crdt_cvv}
                />
              </Col>
              <Col lg={12} className='p-5'>
                <CardDetail
                  handelInputChange={this.handelInputChange}
                  crdt_number={this.state.crdt_number}
                  crdt_name={this.state.crdt_name}
                  handleDateChange={this.handleDateChange}
                  crdt_cvv={this.state.crdt_cvv}
                />
              </Col>
            </Col>

            <Col className='bg-light rounded m-1' lg={4}>
              <Col lg={12}>
                <AllSelectedHotelDetail
                  find_hotel_name={find_hotel_name}
                  listOfHotels={this.props.listOfHotels}
                  selectedHotel={this.props.selectedHotel}
                  find_room_type_scenic={find_room_type_scenic}
                />
              </Col>
              <Col lg={12}>
                <Container>
                  <Row className='m-auto'>
                    <Col className='rounded bg-white p-3 m-3'>
                      <Form
                        name='basic'
                        initialValues={{
                          remember: true,
                        }}
                        onFinish={this.onCodeSearch}
                        className='d-flex justify-content-around m-auto'
                      >
                        <Form.Item
                          name='code'
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item>
                          <Button type='primary' htmlType='submit'>
                            Kodu Kullan
                          </Button>
                        </Form.Item>
                      </Form>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col lg={12}>
                <Container>
                  <Row className='m-auto justify-content-center'>
                    <Col className='rounded bg-white ps-1 m-3'>
                      <CalcPrice
                        selectedHotel={this.props.selectedHotel}
                        find_room_price={find_room_price}
                        find_room_percentage={find_room_percentage}
                        date_diff_indays={date_diff_indays}
                        calc_price={calc_price}
                        calc_end_price={calc_end_price}
                        coupon_code={this.state.coupon_code}
                        coupon_code_discount={this.state.coupon_code_discount}
                      />
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listOfHotels: state.listOfHotels,
  detailsOfHotels: state.detailsOfHotels,
  selectedHotel: state.selectedHotel,
});

export default connect(mapStateToProps, {})(withRouter(StepThree));
