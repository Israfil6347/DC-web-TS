import { motion } from 'framer-motion';
import { MyVariants } from 'global_shared/animations/animate/MyVariants';
import { MyTransition } from 'global_shared/animations/transitions/MyTransition';
import MyCheckBox from 'global_shared/components/MyCheckbox';
import MyTextInput from 'global_shared/components/MyTextInput';
import LoaderDialogue from 'global_shared/components/dialogues/LoaderDialogue';
import AuthUserContext, {
  AuthUserContextType,
} from 'global_shared/contexts/AuthUserContext';
import useCommand from 'global_shared/hooks/useCommand';
import { BaseRequestModel } from 'global_shared/model/request/BaseRequestModel';
import { formatToTkSymbolMoney } from 'global_shared/utils/textUtils';
import React, { useEffect, useState } from 'react';
import { CollectionLedgerState } from '../hooks/useCollectionLedgerState';

interface CollectionLedgerAccountsViewProps {
  collectionLedgerState: CollectionLedgerState[] | [];
  setCollectionLedgerState: React.Dispatch<
    React.SetStateAction<[] | CollectionLedgerState[]>
  >;
  updateCollectionLedgerState?: any;
  sectionTitle: string;
  submitCollectionLedgerAccountsSubmit?: () => void;
  cardAccountWithdrawableBalance: number;
  submitButtonLabel?: string;
  cardPinRemainingTry: number;
  cardLockRequestHandler?: any;
  allDisable?: boolean;
}

const CollectionLedgerAccountsView: React.FC<
  CollectionLedgerAccountsViewProps
> = ({
  collectionLedgerState,
  setCollectionLedgerState,
  updateCollectionLedgerState,
  sectionTitle,
  submitCollectionLedgerAccountsSubmit,
  cardAccountWithdrawableBalance,
  submitButtonLabel = '',
  cardPinRemainingTry,
  cardLockRequestHandler,
  allDisable,
}) => {
  const [selectAll, setSelectAll] = useState<boolean>(true);
  const [currentEditedLoanNumber, setCurrentEditedLoanNumber] =
    useState<string>('');
  var totalAmount = 0;
  if (collectionLedgerState.length > 0) {
    collectionLedgerState.forEach((collectionLedger, index) => {
      if (collectionLedger?.isSelected) {
        totalAmount = totalAmount + collectionLedger.Amount;
      }
    });
  }

  const { authUser } = React.useContext(AuthUserContext) as AuthUserContextType;
  const {
    loading: loanPaymentCalculationResponseDataLoading,
    data: loanPaymentCalculationResponseData,
    message: loanPaymentCalculationResponseMessage,
    status: loanPaymentCalculationResponseStatus,
    setStatus: setLoanPaymentCalculationResponseStatus,
    executeCommand: loanPaymentCalculationRequestCommand,
  } = useCommand<any[]>();

  const installmentSubmitHandler = (
    collectionLedgerState: CollectionLedgerState,
    refundAmount: number
  ) => {
    const baseRequestObj = new BaseRequestModel(authUser);
    const calculationObj = {
      ...baseRequestObj,
      Days: 0,
      LoanNumber: collectionLedgerState.AccountNo,
      InterestRate: collectionLedgerState.InterestRate,
      IsRefundBased: collectionLedgerState.IsRefundBased,
      LastPaidDate: collectionLedgerState.LastPaidDate,
      LoanBalance: collectionLedgerState.LoanBalance,
      LoanRefund:
        refundAmount > collectionLedgerState.LoanBalance
          ? collectionLedgerState.LoanBalance
          : refundAmount,
      ModuleCode: collectionLedgerState.ModuleCode,
    };

    loanPaymentCalculationRequestCommand(
      process.env.REACT_APP_BASE_URL + '/loans_V1/calculateLoanPayment',
      JSON.stringify(calculationObj),
      {
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
      }
    );
  };

  const toggleSelect = (selectAll: boolean) => {
    const updatedCollectionLedgerState = collectionLedgerState?.map(
      (currentElement, index) => {
        currentElement.isSelected = selectAll;
        return currentElement;
      }
    );
    if (setCollectionLedgerState) {
      setCollectionLedgerState(updatedCollectionLedgerState);
    }
  };

  const toggleGroupSelection = (accountId: number, selected: boolean) => {
    const updatedCollectionLedgerState = collectionLedgerState?.map(
      (currentElement, index) => {
        if (currentElement.AccountId === accountId) {
          currentElement.isSelected = selected;
        }

        return currentElement;
      }
    );

    if (setCollectionLedgerState) {
      setCollectionLedgerState(updatedCollectionLedgerState);
    }
  };

  useEffect(() => {
    if (loanPaymentCalculationResponseData !== null) {
      const updatedCollectionLedgerState = collectionLedgerState?.map(
        (currentElement, index) => {
          if (
            currentElement.LoanCollectionType.trim() === 'LoanLpsAmount' &&
            currentEditedLoanNumber.trim() === currentElement.AccountNo.trim()
          ) {
            currentElement.Amount =
              loanPaymentCalculationResponseData[0].LoanLpsAmount;
          }

          return currentElement;
        }
      );

      if (setCollectionLedgerState) {
        setCollectionLedgerState(updatedCollectionLedgerState);
      }
    }
  }, [loanPaymentCalculationResponseData]);

  useEffect(() => {
    collectionLedgerState?.forEach((currentElement, index) => {
      if (!currentElement.isSelected) {
        setSelectAll(false);
      }
    });
  });

  return (
    <div>
      <LoaderDialogue isLoading={loanPaymentCalculationResponseDataLoading} />
      <motion.div
        variants={MyVariants.SlideInFromRight}
        transition={MyTransition.Spring.Low}
        className=""
      >
        <div className="rounded-md bg-surface p-7">
          {/* // TODO: remove title */}
          {/* <motion.h2 className="text-center text-lg font-bold uppercase">
          {sectionTitle}
        </motion.h2> */}
          {allDisable ? (
            ''
          ) : (
            <div className="ml-6">
              <MyCheckBox
                disabled={false}
                value={selectAll}
                onChangeHandler={(event) => {
                  setSelectAll(!selectAll);
                  toggleSelect(event.target.checked);
                }}
                label="Select/Deselect all"
                error={undefined}
                name={'selectAll'}
              />
            </div>
          )}

          <div
            className={`min-h-[396px] overflow-auto border p-4 ${
              totalAmount === 0 && 'border-error'
            }`}
            style={{ height: window.innerHeight - 500 }}
          >
            <ul className="space-y-4 overflow-hidden">
              {collectionLedgerState?.map((AccountInfo, index) => (
                <li
                  key={index}
                  className="flex flex-col items-start lg:flex-row"
                >
                  <div className="flex w-full items-center rounded border border-gray-400 bg-background px-2 text-start text-sm font-bold lg:w-1/2">
                    {allDisable ? (
                      <label className="py-2.5 px-2 text-sm font-medium">{`${AccountInfo?.AccountType} | ${AccountInfo?.AccountNo}`}</label>
                    ) : (
                      <MyCheckBox
                        disabled={AccountInfo?.IsNotEditable}
                        value={AccountInfo?.isSelected}
                        name="isSelected"
                        onChangeHandler={(event) => {
                          updateCollectionLedgerState(
                            event.target.name,
                            event.target.checked,
                            index
                          );

                          toggleGroupSelection(
                            AccountInfo.AccountId,
                            event.target.checked
                          );
                        }}
                        label={`${AccountInfo?.AccountType} | ${AccountInfo?.AccountNo}`}
                        error={undefined}
                      />
                    )}
                  </div>
                  <div className="w-full lg:w-1/2">
                    <MyTextInput
                      label=""
                      name="Amount"
                      value={AccountInfo?.Amount.toString()}
                      inputType="number"
                      disabled={
                        allDisable
                          ? true
                          : !AccountInfo?.isSelected ||
                            AccountInfo?.IsNotEditable
                      }
                      required={false}
                      error={
                        collectionLedgerState?.[index]?.Errors?.Amount
                          ? collectionLedgerState?.[index]?.Errors?.Amount
                          : !collectionLedgerState[index]?.IsSubLedger &&
                            collectionLedgerState[index]?.PlType === 2 &&
                            collectionLedgerState?.[index]?.Amount <
                              collectionLedgerState?.[index]?.MinimumDeposit
                          ? `Minimum deposit amount ${collectionLedgerState[index].MinimumDeposit} ৳`
                          : collectionLedgerState?.[index]?.Amount ===
                            collectionLedgerState?.[index]?.LoanBalance
                          ? `Maximum deposit amount ${collectionLedgerState[index].LoanBalance} ৳`
                          : ''
                      }
                      onChangeHandler={(event) => {
                        if (event.target.value === '') {
                          updateCollectionLedgerState(
                            event.target.name,
                            0,
                            index
                          );
                        } else {
                          updateCollectionLedgerState(
                            event.target.name,
                            parseInt(event.target.value),
                            index
                          );
                        }

                        if (
                          !AccountInfo.IsSubLedger &&
                          AccountInfo.PlType === 2 &&
                          AccountInfo.IsLps
                        ) {
                          setCurrentEditedLoanNumber(AccountInfo.AccountNo);
                          installmentSubmitHandler(
                            AccountInfo,
                            parseInt(event.target.value)
                          );
                        }

                        if (
                          !AccountInfo.IsSubLedger &&
                          AccountInfo.PlType === 2
                        ) {
                          AccountInfo.LoanBalance <
                            parseInt(event.target.value) &&
                            updateCollectionLedgerState(
                              event.target.name,
                              AccountInfo.LoanBalance,
                              index
                            );
                        }

                        if (
                          parseInt(event.target.value) <
                          AccountInfo.MinimumDeposit
                        ) {
                          updateCollectionLedgerState(
                            event.target.name,
                            parseInt(event.target.value),
                            index
                          );
                        }
                      }}
                      leftIcon={
                        <i
                          className={`fa-solid fa-bangladeshi-taka-sign 
                      ${
                        !AccountInfo.IsSubLedger &&
                        AccountInfo.PlType === 2 &&
                        AccountInfo.IsLps
                          ? 'text-red-500'
                          : 'text-blue-600'
                      }`}
                        ></i>
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between pr-6 pt-2 text-right font-semibold md:flex-row">
            {totalAmount > cardAccountWithdrawableBalance ? (
              <motion.h4 className="">
                <span className="text-xs text-error">
                  You do not have sufficient balance
                </span>
              </motion.h4>
            ) : (
              <div></div>
            )}
            <motion.h4 className="">
              Total Amount:
              <span className="font-bold">
                {totalAmount === undefined
                  ? '0 ৳'
                  : ` ${formatToTkSymbolMoney(totalAmount)}`}
              </span>
            </motion.h4>
          </div>

          {submitButtonLabel.length > 0 && (
            <div className="flex items-center justify-end gap-4">
              {collectionLedgerState.length !== 0 ? (
                <button
                  className="w-1/2 rounded bg-primary py-2 font-semibold uppercase text-onPrimary transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    if (cardPinRemainingTry === 0) {
                      cardLockRequestHandler();
                    } else {
                      submitCollectionLedgerAccountsSubmit &&
                        submitCollectionLedgerAccountsSubmit();
                    }
                  }}
                >
                  {submitButtonLabel}
                </button>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CollectionLedgerAccountsView;
