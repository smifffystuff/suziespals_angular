export class Alert {
  type: AlertType;
  message: string;
  id: string;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
