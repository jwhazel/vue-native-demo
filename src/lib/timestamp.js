/**
 * Export the current UTC timestamp
 */
export default () => {
  let d = new Date();
  let year = d.getUTCFullYear();
  let month =
    d.getUTCMonth() + 1 < 10
      ? "0" + (d.getUTCMonth() + 1)
      : d.getUTCMonth() + 1;
  let date = d.getUTCDate() < 10 ? "0" + d.getUTCDate() : d.getUTCDate();
  let hours = d.getUTCHours() < 10 ? "0" + d.getUTCHours() : d.getUTCHours();
  let minutes =
    d.getUTCMinutes() < 10 ? "0" + d.getUTCMinutes() : d.getUTCMinutes();
  let seconds =
    d.getUTCSeconds() < 10 ? "0" + d.getUTCSeconds() : d.getUTCSeconds;
  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};
