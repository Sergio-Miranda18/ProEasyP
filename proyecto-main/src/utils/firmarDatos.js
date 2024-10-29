import CryptoJS from "crypto-js";

export const firmarDatos = (
  merchantId,
  apiKey,
  referenceCode,
  amount,
  currency = "COP"
) => {
  let baseString = `${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`;

  return CryptoJS.MD5(baseString).toString();
};
