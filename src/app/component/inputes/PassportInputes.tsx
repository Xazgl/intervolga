import { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import { ErrorObj } from "../form/type";
import { getBorderClass } from "./fucnction";

type Props = {
    series: string,
    setSeries: Dispatch<SetStateAction<string>>,
    passportNumber: string,
    setPassportNumber: Dispatch<SetStateAction<string>>,
    passportDate: dayjs.Dayjs,
    setPassportDate: Dispatch<SetStateAction<dayjs.Dayjs>>,
    wherePassportGet: string,
    setWherePassportGet: Dispatch<SetStateAction<string>>,
    errorObj: ErrorObj[],
    handleChangeDate: (newValue: dayjs.Dayjs) => void

}



export function PassportInputes({ series, setSeries, errorObj, passportNumber, setPassportNumber,
    passportDate, setPassportDate, wherePassportGet, setWherePassportGet, handleChangeDate }: Props) {


    return (
        <>
            <div className="divForm" id={'divBorder'}>
                <div className="inputTitle">Паспортные данные</div>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        flexDirection: 'row',
                        marginTop: '10px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            width: '40%',
                            marginTop: '10px',
                            flexDirection: 'column',
                        }}
                    >
                        <div className="inputTitleMini">Серия</div>
                        <input
                            className={`${getBorderClass(errorObj, 'series')}`}
                            type="text"
                            name="series"
                            placeholder="45 01"
                            required
                            value={series}
                            onChange={event => {
                                let newValue = '';
                                const value = event.target.value

                                for (let i = 0; i < value.length; i++) {
                                    if (
                                        (i >= 0 && i <= 3 && /^[0-9]$/.test(value[i]))
                                    ) {
                                        newValue += value[i];
                                    }
                                }

                                setSeries(newValue);
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'start',
                            width: '40%',
                            marginTop: '10px',
                            flexDirection: 'column',
                        }}
                    >
                        <div className="inputTitleMini">Номер</div>
                        <input
                            className={`${getBorderClass(errorObj, 'passportNumber')}`}
                            type="text"
                            name="passportNumber"
                            placeholder="12 54 23"
                            required
                            value={passportNumber}
                            onChange={event => {
                                let newValue = '';
                                const value = event.target.value

                                for (let i = 0; i < value.length; i++) {
                                    if (
                                        (i >= 0 && i <= 5 && /^[0-9]$/.test(value[i]))
                                    ) {
                                        newValue += value[i];
                                    }
                                }

                                setPassportNumber(newValue);
                            }}


                        />
                    </Box>
                </Box>
            </div>

            <div className="divForm">
                <div className="inputTitleMini pb-4">Дата выдачи паспорта </div>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                        className="flex w-full text-[18px]  font-[var(--font-roboto)] mt-5 pl-[12px] pr-[12px] bg-white border-[2px] border-solid border-[#131313] "
                        label="От"
                        inputFormat="MM/DD/YYYY"
                        value={passportDate}
                        onChange={handleChangeDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>

            <div className="divForm">
                <div className="inputTitleMini pb-2">Кем выдан</div>
                <input type="text"
                    className={`${getBorderClass(errorObj, 'wherePassportGet')}`}
                    id="name"
                    name="wherePassportGet"
                    placeholder="РОВД Центрального района по г. Волгограду"
                    required
                    value={wherePassportGet}
                    onChange={(event) => {
                        const inputValue = event.target.value;
                        const sanitizedValue = inputValue.replace(/[^A-Za-zА-Яа-яЁё\s]/g, ''); // Заменяет все символы, кроме букв и пробелов
                        const capitalizedValue = sanitizedValue.charAt(0).toUpperCase() + sanitizedValue.slice(1);
                        if (capitalizedValue.length <= 100) {
                            setWherePassportGet(capitalizedValue);
                        }
                    }}
                />
            </div>

            <style jsx>{`
  
                .divForm {
                   display:flex;
                   width: 100%;
                   justify-content: start;
                   align-items:center;
                   margin-top: 40px;
                   flex-direction: column;
                   padding: 2px;
                   padding-top: 10px;
                   color:black;
                }
            
                #divBorder {
                   border-top: 1px solid  #13131345;
                }
            
                .inputTitle {
                   display:flex;
                   width: 900px;
                   justify-content: start;
                   align-items:center;
                   padding-left:10px;
                   flex-direction: row;
                   font-size: 20px;
                   font-family: var(--font-roboto);
                   color:black;
                }
              
            
                .inputTitleMini {
                   display:flex;
                   width: 100%;
                   align-items:center;
                   padding-left:10px;
                   flex-direction: row;
                   font-size: 16px;
                   font-family: var(--font-roboto);
                   color:rgba(0, 0, 0, 0.674);
                }
            
                input {
                   width: 100%;
                   height: 40px;
                   font-size: 18px; 
                   font-family:var(--font-roboto);
                   padding: 12px 12px;
                   outline:none;
                   margin-top: 10px;
                   background-color: white;
                   color:black;
                }
            
                @media(max-width: 900px) {
                 .divForm {
                   justify-content: center;
                 }
            
                 .inputTitle {
                   width: 600px;
                 }
            
                 .inputTitleMini {
                   font-size:16px;
                 }
                }
            
                @media(max-width: 600px) {
                    .inputTitle {
                       display:flex;
                       width: 100%;
                       font-size: 18px;
                    } 
            
                    .inputTitleMini {
                       display:flex;
                       width: 100%;
                       font-size: 14px;
                       height: 40px;
                    }
                }
            
                @media(max-width: 400px) {
                    .titlePage {
                       font-size: 30px;
                       text-align: center;
                    }
                }

            `}</style>
        </>
    )
}