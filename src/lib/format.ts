export class Format {
  static toDateTime = (value: string) => {
    // Convert string to a Date object
    const dateObj = new Date(value);
    // Format the date
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long", // You can use "short" or "numeric" as well
      day: "numeric",
    });

    // Format the time
    const formattedTime = dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // This makes it 12-hour format (AM/PM)
    });

    const formatted = `${formattedDate}, ${formattedTime}`;

    return formatted;
  };
  
  static toNaira = (money: string): string => {
    return `₦${money.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  fromCamelCaseToTitle = (str: string) => {
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
}
