function timeConversion(s) {
  let hours = parseInt(s.substring(0, 2));
  const minutesAndSeconds = s.substring(2, 8);
  const period = s.substring(8);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  }

  if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const formattedHours = hours.toString().padStart(2, "0");
  return formattedHours + minutesAndSeconds;
}

console.log(timeConversion("07:05:45PM"));
console.log(timeConversion("07:05:45AM"));
console.log(timeConversion("00:05:45AM"));
console.log(timeConversion("00:05:45PM"));