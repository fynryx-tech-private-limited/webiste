const url = "https://sheet.zoho.in/sheet/publishedrange/420aacb6e68c3747889821322a15bb80053f152eb7e12340df514e4c81fe815d?type=grid&mode=embed";

fetch(url).then(res => {
  console.log("Status:", res.status);
  console.log("Content-Type:", res.headers.get("content-type"));
  console.log("CORS Header:", res.headers.get("access-control-allow-origin"));
  return res.text();
}).then(text => {
  console.log("Has <table>?", text.includes("<table"));
  console.log("Has 'jobOpening' or similar text?", text.toLowerCase().includes("title") || text.toLowerCase().includes("department"));
}).catch(console.error);
