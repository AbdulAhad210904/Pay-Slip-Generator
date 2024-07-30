import React from "react";
import { useFieldArray, Controller, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AdditionalField {
  id: string;
  fieldName: string;
  fieldValue: string;
}
interface Props {
  control: Control<any>;
  additionalFields: AdditionalField[];
  appendAdditionalFields: (additionalField: AdditionalField) => void;
  removeAdditionalField: (index: number) => void;
}

const EmployeePaySummary: React.FC<Props> = ({ control, additionalFields, appendAdditionalFields, removeAdditionalField }) => {
  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-lg font-bold">Employee Pay Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employee-name">Employee Name</Label>
          <Controller
            control={control}
            name="employeePaySummary.employeeName"
            render={({ field }) => <Input id="employee-name" {...field} />}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employee-id">Employee ID</Label>
          <Controller
            control={control}
            name="employeePaySummary.employeeId"
            render={({ field }) => <Input id="employee-id" {...field} />}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pay-period">Pay Period</Label>
          <Controller
            control={control}
            name="employeePaySummary.payPeriod"
            render={({ field }) => <Input id="pay-period" {...field} />}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pay-date">Paid Days</Label>
          <Controller
            control={control}
            name="employeePaySummary.payDate"
            render={({ field }) => <Input id="pay-date" {...field} />}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="total-days">Loss of Pay Days</Label>
          <Controller
            control={control}
            name="employeePaySummary.lossOfPayDays"
            render={({ field }) => <Input id="total-days" {...field} />}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pay-cycle">Pay Date</Label>
          <Controller
            control={control}
            name="employeePaySummary.payCycle"
            render={({ field }) => <Input id="pay-cycle" {...field} />}
          />
        </div>
      </div>
      {additionalFields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-1 md:grid-cols-[2fr_2fr_auto] gap-4">
          <div className="space-y-2">
            <Label htmlFor={`additional-field-name-${index}`}>
              Field Name
            </Label>
            <Controller
              control={control}
              name={`employeePaySummary.additionalFields.${index}.fieldName`}
              render={({ field }) => (
                <Input
                  id={`additional-field-name-${index}`}
                  {...field}
                  placeholder="Field Name"
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`additional-field-value-${index}`}>
              Field Value
            </Label>
            <Controller
              control={control}
              name={`employeePaySummary.additionalFields.${index}.fieldValue`}
              render={({ field }) => (
                <Input
                  id={`additional-field-value-${index}`}
                  {...field}
                  placeholder="Field Value"
                />
              )}
            />
          </div>
          <div className="space-y-2 flex justify-end items-end">
            <button
              onClick={() => removeAdditionalField(index)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      ))}
      <Button
        variant="outline"
        className="mt-4"
        onClick={() =>
          appendAdditionalFields({ id: Date.now().toString(),fieldName: "", fieldValue: "" })
        }
      >
        Add Another Field
      </Button>
    </div>
  );
};

export default EmployeePaySummary;
