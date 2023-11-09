export interface ITrainingSectionState {
  TrainingId: string;
  TrainingTitle: string;
  TrainingDetails: string;
  InstituteName: string;
  DurationFrom: string;
  DurationTo: string;
  ValidityDate: string;
  Errors: {
    TrainingId: string;
    TrainingTitle: string;
    TrainingDetails: string;
    InstituteName: string;
    DurationFrom: string;
    DurationTo: string;
    ValidityDate: string;
  };
}
