export enum RequestStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum RequestCommand {
  ADD_PERSON = 'ADD_PERSON',
  CHANGE_PERSON = 'CHANGE_PERSON',
  DELETE_PERSON = 'DELETE_PERSON',
}

export interface Request {
  requestId: string;
  changedAt: string;
  status: RequestStatus;
  command: RequestCommand;
  payload: any;
}

