const url = "https://sheet.zohopublic.in/sheet/publishedrange/8a47f806d1bec0763b8c91f4e5c2e3adfe208521d7225bd85226299028566461?type=grid";
fetch(url, { method: 'OPTIONS' }).then(res => {
  console.log("Access-Control-Allow-Origin:", res.headers.get("access-control-allow-origin"));
});
fetch(url).then(res => {
  console.log("GET Access-Control-Allow-Origin:", res.headers.get("access-control-allow-origin"));
  return res.text();
}).then(text => {
  console.log("HTML has table?", text.includes("<table"));
});
