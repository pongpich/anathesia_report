import React, { useState, useEffect } from "react";
import LoGo from "../Ramlogo.png";
import { useParams } from "react-router";
import axios from "axios";
import BaseUrl from "../api/BaseUrl";
import ReactLoading from "react-loading";
import Barcode from "react-barcode";
import {
  formatYearMonthDayTime,
  formatDayMonthYearTimeThai,
  currentYearMonthDay,
} from "../utils/utils.js";
import urlencode from "urlencode";
import { nl2br } from 'react-js-nl2br';

function Report() {
  const [header, setHeader] = useState([]);
  const [patient, setPatient] = useState([]);
  const [userinfo, setUserinfo] = useState([]);
  const [paperinfo, setPaperinfo] = useState([]);
  const [transfer, setTransfer] = useState([]);
  const [vsinfo, setVsinfo] = useState([]);
  const [body, setBody] = useState();
  const [table, setTable] = useState("PTSTBL    ");
  const [type, setType] = useState("PTS1      ");
  const [done, setDone] = useState(undefined);
  const [ocr, setOcr] = useState([]);
  const { ocmnum, chtnum, seq, user } = useParams();
  const nl2br = require('react-nl2br');

  // const userinfo = [
  //   {
  //     "datetime": "20/09/2565",
  //     "user": "วิชัย ศรีมนัส",
  //     "userCode": "70390 "
  //   }
  // ];
  // const paperinfo = [
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL019   ",
  //     "textValue": "",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03    ",
  //     "title": "ผลการตรวจ Lab /ฉบับ",
  //     "type": "PTS1      ",
  //     "ocmnum": " I2572    ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   }, ,
  //   {
  //     "datetime": "202207201053",
  //     "code": "PTSL020 ",
  //     "textValue": "2",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "ผลการตรวจ X-RAY /แผ่น",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": "W32 ",
  //     "seq": "35817",
  //     "codeValue": "Y"
  //   },
  //   {
  //     "datetime": "202207201053",
  //     "code": "PTSL021 ",
  //     "textValue": "1",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "OPD Clinical Record /ฉบับ",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": "W32 ",
  //     "seq": "35818",
  //     "codeValue": "Y"
  //   },
  //   {
  //     "datetime": "202207201053",
  //     "code": "PTSL022 ",
  //     "textValue": "A",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "ฟิล์ม จำนวนทั้งหมด /แผ่น",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": "W32 ",
  //     "seq": "35819",
  //     "codeValue": "Y"
  //   },
  //   {
  //     "datetime": " ",
  //     "code": "PTSL023 ",
  //     "textValue": "",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "General Summary Sheet หรือใบส่งตัวผู้ป่วยรักษาต่อ",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": " ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": " ",
  //     "code": "PTSL024 ",
  //     "textValue": "",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "Doctor`s Order Sheet / Admission Note / Progress Note",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": " ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": "202209201457",
  //     "code": "PTSL025 ",
  //     "textValue": "สำเนาบัตรประชาชน",
  //     "dataType": "CHECK",
  //     "topic": "TPTS03 ",
  //     "title": "เอกสารอื่นๆ",
  //     "type": "PTS1 ",
  //     "ocmnum": " 13454292",
  //     "user": "70390 ",
  //     "seq": "49284",
  //     "codeValue": "Y"
  //   }
  // ];
  // const vsinfo = [
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL013   ",
  //     "textValue": "0.00",
  //     "dataType": "TEXT",
  //     "topic": "TPTS02    ",
  //     "title": "Temp =",
  //     "type": "PTS1      ",
  //     "ocmnum": "13454292  ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL014   ",
  //     "textValue": "0.00",
  //     "dataType": "TEXT",
  //     "topic": "TPTS02    ",
  //     "title": "Pulse =",
  //     "type": "PTS1      ",
  //     "ocmnum": "13454292  ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL015   ",
  //     "textValue": "0.00",
  //     "dataType": "TEXT",
  //     "topic": "TPTS02    ",
  //     "title": "RR =",
  //     "type": "PTS1      ",
  //     "ocmnum": "13454292  ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL016   ",
  //     "textValue": "0.00/0.00",
  //     "dataType": "TEXT",
  //     "topic": "TPTS02    ",
  //     "title": "BP =",
  //     "type": "PTS1      ",
  //     "ocmnum": "13454292  ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   },
  //   {
  //     "datetime": "            ",
  //     "code": "PTSL017   ",
  //     "textValue": "0.00",
  //     "dataType": "TEXT",
  //     "topic": "TPTS02    ",
  //     "title": "O2 sat =",
  //     "type": "PTS1      ",
  //     "ocmnum": "13454292  ",
  //     "user": "          ",
  //     "seq": "0",
  //     "codeValue": ""
  //   }
  // ];
  // const xxx = "202207201505";
  // const transfer2 = [
  //   {
  //     "code": "PTSL001 ",
  //     "textValue": "To whom it may concern,",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "แพทย์ที่เกี่ยวข้อง",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212020",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80899",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL018 ",
  //     "textValue": "Siriraj hospital",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "โรงพยาบาล",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212020",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80900",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL003 ",
  //     "textValue": "For further management",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "1.เหตุผลในการส่งต่อ (Reason for Tranfer) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212020",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80901",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL004 ",
  //     "textValue": "Congestive heart failure",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "2.เหตุผลในการรับผู้ป่วยไว้ในโรงพยาบาล (Reason for Admisson) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212020",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80902",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL005 ",
  //     "textValue": "Echocardiogram:The AV,MV were thickened and calcified,no vegetation was seen,there was calcification of MV annulus,the LA,LV were enlarged,the LV was hypertrophy,the LVEF =72% without RWMA,doppler study showed mild AS,moderately severe AR,mild MR,mild TR,no cardiac thrombus,no percardial effusion.\n",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "3.ความสำคัญที่ตรวจ (Clinical Finding) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212021",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80904",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL006 ",
  //     "textValue": "A 88-year-old female,she was a case of DM type 2,hyperlipidemia,hypertension,CAD hx PCI (28/09/2011),SSS post PPM(05/07/2022),AS,she presented with progressive dyspnea for 2 days without URI symptom,no chest pain.",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "ประวัติการเจ็บป่วยและการตรวจร่างกาย (Patient History & Physical Findings) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212020",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80903",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL007 ",
  //     "textValue": "\n[17/11/2565 17:20] WBC/HPF (urine) result: 50-100\n\n[20/11/2565 07:38] Culture & sensitivity (HEMO C/S) ขวดที่ 1 result: \r\nSPECIMEN : Blood\r\nNo growth after 3 days\r\n\n\n\n[14/11/2565 07:17] Sugar (serum) [mg/dl] result: 170",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "Pertinent Lab Findings (Detail in attached lab) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212033",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80908",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL008 ",
  //     "textValue": "AS AR with CHF\nUTI\nCAD hx of PCI\nSick sinus syndrome on PPM\nHypertension\nDiabetic mellitus type 2\nHyperlipidemia\nPseudogout",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "4.ข้อวินิฉันโรค (Diagnosis/Impression) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212033",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80905",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL009 ",
  //     "textValue": "",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "5.หัตถการที่ได้รับ (Surgery/Procedure) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": " ",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": " ",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL010 ",
  //     "textValue": "Ertapenem 1 gm IV OD,sitafloxacin 50mg 1x2 ,Gracevit 50 mg 1x2,furosemide40mg 1/2x1,Apolet 75 mg 1x1,Losartan 50 mg 1x1,Madiplot 10 mg 1x1,Jardiance 10 mg 1x1,Ezetrol 10 mg 1x1,Atorvastatin 40 mg 1x1,Miracid 20 mg 1x1,Bisloc 2.5 mg 1/2x1,Colcine 0.6 mg 1x1, Naclong 600 mg 1x2 ,Pregabalin 25 mg 1x1,Chelated Mg 1x1 ",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "6.ยาและการรักษาที่ได้รับ (Treatment given) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211221258",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80909",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL011 ",
  //     "textValue": "Correct AS AR TAVI candidate",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "7.แผนการรักษาต่อ (Plan for further treatment) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212024",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80906",
  //     "table": "PTSTBL "
  //   },
  //   {
  //     "code": "PTSL012 ",
  //     "textValue": "No CHF",
  //     "dataType": "TEXT",
  //     "chtnum": "1027046 ",
  //     "require": "",
  //     "title": "8.สภาพอาการผู้ป่วยก่อนเคลื่อนย้าย (Patient`s condition at transfer) :",
  //     "type": "PTS1 ",
  //     "codeValue": "",
  //     "datetime": "202211212024",
  //     "topic": "TPTS01 ",
  //     "formNum": "2061",
  //     "ocmnum": " 15455989",
  //     "user": "70390 ",
  //     "seq": "80907",
  //     "table": "PTSTBL "
  //   }
  // ];
 

  //Discharge Date/Time

  let setData = [];
  let dataList = [];

  useEffect(() => {
    getPatientInfo();

  }, []);

  const getUserinfo = async () => {
    const request_Patient_Report = {
      params: {
        dbServiceName: "WSGetPatientPhysicalExamByUser",
        ocmnum: ocmnum,
      },
    };
    // const userinfonull = [
    //   {
    //     "datetime": "",
    //     "user": "",
    //     "userCode": ""
    //   }
    // ];
    // const userinfotest = [
    //   // {
    //   //   "datetime": "20/09/2565",
    //   //   "user": "วิชัย ศรีมนัส",
    //   //   "userCode": "70390 "
    //   // }
    // ];
    await axios
      .get(
        `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
        request_Patient_Report
      )
      .then((response) => {
        const responseData4 = response.data.result;
        setUserinfo(response.data.result);
        console.log("userinfo", responseData4);
        getHeader();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getPatientInfo = async () => {
    const request_Patient_Report = {
      params: {
        dbServiceName: "HSPatientInfo",
        ocmnum: ocmnum,
      },
    };
    await axios
      .get(
        `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
        request_Patient_Report
      )
      .then((response) => {
        const responseData = response.data.result;
        setPatient(response.data.result);
        console.log("patient", responseData);
        getPaperinfo();
      })
      .catch((error) => {
        console.error(error);
      });
  };

 



  useEffect(() => {
    // getBody();
  }, [header]);

  // const getBody = async () => {
  //   let setRequst = [];
  //   for (let i = 0; i < header.length; i++) {
  //     const requestBody = {
  //       // params: {
  //       //   dbServiceName: "SWPatientFormList",
  //       //   ocmnum: ocmnum, // (เลขการรกษาของคนไขในรอบ รบมาจากหนา web P’Jane)
  //       //   type: type, //(column code in picture 1 )
  //       //   topic: header[i].topic, //(column “topic” in picture 2 )
  //       // },

  //       params: {
  //         dbServiceName: "SWPatientForm",
  //         ocmnum: ocmnum,
  //         chtnum: chtnum,
  //         table: table,
  //         type: type,
  //         topic: header[i].topic,
  //         seq: seq
  //       }
  //     };
  //     setRequst.push(
  //       await axios
  //         .get(
  //           `${BaseUrl.ram_internet_discharge_summary_newborn_patient_DBService_JSON_path}`,
  //           requestBody
  //         )
  //         .then((response) => {
  //           setData.push(response.data.result);
  //         })
  //         .catch((error) => console.error(error))
  //     );
  //   }

  //   // if (body != undefined || body.length > 0) {
  //   //   body.map((body, i) => {
  //   //     console.log("Data", body);
  //   //   });
  //   // }

  //   if (setData.length > 0) {
  //     console.log("Body", setData);
  //     // await getOcrNumber();
  //     await getData();
  //     await setDone(true);
  //   }
  // };
  // function ocrheader() {
  //   // if (setData.length > 0) {
  //   console.log("Body", setData);
  //   getOcrNumber();
  //   // getData();
  //   // setDone(true);
  //   // }
  // }
  // const getOcrNumber = () => {

  //   if (user.trim()) {


  //     const request_config = {
  //       params: {
  //         prm_ocm: urlencode(ocmnum.trim()), //ocm
  //         prm_date: urlencode(currentYearMonthDay()), //date
  //         prm_type: urlencode("ACC15"), //รหัสเอกสาร
  //         prm_user: urlencode(user), //user ใช้งาน
  //       },
  //     };

  //     axios
  //       .get(
  //         `http://10.100.212.182/AWSqlConnect/RequestOCR.php`,
  //         request_config
  //       )
  //       .then(async (response) => {
  //         try {
  //           let responseData = await response.data;
  //           console.log(responseData, 'ocrdata');
  //           await setOcr(responseData);
  //           window.print();
  //           console.log('You clicked window print.');
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       })
  //       .catch((error) => console.error(error));
  //   }
  // };

  // const getData = () => {
  //   setData.map((body, i) => {
  //     body.map((list, i) => {
  //       dataList.push(list);
  //     });
  //   });

  //   console.log("list", dataList);

  // };

  return (
    <>
      {!done ? (
        <div className="justify-center flex mt-96 content-center ">
          <ReactLoading
            type={"spin"}
            color={"#3c4187"}
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className=" ">
          {!done ? null : (
            <div className=" px-5 py-2 w-screen text-3xl font-bold shadow-lg items-center bg-slate-50 flex space-x-6 mb-3">
              {/* <img src={LoGo} className=" " width="300" alt="" /> */}
              <p classname="">Pre-Post Anesthesia Evaluation Record</p>
              <button
                onClick={window.print}
                className=" border-black rounded-md hover:bg-indigo-900 h-10  hover:text-white border parafont2 px-5 "
              >
                Print
              </button>
            </div>
          )}

          <div >
            <page
              size="A4"
              id="section-to-print"
              className="div-container-print "
            >


              <thead>
                {/* page1 */}
                <header className="grid grid-cols-3 parafont" style={{marginBottom:"10px"}}>
                  <div className="header-1 ">
                    <div className="border border-black  border-r-0 border-b-0 pl-5 place-items-center">
                      <img src={LoGo} className=" w-11/12" alt="" />
                      {/* <div className="col-span-3 ">
                <p>โรงพยาบาลรามคำแหง</p>
                <p className="text-xxs uppercase">Ramkhamhaeng Hospital</p>
                <p className="text-xxs">https://www.ram-hosp.co.th</p>
              </div> */}
                    </div>
                    <div className="border border-black border-r-0 grid grid-cols-4  place-items-center" style={{ height: "67px" }}>
                      <div className=" col-span-4 text-center">
                        <b>
                        Pre-Post Anesthesia Evaluation<br />  Record 
                        </b>
                      </div>
                    </div>
                  </div>
                  <div className="border border-black border-r-0 p-1 -mr-10 space-y-1 pt-0.5">
                    {patient.map((data, i) => (
                      <>
                        <div key={i} className="flex space-x-4">
                          <p className="font-bold">Name:</p>
                          &nbsp;{data.name}
                        </div>
                        <div className="flex space-x-4">
                          <p className="font-bold">Birthday: </p>
                          &nbsp;{data.BirthDte}{" "}
                          <p className="font-bold">Age (Y.M.D):</p>
                          &nbsp;{data.age}
                        </div>
                        <div className="flex space-x-4 "></div>
                        <div className="flex space-x-4">
                          <p className="font-bold">HN: </p>
                          &nbsp;{data.hn}
                          <p className="font-bold">VN: </p>
                          &nbsp;{data.AN_VN}
                        </div>
                        <div className="flex space-x-4">
                          <p className="font-bold">Register date: </p>
                          {/* &nbsp;{data.registerDatetime} */}
                          <br />
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="border overflow-hidden border-black ml-5 place-items-center center-kit">
                    {ocr.length > 0 ? (
                      <div className="text-white headertitleocr mt-1.5">
                        +{ocr[0].Return}+
                      </div>
                    ) : null}
                    <div className="hidden mt-7 font-thin">
                      {patient.map((data, i) => (
                        <Barcode
                          height="25"
                          width="1"
                          displayValue="false"
                          format="CODE39"
                          // textMargin={2}
                          // fontSize={20}
                          value={data.hn}
                        />
                      ))}
                    </div>
                  </div>
                </header>
              </thead>

            </page>
          </div>
        </div>
      )}
    </>
  );
}

export default Report;