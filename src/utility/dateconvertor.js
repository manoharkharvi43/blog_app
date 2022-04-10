export const convertDate = dateString => {
  const string = dateString.split("-");
  let dates = dateString.split("T")[0];
  let timeString = dateString.split("T")[1];
  let time = timeString.split(".")[0];
  // let year = string[0];
  // let month = string[1];
  // let date = string[2].slice(0, 2);
  return dates + "    " + time;
};
