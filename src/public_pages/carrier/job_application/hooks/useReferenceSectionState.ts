import { useState } from 'react';
import uuid from 'react-uuid';
import { IReferenceSectionState } from '../model/data/IReferenceSectionState';
import { validateReferenceSectionState } from '../validation/validateReferenceSectionState';

function useReferenceSectionState() {
  const [referenceSectionState, setReferenceSectionState] = useState<
    IReferenceSectionState[]
  >([]);

  // Begin Update Models
  const updateReferenceSectionState = (
    fieldName: string,
    fieldValue: any,
    index: number
  ) => {
    referenceSectionState[index] = {
      ...referenceSectionState[index],
      [fieldName]: fieldValue,
      Errors: {
        ...referenceSectionState[index].Errors,
        [fieldName]: validateReferenceSectionState(fieldName, fieldValue),
      },
    };
    setReferenceSectionState([...referenceSectionState]);
  };
  // End Update Models

  // Begin Remove Models
  const removeReferenceSectionState = (id: string) => {
    const newReference = referenceSectionState.filter((item) => {
      return item.ReferenceId !== id;
    });
    setReferenceSectionState(newReference);
  };
  // End Remove Models

  // Begin Add Models
  const addReferenceSectionState = () => {
    setReferenceSectionState((Reference) => {
      return [
        ...Reference,
        {
          ReferenceId: uuid(),
          ReferenceType: '',
          ReferenceName: '',
          Position: '',
          OrganizationName: '',
          MailingAddress: '',
          MobileNo: '',
          Email: '',
          Errors: {
            ReferenceId: '',
            ReferenceType: '',
            ReferenceName: '',
            Position: '',
            OrganizationName: '',
            MailingAddress: '',
            MobileNo: '',
            Email: '',
          },
        },
      ];
    });
  };
  // End Add Models

  return {
    referenceSectionState,
    updateReferenceSectionState,
    removeReferenceSectionState,
    addReferenceSectionState,
    setReferenceSectionState,
  };
}

export default useReferenceSectionState;
