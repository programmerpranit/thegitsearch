export const parseJsonFromString = (str: string): Record<string, string> => {
  const entries = str.split("&");
  const received: Record<string, string> = {}; // Add index signature
  entries.forEach((entry) => {
    const splitted = entry.split("=");
    received[splitted[0]] = splitted[1];
  });
  return received;
};
