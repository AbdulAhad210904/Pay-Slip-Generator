"use client";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { numberToWords } from "amount-to-words";
import PayslipPDF from "./pay-slip-pdf";
import dynamic from "next/dynamic";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState, useEffect } from "react";



const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
  
);

interface FormValues {
  employeePaySummary: {
    employeeName: string;
    employeeId: string;
    payPeriod: string;
    payDate: string;
    totalDays: string;
    lossOfPayDays: string;
    payCycle: string;
    additionalFields: { fieldName: string; fieldValue: string }[];
  };
  incomeDetails: {
    earnings: { description: string; amount: string }[];
    deductions: { description: string; amount: string }[];
  };
  note: string;
}



export function PaySlipGenerator() {
  const [isBrowser, setIsBrowser] = useState(false);

useEffect(() => {
  setIsBrowser(true);
}, []);
  const { control, handleSubmit, reset, watch } = useForm<FormValues>({
    defaultValues: {
      employeePaySummary: {
        employeeName: "",
        employeeId: "",
        payPeriod: "",
        payDate: "",
        totalDays: "",
        lossOfPayDays: "",
        payCycle: "",
        additionalFields: [],
      },
      incomeDetails: {
        earnings: [{ description: "", amount: "" }],
        deductions: [{ description: "", amount: "" }],
      },
      note: "", // additional note field
    },
  });

  const { fields: additionalFields, append: appendAdditionalFields, remove: removeAdditionalField } = useFieldArray({
    control,
    name: "employeePaySummary.additionalFields",
  });
  

  const { fields: earningsFields, append: appendEarnings, remove: removeEarnings } = useFieldArray({
    control,
    name: "incomeDetails.earnings",
  });

  const { fields: deductionsFields, append: appendDeductions, remove: removeDeductions } = useFieldArray({
    control,
    name: "incomeDetails.deductions",
  });

  const watchAllFields = watch();

  const calculateGrossEarnings = () => {
    return earningsFields.reduce((total, field, index) => {
      return (
        total +
        (parseFloat(watchAllFields.incomeDetails.earnings[index].amount) || 0)
      );
    }, 0);
  };

  const calculateGrossDeductions = () => {
    return deductionsFields.reduce((total, field, index) => {
      return (
        total +
        (parseFloat(watchAllFields.incomeDetails.deductions[index].amount) || 0)
      );
    }, 0);
  };

  const grossEarnings = calculateGrossEarnings();
  const grossDeductions = calculateGrossDeductions();
  const totalNetPayable = grossEarnings - grossDeductions;
  const amountInWords = numberToWords(totalNetPayable);

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const handleReset = () => {
    reset();
  };

  const formData = {
    ...watchAllFields,
    grossEarnings,
    grossDeductions,
    totalNetPayable,
    amountInWords,
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border rounded-md shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              appendAdditionalFields({ fieldName: "", fieldValue: "" })
            }
          >
            Add Another Field
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-bold">Earnings</h2>
          {earningsFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-[2fr_2fr_auto] gap-4">
              <div className="space-y-2">
                <Label htmlFor={`earnings-description-${index}`}>Earnings</Label>
                <Controller
                  control={control}
                  name={`incomeDetails.earnings.${index}.description`}
                  render={({ field }) => (
                    <Input
                      id={`earnings-description-${index}`}
                      {...field}
                      placeholder="Description"
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`earnings-amount-${index}`}>Amount</Label>
                <Controller
                  control={control}
                  name={`incomeDetails.earnings.${index}.amount`}
                  render={({ field }) => (
                    <Input
                      id={`earnings-amount-${index}`}
                      {...field}
                      placeholder="Amount"
                    />
                  )}
                />
              </div>
              <div className="space-y-2 flex justify-end items-end">
                <button
                  onClick={() => removeEarnings(index)}
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
            onClick={() => appendEarnings({ description: "", amount: "" })}
          >
            Add Another Earning
          </Button>
        </div>

        <div className="space-y-4 mb-6">
          <h2 className="text-lg font-bold">Deductions</h2>
          {deductionsFields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-1 md:grid-cols-[2fr_2fr_auto] gap-4">
              <div className="space-y-2">
                <Label htmlFor={`deductions-description-${index}`}>Deductions</Label>
                <Controller
                  control={control}
                  name={`incomeDetails.deductions.${index}.description`}
                  render={({ field }) => (
                    <Input
                      id={`deductions-description-${index}`}
                      {...field}
                      placeholder="Description"
                    />
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`deductions-amount-${index}`}>Amount</Label>
                <Controller
                  control={control}
                  name={`incomeDetails.deductions.${index}.amount`}
                  render={({ field }) => (
                    <Input
                      id={`deductions-amount-${index}`}
                      {...field}
                      placeholder="Amount"
                    />
                  )}
                />
              </div>
              <div className="space-y-2 flex justify-end items-end">
                <button
                  onClick={() => removeDeductions(index)}
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
            onClick={() => appendDeductions({ description: "", amount: "" })}
          >
            Add Another Deduction
          </Button>
        </div>

        <div className="flex mb-10">
          <div className="flex w-full justify-between">
            <span className="font-semibold text-lg">Gross Earnings:</span>{" "}
            <span className="mr-36">{grossEarnings} RS</span>
          </div>
          <div className="flex w-full justify-between ">
            <span className="font-semibold text-lg">Gross Deductions:</span>{" "}
            <span className="mr-36">{grossDeductions} RS</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <p className="font-bold">Total Net Payable</p>
            <p className="font-bold">{totalNetPayable} RS</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Gross Earnings - Total Deductions
            </p>
            <p className="text-sm text-muted-foreground">
              {totalNetPayable} RS
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-sm text-muted-foreground">
            Amount in words: Rupees {amountInWords}
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <Label htmlFor="note">Note (Optional)</Label>
          <Controller
            control={control}
            name="note"
            render={({ field }) => (
              <Input
                id="note"
                {...field}
                placeholder="Enter any additional note"
              />
            )}
          />
        </div>

        <div className="flex space-x-4">
          <Button variant="default" type="submit">
            Generate Payslip
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </form>
      {isBrowser && (
      <PDFDownloadLink
        document={<PayslipPDF data={formData as any} />}
        fileName="payslip.pdf"
        className="mt-4"
      >
        {({ loading }) =>
          loading ? "Loading document..." : "Download Payslip PDF"
        }
      </PDFDownloadLink>
    )}


    </div>
  );
}
