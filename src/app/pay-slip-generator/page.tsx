"use client";
import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { numberToWords } from "amount-to-words";
import PayslipPDF from "../../components/component/pay-slip-pdf";
import dynamic from "next/dynamic";
// import { PDFDownloadLink } from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import EmployeePaySummary from "../../components/component/employee-pay-summary";
import EarningsDetails from "../../components/component/earning-details";
import DeductionsDetails from "../../components/component/deduction-details";
import Modal from "../../components/component/modal";
import { PDFViewer } from '@react-pdf/renderer';
import { useRouter } from 'next/navigation';


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
  logoPath?: string;
}

export default function PaySlipGenerator() {
  const router = useRouter();

useEffect(() => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    router.push('/login');
  }
}, [router]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [email, setEmail] = useState('');


  const [isBrowser, setIsBrowser] = useState(false);
  const sendEmailWithPdf = async () => {
    try {
      const response = await fetch('/api/sendPdfEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toEmail: email, 
          pdfData: formData,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Email sent successfully!');
        setIsEmailModalVisible(false);
      } else {
        alert(`Error sending email: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email.');
    }
  };

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
      note: "", 
      logoPath:"/api/image",
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
        {/* Employee Pay Summary */}
        <EmployeePaySummary
          control={control}
          additionalFields={additionalFields}
          appendAdditionalFields={appendAdditionalFields}
          removeAdditionalField={removeAdditionalField}
        />
          
        {/* Earnings Details */}
        <EarningsDetails
          control={control}
          earningsFields={earningsFields}
          appendEarnings={appendEarnings}
          removeEarnings={removeEarnings}
        />
          
        {/* Deductions */}
        <DeductionsDetails
          control={control}
          deductionsFields={deductionsFields}
          appendDeductions={appendDeductions}
          removeDeductions={removeDeductions}
        />
            
        {/* Summary */}
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
            
        {/* Total Net Payable */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <p className="font-bold">Total Net Payable</p>
            <p className="font-bold">{totalNetPayable} RS</p>
          </div>
        </div>
              
        {/* Amount in Words */}
        <div className="space-y-4 mb-6">
          <p className="text-sm text-muted-foreground">
            Amount in words: Rupees {amountInWords}
          </p>
        </div>
                  
        {/* Note */}
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
                      
        {/* Buttons */}
        <div className="flex space-x-3 justify-center">
          <Button variant="default" className="bg-gray-900 text-white" type="submit" onClick={() => setIsModalVisible(true)}>
            Generate Payslip
          </Button>
          <Button variant="outline" className="bg-red-600 text-white" onClick={handleReset}>
            Reset
          </Button>
          {isBrowser && (
            <>
            <Button variant="outline" className="bg-gray-700 text-white" >
              <PDFDownloadLink
              document={<PayslipPDF data={formData as any} />}
              fileName="payslip.pdf"
            >
              {({ loading }) =>
                loading ? "Loading document..." : "Download Payslip PDF"
              }
              </PDFDownloadLink>
          </Button>
            </>
          )}
          <Button variant="outline" className="bg-green-500 text-white" onClick={() => setIsEmailModalVisible(true)}>
            Email Pdf
          </Button>
        </div>

        {/* Pdf View Modal */}
        <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <>
        <div className="flex justify-end p-0 m-0">
        <Button  className="pl-2 m-0 text-black font-bold" onClick={() => setIsModalVisible(false)} >
        &#x2715;
        </Button>
        </div>
        <div className="w-full h-full">
      <PDFViewer className="w-full h-full">
              <PayslipPDF data={formData as any} />
      </PDFViewer>
      </div>
      </>
        </Modal>
        {/* Send Email Modal */}
        <Modal isVisible={isEmailModalVisible} onClose={() => setIsEmailModalVisible(false)}>
  <div className="p-6">
    <h3 className="text-lg font-bold mb-4">Enter Email Address</h3>
    <Label htmlFor="email">Email</Label>
    <Input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter recipient's email address"
      className="mb-4"
    />
    <div className="flex justify-end space-x-4">
      <Button variant="outline" onClick={() => setIsEmailModalVisible(false)}>
        Cancel
      </Button>
      <Button variant="outline" className="bg-green-500 text-white" onClick={sendEmailWithPdf}>
        Send Email
      </Button>
    </div>
  </div>
        </Modal>

      </form>
    </div>
  );
}
