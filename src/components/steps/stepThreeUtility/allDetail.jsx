import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";

class allDetail extends Component {
  render() {
    return (
      <Container>
        <Row className='m-auto justify-content-center text-center'>
          <Col className='rounded bg-white p-3 m-3'>
            <span className='h5'>
              {this.props.find_hotel_name(
                this.props.listOfHotels,
                localStorage.getItem("hotel_id")
              )}
            </span>
            <span className='h6 m-2'>({this.props.selectedHotel.city})</span>
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
              {this.props.find_room_type_scenic(
                this.props.selectedHotel.room_type,
                localStorage.getItem("room_type")
              )}
            </p>
          </Col>
          <Col className='rounded bg-white p-2 m-3'>
            <b>Manzara:</b>
            <p>
              {this.props.find_room_type_scenic(
                this.props.selectedHotel.room_scenic,
                localStorage.getItem("room_scenic")
              )}
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default allDetail;