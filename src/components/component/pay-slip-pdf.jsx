"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Svg,
  Path,
  Polygon,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    position: 'relative',
  },
  headerDesign: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 50,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 20,
    zIndex: 1,
  },
  middleBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 10,
    zIndex: 2,
  },
  bottomBar: {
    position: 'absolute',
    top: 10,
    left: 0,
    height: 20,
    zIndex: 3,
  },
  footerDesign: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '100%',
    height: 50,
  },
  footerTopBar: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    height: 20,
    width: '100%',
    zIndex: 3,
  },
  footerMiddleBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 20,
    width: '100%',
    zIndex: 2,
  },
  footerBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 10,
    width: '100%',
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "2px solid #E4E4E4",
    marginTop: 20, // Adjust to avoid overlap with the header design
    paddingBottom: 10,
  },
  logoContainer: {
    width: "50%",
    justifyContent: "center",
  },
  logo: {
    width: 100,
  },
  companyInfo: {
    width: "50%",
    fontSize: 10,
    textAlign: "right",
    paddingLeft: "10%",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "start",
    marginBottom: 5,
    width: "90%",
  },
  icon: {
    width: "10%",
    marginRight: 5,
  },
  text: {
    width: "85%",
    textAlign: "left",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    border: "1px solid #E4E4E4",
    borderRadius: 5,
  },
  fieldRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  fieldName: {
    fontSize: 12,
    fontWeight: "bold",
    flex: 1,
    minWidth: "40%",
  },
  fieldColon: {
    fontSize: 12,
    fontWeight: "bold",
    width: 10,
    textAlign: "center",
  },
  fieldValue: {
    fontSize: 12,
    flex: 1.5,
  },
  earningsDeductions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  amountInWords: {
    fontSize: 10,
    fontStyle: "italic",
    marginTop: 10,
  },
  halfColumn: {
    width: "48%",
  },
  halfColumnContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  netPayContainer: {
    width: "38%",
    border: "1px solid #E4E4E4",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#e6ffeb",
  },
  netPayText: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  netPayAmount: {
    fontSize: 22,
    fontWeight: "bold",
  },
  divider: {
    borderBottom: "1px dashed #E4E4E4",
    marginVertical: 10,
  },
  whiteBg: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
  netPayLineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  greenLine: {
    width: 3,
    height: "100%",
    backgroundColor: "green",
    marginRight: 10,
    borderRadius: 5,
  },
  grayTextBold: {
    color: "#3b3b3b",
  },
  grayText: {
    color: "#36454F",
  },
  columnTitle: {
    fontSize: 12,
    fontWeight: "bold",
    flex: 1,
    marginBottom: 5,
  },
  dashedColumnContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    position: "relative",
  },
  dashedDivider: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    borderBottom: "1px dashed #000",
    marginBottom: 10,
  },
  columnHalfRight: {
    display: "flex",
    alignItems: "flex-end",
    width: "50%",
  },
  columnHalfLeft: {
    display: "flex",
    alignItems: "flex-start",
    width: "50%",
  },
  highlightedField: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  highlightedFieldText: {
    fontWeight: "extrabold",
    color: "#000",
  },
});

const PayslipPDF = ({ data }) => (
  <Document>
    <Page size="A4" >
      {/* Header Design */}
      <View style={styles.headerDesign}>
        <Svg height="30" width="100%" style={styles.topBar}>
          <Polygon points="0 0, 120% 0, 80% 100%, 0% 100%" fill="#1C3D50" />
        </Svg>
        <Svg height="20" width="100%" style={styles.middleBar}>
          <Polygon points="0,0 842,0 842,20 0,20" fill="#009FDA" />
        </Svg>
        <Svg height="30" width="100%" style={styles.bottomBar}>
          <Polygon points="0 0, 135% 0, 80% 100%, 0% 100%" fill="#ADD8E6" />
        </Svg>
      </View>
      <View style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logo} src="/logo.png" />
          </View>
          <View style={styles.companyInfo}>
            <View style={styles.infoRow}>
              <Svg height="12" width="12" viewBox="0 0 24 24" style={styles.icon}>
                <Path
                  d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 12 4 6.01V6h16zm0 12H4v-8l8 5 8-5v8z"
                  fill="#000"
                />
              </Svg>
              <Text style={styles.text}>info@cortechsols.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Svg height="12" width="12" viewBox="0 0 24 24" style={styles.icon}>
                <Path
                  d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.13-.21 11.72 11.72 0 004.5.9 1 1 0 011 1V20a1 1 0 01-1 1 19 19 0 01-16.7-16.7 1 1 0 011-1h2.5a1 1 0 011 1 11.72 11.72 0 00.9 4.5 1 1 0 01-.21 1.13l-2.2 2.2z"
                  fill="#000"
                />
              </Svg>
              <Text style={styles.text}>+92 318 945 49 25</Text>
            </View>
            <View style={styles.infoRow}>
              <Svg height="12" width="12" viewBox="0 0 24 24" style={styles.icon}>
                <Path
                  d="M12 2C8.13 2 5 5.13 5 9c0 4.97 7 13 7 13s7-8.03 7-13c0-3.87-3.13-7-7-7zm0 10.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="#000"
                />
              </Svg>
              <Text style={[styles.text]}>Basement Building Gulberg Nova, Business square Block A, gulberg greens Islamabad.</Text>
            </View>
          </View>
        </View>
        {/* Employee Pay Summary Section */}
        <View style={styles.section}>
          <View style={styles.halfColumnContainer}>
            <View style={styles.halfColumn}>
              <View style={styles.fieldRow}>
                <Text style={[styles.title, styles.grayTextBold]}>Employee Summary</Text>
              </View>
              <View style={styles.fieldRow}>
                <Text style={[styles.fieldName, styles.grayText]}>Employee Name</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{data.employeePaySummary.employeeName}</Text>
              </View>
              <View style={styles.fieldRow}>
                <Text style={[styles.fieldName, styles.grayText]}>Employee ID</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{data.employeePaySummary.employeeId}</Text>
              </View>
              <View style={styles.fieldRow}>
                <Text style={[styles.fieldName, styles.grayText]}>Pay Period</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{data.employeePaySummary.payPeriod}</Text>
              </View>
              <View style={styles.fieldRow}>
                <Text style={[styles.fieldName, styles.grayText]}>Pay Date</Text>
                <Text style={styles.fieldColon}>:</Text>
                <Text style={styles.fieldValue}>{data.employeePaySummary.payCycle}</Text>
              </View>
              {data.employeePaySummary.additionalFields.map((field, index) => (
                <View style={styles.fieldRow} key={index}>
                  <Text style={[styles.fieldName, styles.grayText]}>{field.fieldName}</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>{field.fieldValue}</Text>
                </View>
              ))}
            </View>
            <View style={styles.netPayContainer}>
              <View style={styles.netPayLineContainer}>
                <View style={styles.greenLine}></View>
                <View>
                  <Text style={styles.netPayAmount}>
                    RS {data.totalNetPayable.toFixed(2)}
                  </Text>
                  <Text style={[styles.netPayText, styles.grayText]}>Employee Net Pay</Text>
                </View>
              </View>
              <View style={styles.divider}></View>
              <View style={styles.whiteBg}>
                <View style={styles.fieldRow}>
                  <Text style={[styles.fieldName, styles.grayText]}>Paid Days</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>{data.employeePaySummary.payDate}</Text>
                </View>
                <View style={styles.fieldRow}>
                  <Text style={[styles.fieldName, styles.grayText]}>LOP Days</Text>
                  <Text style={styles.fieldColon}>:</Text>
                  <Text style={styles.fieldValue}>{data.employeePaySummary.lossOfPayDays}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Income Details Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Income Details</Text>
          <View style={styles.halfColumnContainer}>
            <View style={styles.halfColumn}>
              <View style={{ position: "relative" }}>
                <View style={styles.dashedColumnContainer}>
                  <Text style={[styles.columnTitle, { textAlign: "left" }]}>Earnings</Text>
                  <Text style={[styles.columnTitle, { textAlign: "right" }]}>Amount</Text>
                </View>
                <View style={styles.dashedDivider}></View>
              </View>
              {data.incomeDetails.earnings.map((earnings, index) => (
                <View style={styles.fieldRow} key={index}>
                    <Text style={[styles.fieldValue,{ textAlign: "left" }]}>{earnings.description}</Text>
                    <Text style={[styles.fieldValue,{ textAlign: "right" }]}>{earnings.amount} RS</Text>
                </View>
              ))}
              <View style={[styles.fieldRow, styles.highlightedField]}>
                <Text style={[styles.fieldName, styles.highlightedFieldText]}>Gross Earnings:</Text>
                <Text style={[styles.fieldValue, styles.highlightedFieldText, { textAlign: "right" }]}>{data.grossEarnings} RS</Text>
              </View>
              <View style={{ marginBottom: 15 }}></View>
            </View>
            <View style={styles.halfColumn}>
              <View style={{ position: "relative" }}>
                <View style={styles.dashedColumnContainer}>
                  <Text style={[styles.columnTitle, { textAlign: "left" }]}>Deductions</Text>
                  <Text style={[styles.columnTitle, { textAlign: "right" }]}>Amount</Text>
                </View>
                <View style={styles.dashedDivider}></View>
              </View>
              {data.incomeDetails.deductions.map((deductions, index) => (
                <View style={styles.fieldRow} key={index}>
                    <Text style={[styles.fieldValue,{ textAlign: "left" }]}>{deductions.description}</Text>
                    <Text style={[styles.fieldValue,{ textAlign: "right" }]}>{deductions.amount} RS</Text>
                </View>
              ))}
              <View style={[styles.fieldRow, styles.highlightedField]}>
                <Text style={[styles.fieldName, styles.highlightedFieldText]}>Gross Deductions:</Text>
                <Text style={[styles.fieldValue, styles.highlightedFieldText, { textAlign: "right" }]}>{data.grossDeductions} RS</Text>
              </View>
              <View style={{ marginBottom: 15 }}></View>
            </View>
          </View>
          
          <View style={[styles.fieldRow, styles.highlightedField]}>
            <Text style={[styles.fieldName, styles.highlightedFieldText]}>Total Net Payable:</Text>
            <Text style={[styles.fieldValue, styles.highlightedFieldText, { textAlign: "right" }]}>{data.totalNetPayable} RS</Text>
          </View>
          <View style={styles.fieldRow}>
            <Text style={styles.amountInWords}>
              Amount in Words : {data.amountInWords}
            </Text>
          </View>
        </View>
      </View>
      {/* Note Display */}
      {data.note && (
        <View style={[{paddingLeft:20}]}>
          <Text style={[styles.title,{fontSize:12}]}>Note: 
            <Text> </Text>
          <Text style={[styles.grayText,{fontSize:12}]}>{data.note}</Text>
          </Text>
        </View>
      )}
      {/* Sysytem Generated Slip Indication */}
      <View style={[{padding:20}]}>
        <Text style={[styles.grayText,{fontSize:12}]}>
          This is a system generated pay slip and does not require any signature or stamp.
        </Text>        
      </View>
      {/* Footer Design */}
      <View style={styles.footerDesign}>
  <Svg height="10" width="100%" style={styles.footerBottomBar}>
    <Polygon points="0,0 842,0 820,20 0,20" fill="#009FDA" />
  </Svg>
</View>


    </Page>
  </Document>
);

export default PayslipPDF;
