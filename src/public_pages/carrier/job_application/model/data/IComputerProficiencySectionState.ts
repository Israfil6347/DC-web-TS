export interface IComputerProficiencySectionState {
  ComputerProficiencyId: string;
  ComputerApplicationId: number;
  ExpertiseLevel: string;
  ComputerApplicationName: string;
  Errors: {
    ComputerProficiencyId: string;
    ComputerApplicationId: string;
    ExpertiseLevel: string;
    ComputerApplicationName: string;
  };
}
