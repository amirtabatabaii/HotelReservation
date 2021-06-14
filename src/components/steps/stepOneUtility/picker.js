import React from "react";
import { DatePicker, Space } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

function picker(props) {
  return (
    <Space direction='vertical' size={12}>
      <RangePicker
        defaultValue={
          props.start_date && props.end_date
            ? [
                moment(props.start_date, "YYYY/MM/DD"),
                moment(props.end_date, "YYYY/MM/DD"),
              ]
            : ["", ""]
        }
        // size='large'
        ranges={{
          Today: [moment(), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")],
        }}
        onChange={props.pickerOnChange}
      />
    </Space>
  );
}

export default picker;
