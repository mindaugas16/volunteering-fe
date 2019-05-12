export interface HeaderMessageStateInterface {
  message: string;
  visible: boolean;
  status?: HeaderMessageStatus;
  options?: HeaderMessageOptions;
}

export interface HeaderMessageOptions {
  closeable?: boolean;
  closeAfter?: number;
}

export type HeaderMessageStatus = 'SUCCESS' | 'WARNING' | 'DANGER';
