export function date_diff_indays(date1, date2) {
  let dt1 = new Date(date1);
  let dt2 = new Date(date2);

  return (
    Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    ) + 1
  );
}

export function calc_price(price, day, count) {
  return (price * day * count)
    .toFixed(3)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function find_hotel_name(array, id) {
  return array.find((htl) => htl.id == id).hotel_name;
}

export function find_room_type_scenic(array, id) {
  return array.find((htl) => htl.id == id).title;
}

export function find_room_price(array, id) {
  return array
    .find((htl) => htl.id == id)
    .price.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function find_room_percentage(array, id) {
  return array.find((htl) => htl.id == id).price_rate;
}

export function calc_end_price(price, day, count, percentage) {
  const firstPrice = Number(calc_price(price, day, count));
  const percentagePrice = Number(((firstPrice * percentage) / 100).toFixed(3));
  return firstPrice + percentagePrice;
}
