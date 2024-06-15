export const currencyFormat = (value) => {
  const number = value !== undefined ? value : 0;
  return number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const cc_expires_format = (string) => {
  return string
    .replace(
      /[^0-9]/g,
      "" // 숫자만 허용
    )
    .replace(
      /^([2-9])$/g,
      "0$1" // 3 > 03 처리
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      "0$1/$2" // 13 > 01/3 처리
    )
    .replace(
      /^0{1,}/g,
      "0" // 00 > 0 처리
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      "$1/$2" // 113 > 11/3 처리
    );
};
