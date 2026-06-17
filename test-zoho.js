const id = "u8n6te135f8d9de004aa0925713281b28293f";

async function test(url) {
  try {
    const res = await fetch(url);
    console.log("Testing:", url);
    console.log("Status:", res.status, "Content-Type:", res.headers.get("content-type"));
    if (res.status === 200 && res.headers.get("content-type")?.includes("csv")) {
      const text = await res.text();
      console.log("Success! Preview:", text.substring(0, 50));
    }
  } catch (e) {
    console.log("Error fetching", url);
  }
}

(async () => {
  await test(`https://workdrive.zohopublic.in/file/${id}/download`);
  await test(`https://workdrive.zohopublic.in/writer/open/${id}/download`);
  await test(`https://workdrive.zohopublic.in/sheet/open/${id}/download`);
  await test(`https://workdrive.zohopublic.in/sheet/open/${id}?download=csv`);
  await test(`https://workdrive.zohopublic.in/sheet/open/${id}?csv=true`);
})();
