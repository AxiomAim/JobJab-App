export type AlertMessageSeverity =
  "error" | "warning" | "info" | "success";

export type AlertMessage = {
  severity: AlertMessageSeverity;
  text: string;
}

