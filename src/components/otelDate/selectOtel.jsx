import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class selectOtel extends Component {
  constructor(props) {
    super(props);
    this.state = { listOfHotels: [], detailsOfHotels: [] };
  }

  render() {
    const { listOfHotels, detailsOfHotels } = this.props;

    return (
      <div>
        {listOfHotels.length > 0 && (
          <h1 className='pt-4 mt-5 text-center'>
            {listOfHotels[1].hotel_name}
          </h1>
        )}

        {detailsOfHotels.length > 0 && (
          <h1 className='pt-4 mt-5 text-center'>{detailsOfHotels[1].city}</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  listOfHotels: state.listOfHotels,
  detailsOfHotels: state.detailsOfHotels,
});

export default connect(mapStateToProps, {})(selectOtel);

// export default selectOtel;
