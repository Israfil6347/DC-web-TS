export interface ILanguageProficiencySectionState {
  LanguageProficiencyId: string;
  LanguageName: string;
  ReadingProficiency: string;
  WritingProficiency: string;
  SpeakingProficiency: string;
  Errors: {
    LanguageProficiencyId: string;
    LanguageName: string;
    ReadingProficiency: string;
    WritingProficiency: string;
    SpeakingProficiency: string;
  };
}
