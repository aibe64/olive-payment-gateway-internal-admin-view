
export const isArrayWithLength = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.length > 0;
};

export const arraysHaveSameValues = (
  array1: string[],
  array2: string[]
): boolean => {
  if (array1?.length !== array2?.length) {
    return false;
  }
  const sortedArray1 = [...array1].sort();
  const sortedArray2 = [...array2].sort();

  return sortedArray1.every((value, index) => value === sortedArray2[index]);
};

export const getQueryStringValue = (queryKey: string) => {
  const urlObj = new URL(window.location.href);
  return urlObj.searchParams.get(queryKey);
};

export const removeQueryKey = (queryKey: string) => {
  const currentUrl = window.location.href;
  const urlObj = new URL(currentUrl);

  // Remove the 'transactionId' query parameter
  urlObj.searchParams.delete(queryKey);

  // Update the browser URL without reloading the page
  window.history.replaceState({}, document.title, urlObj.toString());
};
