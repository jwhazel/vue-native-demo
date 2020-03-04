import { DOMParser } from "react-native-html-parser";
import getTime from "./timestamp";

/**
 * Factory for returning a well formed object from Spring Hills News unofficial API
 */
export default (timestamp = getTime(), start = 1, limit = 12) => {
  return new Promise((resolve, reject) => {
    fetch("https://springhillnews.net/php/load_more.php", {
      body: `last_id=${timestamp}&start=${start}&limit=${limit}`,
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,la;q=0.8",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      method: "POST",
      mode: "cors"
    })
      .then(res => {
        return res.text();
      })
      .then(res => {
        return _parse(res);
      })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

  /**
   * Parse HTML into a structured object
   * @param {*} str - HTML string
   */
  function _parse(str) {
    //Fix the malformed onclick attribute if it exists
    str = _fixMalformedDom(str);

    //Parse the html into an object
    let parser = new DOMParser();
    let htmlBody = parser.parseFromString(str, "text/html");

    //Scrape the elements we're looking for
    let outlet = htmlBody.getElementsByClassName("source-text");
    let headline = htmlBody.getElementsByClassName("headline");
    let thumbnail = htmlBody.getElementsByClassName("img-responsive");
    let timestamp = htmlBody.getElementsByClassName("published");
    let url = htmlBody.querySelect(".headline > a");

    //HACK: deal with the duplicate <a> tags by removing all the odd ones
    url = url.filter((el, index) => index % 2 === 1);

    //Set up our output object
    var output = new Array(outlet.length).fill(null).map(() => ({}));

    //Fill our output object depending on the type of data we're looking for
    for (var i = 0; i < output.length; i++) {
      output[i].outlet = outlet[i].textContent;
      output[i].headline = headline[i].textContent;
      output[i].thumbnail = thumbnail[i].getAttribute("src");
      output[i].url = url[i].getAttribute("href");
      output[i].timestamp = timestamp[i].textContent.replace("Published: ", "");
    }
    return output;
  }

  /**
   * Fix the malformed onclick attribute
   * @param {*} str - HTML string
   */
  function _fixMalformedDom(str) {
    if (str.includes('onclick="ga("')) {
      str = str.replace(/"ga\("/g, "'ga(\"").replace(/"\)"/g, "\")'");
    }
    return str;
  }
};
