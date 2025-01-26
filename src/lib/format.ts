export class Format {
  static toDateTime = (value: string) => {
    // Convert string to a Date object
    const dateObj = new Date(value);

    // Extract the date components
    const year = dateObj.getUTCFullYear();
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(dateObj.getUTCDate()).padStart(2, "0");

    // Extract the time components
    const hours = String(dateObj.getUTCHours()).padStart(2, "0");
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getUTCSeconds()).padStart(2, "0");

    // Format the date and time
    const formattedDate = `${year}/${month}/${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const formatted = `${formattedDate}-${formattedTime}`;
    return formatted;
  };

  static toAPIDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  };

  static toOnlyDate = (value: string): string => {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  static toNaira = (money: string, hideCurrencyIcon?: boolean): string => {
    const amount = parseFloat(money).toFixed(2); // Convert to a number and ensure two decimal places
    return hideCurrencyIcon
      ? amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : `₦ ${amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  static fromCamelCaseToTitle = (str: string) => {
    // Insert a space before any uppercase letters preceded by a lowercase letter
    const titleCase = str.replace(/([a-z])([A-Z])/g, "$1 $2");

    // Capitalize the first letter of each word
    const words = titleCase.split(" ");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the words back together
    const title = capitalizedWords.join(" ");

    return title;
  };

  static fromNumberToWords(num: number): string {
    if (num === 0) return "Zero Naira Only";
  
    const belowTwenty = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
  
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
  
    const thousands = ["", "Thousand", "Million", "Billion"];
  
    function helper(n: number): string {
      if (n < 20) return belowTwenty[n];
      if (n < 100)
        return (
          tens[Math.floor(n / 10)] +
          (n % 10 !== 0 ? "-" + belowTwenty[n % 10] : "")
        );
      if (n < 1000)
        return (
          belowTwenty[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 !== 0 ? " and " + helper(n % 100) : "")
        );
  
      for (let i = 0; i < thousands.length; i++) {
        const divisor = Math.pow(1000, i + 1);
        if (n < divisor) {
          const unit = Math.pow(1000, i);
          return (
            helper(Math.floor(n / unit)) +
            " " +
            thousands[i] +
            (n % unit !== 0 ? ", " + helper(n % unit) : "")
          );
        }
      }
  
      return "N/A";
    }
  
    function decimalToWords(decimalPart: number): string {
      const decimalStr = decimalPart.toString().padStart(2, "0"); // Ensure two digits for decimals
      const words = [];
      for (const digit of decimalStr) {
        words.push(belowTwenty[parseInt(digit)]);
      }
      return words.join(" ");
    }
  
    const integerPart = Math.floor(num);
    const decimalPart = Math.round((num - integerPart) * 100); // Get decimal part as a whole number (e.g., 0.56 -> 56)
  
    const integerWords = helper(integerPart)?.trim();
    const decimalWords =
      decimalPart > 0 ? `, ${decimalToWords(decimalPart)} Kobo Only` : " Only";
  
    return `${integerWords} Naira${decimalWords}`;
  }
}
