import { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import { ErrorObj } from "../form/type";
import { getBorderClass } from "./function";

type Props = {
    carBrand: string,
    setCarBrand: Dispatch<SetStateAction<string>>,
    carModel: string,
    setCarModel: Dispatch<SetStateAction<string>>,
    year: string,
    setYear: Dispatch<SetStateAction<string>>,
    carNumber: string,
    setCarNumber: Dispatch<SetStateAction<string>>,
    errorObj: ErrorObj[]

}
export function CarInputes({ carBrand, setCarBrand, errorObj, carModel, setCarModel, year, setYear, carNumber, setCarNumber }: Props) {

    return (
        <>
            <div className="divForm" id={'divBorder'}>
                <div className="inputTitle">Укажите данные вашего авто</div>
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
                        <div className='inputTitleMini'>Марка автомобиля*</div>
                        <input type="text"
                            className={`${getBorderClass(errorObj, 'carBrand')}`}
                            name="carBrand"
                            placeholder="Hyundai"
                            required
                            value={carBrand}
                            onChange={event => setCarBrand(event.target.value)}
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
                        <div className='inputTitleMini'>Модель*</div>
                        <input type="text"
                            className={`${getBorderClass(errorObj, 'carModel')}`}
                            name="carModel"
                            placeholder="Solaris"
                            required
                            value={carModel}
                            onChange={event => setCarModel(event.target.value)}
                        />
                    </Box>
                </Box>
            </div>
            <div className="divForm">
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

                        <div className='inputTitleMini'>Год выпуска</div>
                        <input type="number"
                            name="year"
                            className={`${getBorderClass(errorObj, 'year')}`}
                            placeholder="2023"
                            required
                            value={year}
                            onChange={
                                event => {
                                    if (!/^\d{0,4}$/.test(event.target.value)) return;
                                    setYear(event.target.value)
                                }
                            }
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
                        <div className='inputTitleMini'>Гос номер</div>
                        <input
                            type="text"
                            className={`${getBorderClass(errorObj, 'carNumber')}`}
                            name="carNumber"
                            placeholder="A001AA 01"
                            required
                            value={carNumber}
                            onChange={event => {
                                const value = event.target.value.toUpperCase();
                                let newValue = '';
                                for (let i = 0; i < value.length; i++) {
                                    if (
                                        (i === 0 && /^[АВЕКМНОРСТУХABEKMHOPCTYX]{1}$/.test(value[i])) ||
                                        (i >= 1 && i <= 3 && /\d/.test(value[i])) ||
                                        (i >= 4 && i <= 5 && /^[АВЕКМНОРСТУХABEKMHOPCTYX]{1}$/.test(value[i])) ||
                                        (i >= 6 && i <= 8 && /^[0-9]$/.test(value[i]))
                                    ) {
                                        newValue += value[i];
                                    }
                                }
                                setCarNumber(newValue);
                            }}
                        />
                    </Box>
                </Box>
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