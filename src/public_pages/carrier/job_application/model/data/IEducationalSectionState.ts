export interface IEducationalSectionState {
  EducationId: string;
  EducationLevelId: number;
  EducationLevelName: string;
  EducationalDegreeId: number;
  DegreeName: string;
  InstituteName: string;
  Major: string;
  EductionBoard: string;
  Result: string;
  ResultOutOf: string;
  PassingYear: string;
  EducationalDegreeName: string;
  Errors: {
    EducationId: string;
    EducationLevelId: string;
    EducationalDegreeId: string;
    InstituteName: string;
    Major: string;
    EductionBoard: string;
    Result: string;
    ResultOutOf: string;
    PassingYear: string;
    EducationalDegreeName: string;
  };
}
