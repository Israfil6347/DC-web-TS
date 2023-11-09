export interface IDependentSectionState {
  DependentId: string;
  DependentName: string;
  DependentAge: string;
  DependentRelationshipId: number;
  DependentRelationshipNumber: string;
  DependentRelationName: string;
  Errors: {
    DependentId: string;
    DependentName: string;
    DependentAge: string;
    DependentRelationshipId: string;
    DependentRelationName: string;
  };
}
