import React from "react";
import { Button } from "react-bootstrap";

function info(props) {
  return (
    <div>
      <p className='text-center'>
        <img className='m-2' src={props.addLogo} width={80} alt='insert' />
        <h4>Rezervasyon kaydınız alınmıştır. </h4>
        <h6>
          Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda
          değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri
          kullanabilirsiniz.
        </h6>
      </p>
      <div className='d-sm-flex justify-content-around text-center'>
        <Button
          className='btn btn-primary btn-lg m-1'
          onClick={props.handleNew}
        >
          Yeni Reservasyon Yap
        </Button>
        <Button
          className='btn btn-primary btn-lg m-1'
          onClick={props.handleEdit}
        >
          Reservasyonu Güncelle
        </Button>
        <Button
          className='btn btn-primary btn-lg m-1'
          onClick={props.handleDelete}
        >
          Reservasyonu İptal Et
        </Button>
      </div>
    </div>
  );
}

export default info;
