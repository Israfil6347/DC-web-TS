export interface IJobHistorySectionState {
  JobHistoryId: string;
  OrganizationName: string;
  OrganizationAddress: string;
  Position: string;
  DurationFrom: string;
  DurationTo: string;
  Responsibilities: string;
  ReasonForLeaving: string;
  NoOfEmployeeSupervisedByYou: string;
  Salary: string;
  Errors: {
    JobHistoryId: string;
    OrganizationName: string;
    OrganizationAddress: string;
    Position: string;
    DurationFrom: string;
    DurationTo: string;
    Responsibilities: string;
    ReasonForLeaving: string;
    NoOfEmployeeSupervisedByYou: string;
    Salary: string;
  };
}
