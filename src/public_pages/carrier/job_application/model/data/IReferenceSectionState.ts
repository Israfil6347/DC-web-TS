export interface IReferenceSectionState {
  ReferenceId: string;
  ReferenceType: string;
  ReferenceName: string;
  Position: string;
  OrganizationName: string;
  MailingAddress: string;
  MobileNo: string;
  Email: string;
  Errors: {
    ReferenceId: string;
    ReferenceType: string;
    ReferenceName: string;
    Position: string;
    OrganizationName: string;
    MailingAddress: string;
    MobileNo: string;
    Email: string;
  };
}
