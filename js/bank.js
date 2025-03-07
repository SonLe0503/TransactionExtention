import { handler } from "./transactions/mbbank.js";

document.addEventListener("DOMContentLoaded", () => {
  const mbbankBtn = document.querySelector("#btn_mbbank");

  if (mbbankBtn) {
    mbbankBtn.addEventListener("click", () => {
      handler();
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) {
          console.error("Không tìm thấy tab nào đang mở.");
          return;
        }

        const tabId = tabs[0].id; // Lấy ID của tab hiện tại
        chrome.tabs.update(tabId, {
          url: "https://online.mbbank.com.vn/information-account/source-account",
        });
      });
    });
    // console.log("HIHI")
  } else {
    console.error("Không tìm thấy nút #btn_mbbank");
  }
});
