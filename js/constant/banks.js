import { handler as bidvHandler } from "../transactions/bidvbank.js";
import { handler as mbbankHandler } from "../transactions/mbbank.js";
import { handler as techcombankHandler } from "../transactions/techcombank.js";
import { handler as tpbankHandler } from "../transactions/tpbank.js";
import { handler as vietcombankHandler } from "../transactions/vietcombank.js";

export const BANK_HANDLERS = {
  "online.mbbank.com.vn": mbbankHandler,
  "www.vietcombank.com.vn": vietcombankHandler,
  "www.techcombank.com.vn": techcombankHandler,
  "www.bidv.com.vn": bidvHandler,
  "ebank.tpb.vn": tpbankHandler,
};
