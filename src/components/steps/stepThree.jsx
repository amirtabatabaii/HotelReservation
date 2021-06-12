import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setSelectedHotel } from "../../redux/action";
import InputBox from "./stepThreeUtility/inputBox";
import { Row, Col, Container } from "react-bootstrap";
import { Input } from "antd";
import { Select } from "antd";
import { year, month } from "../../utility/apiUrl";
import { Divider } from "antd";
import {
  date_diff_indays,
  calc_price,
  find_hotel_name,
  find_room_type_scenic,
  find_room_price,
  find_room_percentage,
  calc_end_price,
} from "../../utility/utility";

const { Option } = Select;

class StepThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crdt_number: "",
      crdt_name: "",
      crdt_month: "",
      crdt_year: "",
      crdt_cvv: "",
    };
  }

  componentWillMount() {
    this.props.setSelectedHotel(
      this.props.detailsOfHotels.find(
        (htl) => htl.hotel_id == localStorage.getItem("hotel_id")
      )
    );
  }

  handelNumericInputChange = (e) => {
    const crdt_number = e.target.validity.valid
      ? e.target.value
      : this.state.crdt_number;

    this.setState({
      [e.target.name]: crdt_number, //e.target.value,
    });
  };

  handelInputChange = (e) => {
    const txt = e.target.validity.valid ? e.target.value : "";

    this.setState(
      {
        [e.target.name]: txt, //e.target.value,
      }
      // () => console.log(this.state)
    );
  };

  handleDateChange = (value) => {
    // console.log(value);
    if (value.label.length > 2)
      this.setState(
        {
          crdt_month: value.value.toString(),
        }
        // () => console.log(this.state)
      );
    else
      this.setState(
        {
          crdt_year: value.value,
        }
        // () => console.log(this.state)
      );
  };

  render() {
    return (
      <div className='mt-5'>
        <Container>
          <Row className='w-100 m-auto justify-content-center '>
            <Col className='border rounded m-1' lg={7}>
              <Col lg={12}>
                <div className='container3 p-3'>
                  <img
                    fluid
                    src='https://images.contentstack.io/v3/assets/bltcf46bbde1704bd18/blt45ea081fb3b6dd38/5f9933271a81c1644e9965a0/CC-Image-CIMB-eCC-01.png?quality=70'
                    alt='card'
                    style={{ "max-width": "100%" }}
                  />
                  <div className='crdt-number'>
                    {this.state.crdt_number
                      .replace(/(\d{4})/g, "$1 ")
                      .replace(/(^\s+|\s+$)/, "")}
                  </div>
                  <div className='crdt-name'>{this.state.crdt_name}</div>
                  <div className='crdt-date'>
                    {this.state.crdt_month}/{this.state.crdt_year}
                  </div>
                  <div className='crdt-cvv'>{this.state.crdt_cvv}</div>
                </div>
              </Col>
              <Col lg={12} className='p-5'>
                <fieldset className='scheduler-border'>
                  <legend className='scheduler-border'>Kart Bilgileri</legend>

                  <Row className='w-100 p-3'>
                    <label>Kart Numarası</label>
                    <Input
                      placeholder='Kart Numarasını Giriniz'
                      name='crdt_number'
                      type='text'
                      pattern='[0-9]*'
                      onChange={this.handelInputChange}
                      maxLength={16}
                      value={this.state.crdt_number}
                    />
                  </Row>

                  <Row className='w-100 p-3'>
                    <label>Kartın Üzerindeki İsim</label>
                    <Input
                      placeholder='Kartın Üzerindeki İsim Giriniz'
                      name='crdt_name'
                      type='text'
                      onChange={this.handelInputChange}
                      maxLength={30}
                      value={this.state.crdt_name}
                    />
                  </Row>

                  <Row className='w-100 p-3'>
                    <Col lg={8}>
                      <label>Kartın Son Kullanma Tarihi</label>
                      <Select
                        labelInValue
                        placeholder='Ay'
                        name='crdt_month'
                        style={{ width: 150 }}
                        onChange={this.handleDateChange}
                      >
                        {month.map((month, index) => (
                          <Option key={index} value={index + 1}>
                            {month}
                          </Option>
                        ))}
                      </Select>

                      <Select
                        labelInValue
                        placeholder='Yıl'
                        name='crdt_year'
                        style={{ width: 150 }}
                        onChange={this.handleDateChange}
                      >
                        {year.map((year, index) => (
                          <Option key={index} value={year}>
                            {year}
                          </Option>
                        ))}
                      </Select>
                    </Col>
                    <Col lg={4}>
                      <label>CVV</label>
                      <Input
                        placeholder='CVV Giriniz'
                        name='crdt_cvv'
                        type='text'
                        pattern='[0-9]*'
                        onChange={this.handelInputChange}
                        maxLength={3}
                        value={this.state.crdt_cvv}
                      />
                    </Col>
                  </Row>
                </fieldset>
              </Col>
            </Col>

            <Col className='bg-light rounded m-1' lg={4}>
              <Col lg={12}>
                <Container>
                  <Row className='m-auto justify-content-center text-center'>
                    <Col className='rounded bg-white p-3 m-3'>
                      <span className='h5'>
                        {find_hotel_name(
                          this.props.listOfHotels,
                          localStorage.getItem("hotel_id")
                        )}
                      </span>
                      <span className='h6 m-2'>
                        {this.props.selectedHotel.city}
                      </span>
                    </Col>
                  </Row>

                  <Row className='m-auto justify-content-center text-center'>
                    <Col className='rounded bg-white p-2 m-3'>
                      <b>Giriş Tarihi:</b>
                      <p>{localStorage.getItem("start_date")}</p>
                    </Col>
                    <Col className='rounded bg-white p-2 m-3'>
                      <b>Çıkış Tarihi:</b>
                      <p>{localStorage.getItem("end_date")}</p>
                    </Col>
                  </Row>
                  <Row className='m-auto justify-content-center text-center'>
                    <Col className='rounded bg-white p-2 m-3'>
                      <b>Yetişkin:</b>
                      <p>{localStorage.getItem("adult")}</p>
                    </Col>
                    <Col className='rounded bg-white p-2 m-3'>
                      <b>Çocuk:</b>
                      <p>{localStorage.getItem("child")}</p>
                    </Col>
                  </Row>
                  <Row className='m-auto justify-content-center text-center'>
                    <Col className='rounded bg-white p-2 m-3'>
                      <b>Oda Tipi:</b>
                      <p>
                        {find_room_type_scenic(
                          this.props.selectedHotel.room_type,
                          localStorage.getItem("room_type")
                        )}
                      </p>
                    </Col>
                    <Col className='rounded bg-white p-2 m-3'>
                      <b>Manzara:</b>
                      <p>
                        {find_room_type_scenic(
                          this.props.selectedHotel.room_scenic,
                          localStorage.getItem("room_scenic")
                        )}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col lg={12}>
                <Container>
                  <Row className='m-auto justify-content-center text-center'>
                    <Col className='rounded bg-white p-3 m-3'>
                      <b>Kupon...</b>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col lg={12}>
                <Container>
                  <Row className='m-auto justify-content-center'>
                    <Col className='rounded bg-white p-1 m-3'>
                      <Container>
                        <Row>
                          <Col className='p-2 text-left'>Oda Fiyatı</Col>
                          <Col className='p-2 float-right'>
                            {find_room_price(
                              this.props.selectedHotel.room_type,
                              localStorage.getItem("room_type")
                            ) + " TL"}
                          </Col>
                        </Row>
                        <Row>
                          <Col className='p-2 text-left'>Fiyat Etki Oranı</Col>
                          <Col className='p-2 float-right'>
                            {"%" +
                              find_room_percentage(
                                this.props.selectedHotel.room_scenic,
                                localStorage.getItem("room_scenic")
                              )}
                          </Col>
                        </Row>
                        <Row>
                          <Col className='p-2 text-left'>
                            Konaklama (
                            {date_diff_indays(
                              localStorage.getItem("start_date"),
                              localStorage.getItem("end_date")
                            ) + " GÜN"}
                            )
                          </Col>
                          <Col className='p-2 float-right'>
                            {calc_price(
                              find_room_price(
                                this.props.selectedHotel.room_type,
                                localStorage.getItem("room_type")
                              ),
                              date_diff_indays(
                                localStorage.getItem("start_date"),
                                localStorage.getItem("end_date")
                              ),
                              localStorage.getItem("adult")
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col className='p-2 text-left'>İndirim</Col>
                          <Col className='p-2 float-right'>3 of 3</Col>
                        </Row>
                      </Container>
                      <Divider />
                      <h5 className='text-center'>TOPLAM TUTAR</h5>
                      <h2 className='text-center'>
                        {calc_end_price(
                          find_room_price(
                            this.props.selectedHotel.room_type,
                            localStorage.getItem("room_type")
                          ),
                          date_diff_indays(
                            localStorage.getItem("start_date"),
                            localStorage.getItem("end_date")
                          ),
                          localStorage.getItem("adult"),
                          find_room_percentage(
                            this.props.selectedHotel.room_scenic,
                            localStorage.getItem("room_scenic")
                          )
                        ) + " TL"}
                      </h2>
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

export default connect(mapStateToProps, { setSelectedHotel })(
  withRouter(StepThree)
);
