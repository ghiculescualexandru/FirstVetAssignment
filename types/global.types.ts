export type RequestStatus =
  | "initial-loading"
  // This is unused at the moment, but
  // it's good to be defined
  | "loading"
  | "success"
  | "failure";

export type ButtonStatus = "loading" | "enabled" | "disabled";
