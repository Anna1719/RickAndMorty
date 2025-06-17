export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "alive":
      return "green";
    case "dead":
      return "red";
    case "unknown":
      return "blue";
    default:
      return "black";
  }
};
