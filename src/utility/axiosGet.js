import axios from "axios";

async function axiosGet(api, type, props) {
  return await axios.get(api).then((res) => {
    switch (type) {
      case "HotelLists":
        // console.log("aa", res.data);
        props.getHotelLists(res.data);
      //   default:
      //     return {};
    }
  });
}

export default axiosGet;
