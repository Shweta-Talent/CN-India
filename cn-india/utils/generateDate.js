exports.generateDates = async (auditionDateFrom, auditionDateTo) => {
  const dateList = [];
  let start_date = new Date(auditionDateFrom);
  let end_date = new Date(auditionDateTo);
  while (start_date <= end_date) {
    dateList.push(new Date(start_date));

    start_date.setDate(start_date.getDate() + 1);
  }

  return dateList;
};
