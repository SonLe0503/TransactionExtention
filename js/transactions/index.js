import { BANK_HANDLERS } from "../constant/banks.js";

const currentSite = window.location.hostname;

if (BANK_HANDLERS[currentSite]) {
  BANK_HANDLERS[currentSite]();
}else {
  console.warn("Không tồn tại ngân hàng");
}