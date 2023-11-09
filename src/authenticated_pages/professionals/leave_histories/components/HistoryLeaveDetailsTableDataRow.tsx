import { LeaveStatuses } from "authenticated_pages/professionals/shared/data/LeaveStatuses";
import MyButton from "global_shared/components/MyButton";
import { CRUDModes } from "global_shared/data/CRUDModes";
import Moment from "moment";

interface HistoryLeaveDetailsTableDataRowProps {
  leaveDetails: any;
  index: number;
  setLeaveUpdateStates: any;
  setOpenLeaveApplicationForm: any;
  setMode: any;
}

const HistoryLeaveDetailsTableDataRow: React.FC<
  HistoryLeaveDetailsTableDataRowProps
> = ({
  leaveDetails,
  index,
  setLeaveUpdateStates,
  setOpenLeaveApplicationForm,
  setMode,
}) => {
  const setLeaveHistoryDetailsHandler = () => {
    const temp = {
      LeaveApplicationId: 0,
      LeaveTypeCode: "",
      FallbackEmployeeCode: "",
      FallbackPersonName: "",
      FromDate: "",
      FromTime: "",
      ToDate: "",
      ToTime: "",
      RejoiningDate: "",
      Remarks: "",
      LeaveStageRemarks: "",
      CurrentStage: "",
      ApplicationDate: "",
      Errors: {
        LeaveApplicationId: "",
        LeaveTypeCode: "",
        FallbackEmployeeCode: "",
        FallbackPersonName: "",
        FromDate: "",
        FromTime: "",
        ToDate: "",
        ToTime: "",
        RejoiningDate: "",
        Remarks: "",
        LeaveStageRemarks: "",
        CurrentStage: "",
        ApplicationDate: "",
      },
    };

    temp.FallbackEmployeeCode = leaveDetails?.FallbackEmployeeCode;
    temp.FallbackPersonName = leaveDetails?.FallbackPersonName;
    temp.LeaveTypeCode = leaveDetails?.LeaveTypeCode;
    temp.FromDate = Moment(leaveDetails?.FromDate).format("MM/DD/YYYY");
    temp.FromTime = leaveDetails?.FromTime;
    temp.ToDate = Moment(leaveDetails?.ToDate).format("MM/DD/YYYY");
    temp.ToTime = leaveDetails?.ToTime;
    temp.RejoiningDate = Moment(leaveDetails?.RejoiningDate).format(
      "MM/DD/YYYY"
    );
    temp.Remarks = leaveDetails?.Remarks;
    temp.ApplicationDate = Moment(leaveDetails?.ApplicationDate).format(
      "MM/DD/YYYY"
    );
    temp.CurrentStage = leaveDetails?.CurrentStage;
    temp.LeaveApplicationId = leaveDetails?.LeaveApplicationId;

    setLeaveUpdateStates(() => {
      return {
        ...temp,
      };
    });

    setOpenLeaveApplicationForm(true);
  };

  return (
    <tr className="border-b bg-white ">
      <td className="px-6 py-4"># {index}</td>
      <td className="px-6 py-4">{leaveDetails?.EmployeeName}</td>
      <td className="px-6 py-4">
        {Moment(leaveDetails?.ApplicationDate).format("MM/DD/YYYY")}
      </td>
      <td className="px-6 py-4">{leaveDetails.LeaveType}</td>
      <td className="px-6 py-4">
        {Moment(leaveDetails?.FromDate).format("MM/DD/YYYY")}
      </td>
      <td className="px-6 py-4">
        {Moment(leaveDetails?.ToDate).format("MM/DD/YYYY")}
      </td>
      <td className="px-6 py-4">
        {Moment(leaveDetails?.RejoiningDate).format("MM/DD/YYYY")}
      </td>
      <td className="px-6 py-4">{leaveDetails?.CurrentStage}</td>
      <td className="px-6 py-4 ">
        <MyButton
          name="Submit"
          label=""
          styleClass="w-8 flex justify-center rounded border py-2 mr-5 font-semibold uppercase text-onPrimary hover:scale-105 bg-primary"
          onClick={() => {
            setLeaveHistoryDetailsHandler();
            setMode(CRUDModes.View);
          }}
          type={undefined}
        >
          <i className="fa-solid fa-eye"></i>
        </MyButton>
      </td>
      <td className="px-6 py-4 ">
        <MyButton
          disabled={
            leaveDetails?.StageCode !== LeaveStatuses.Applied ? true : false
          }
          styleClass="w-8 flex justify-center rounded border py-2 mr-5 font-semibold disabled:bg-gray-500 uppercase text-onPrimary hover:scale-105 bg-primary"
          onClick={() => {
            setLeaveHistoryDetailsHandler();
            setMode(CRUDModes.Edit);
          }}
          label={""}
          name={""}
          type={undefined}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </MyButton>
      </td>
    </tr>
  );
};

export default HistoryLeaveDetailsTableDataRow;
