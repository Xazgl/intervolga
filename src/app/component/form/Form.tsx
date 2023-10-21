"use client"
import { FormEvent, useEffect, useRef, useState } from "react";
import { Checkbox } from "@mui/material";
import { Driver, ErrorObj } from "./type";
import { DriversForm } from "./forms/DriversForm";
import EditNoteIcon from '@mui/icons-material/EditNote';
import dayjs from 'dayjs';
import { CarInputes } from "../inputes/CarInputes";
import { PersonalInputes } from "../inputes/PersonalDate";
import { PassportInputes } from "../inputes/PassportInputes";


export function Form() {

    const [carBrand, setCarBrand] = useState(localStorage.getItem('carBrand') || '')
    const [carModel, setCarModel] = useState(localStorage.getItem('carModel') || '')
    const [year, setYear] = useState(localStorage.getItem('year') || '')
    const [series, setSeries] = useState(localStorage.getItem('series') || '')
    const [carNumber, setCarNumber] = useState(localStorage.getItem('carNumber') || '')
    const [passportNumber, setPassportNumber] = useState(localStorage.getItem('passportNumber') || '')
    const [name, setName] = useState(localStorage.getItem('name') || '')
    const [phone, setPhone] = useState(localStorage.getItem('phone') || '')
    const [wherePassportGet, setWherePassportGet] = useState(localStorage.getItem('wherePassportGet') || '')
    const [passportDate, setPassportDate] = useState(dayjs(localStorage.getItem('passportDate')) || (dayjs('2016-00-00T00:00:00')));

    const [drivers, setDrivers] = useState<Driver[]>([{
        id: 0,
        yearsOld: '',
        gender: 'Мужской',
        exp: ''
    }]) //водители

    const [disabledBtn, setDisabledBtn] = useState(true)
    const [checked, setChecked] = useState(false);

    const [errorObj, setErrorObj] = useState<ErrorObj []>([])


    useEffect(() => {
        localStorage.setItem('carBrand', carBrand);
        localStorage.setItem('carModel', carModel);
        localStorage.setItem('year', year);
        localStorage.setItem('series', series);
        localStorage.setItem('carNumber', carNumber);
        localStorage.setItem('passportNumber', passportNumber);
        localStorage.setItem('name', name);
        localStorage.setItem('phone', phone);
        localStorage.setItem('wherePassportGet', wherePassportGet);
        localStorage.setItem('passportDate', passportDate.toString());
    }, [checked, name, phone, year, series, carNumber, passportNumber, carModel, carBrand, wherePassportGet, passportDate, drivers])



    useEffect(() => {
        if (checked === true && name > '' && phone > '' &&
            carBrand > '' && year > '' && series > '' && carNumber > '' && passportNumber > '' && drivers.length > 0 &&
            wherePassportGet > '' && carModel > '' && series.length == 4 && passportNumber.length == 6
            && carNumber.length >= 8) {
            setDisabledBtn(false)
        } else {
            setDisabledBtn(true)
        }
    }, [checked, name, phone, year, series, carNumber, passportNumber, carModel, wherePassportGet, passportDate, drivers])



    const formBtn = useRef(null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const className = [
        'btn',
        disabledBtn === false ? 'btn_show' : '',
    ]


    async function sendmail(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (checked === true) {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, phone, year, series, carNumber, passportNumber,
                    carModel, carBrand, wherePassportGet, drivers, passportDate
                })
            })
            if (res.ok) {
                const result = await res.json()
                console.log("Ваша заявка успешно отправлена")
            } else {
                const result = await res.json()
                const errorsLogs = result.map(el => {
                    return {
                        fieldName: el.path[0],
                        messageError: el.message
                    }
                })
                
                setErrorObj(errorsLogs)
        }
    
    }
}


const handleChangeDate = (newValue: dayjs.Dayjs) => {
    setPassportDate(newValue);
    localStorage.setItem('passportDate', dayjs(newValue).toISOString());
};


return (
    <>
        <div className="background">
            <div className="column">
                <h1 className="titlePage">Транспортные средства и водители</h1>
                <h3 className="desc">Заполните поля ниже, чтобы мы могли предоставить вам расчеты</h3>

                <form onSubmit={sendmail}>

                    {/* Данные авто*/}
                    <CarInputes
                        carBrand={carBrand}
                        setCarBrand={setCarBrand}
                        carModel={carModel}
                        setCarModel={setCarModel}
                        year={year}
                        setYear={setYear}
                        carNumber={carNumber}
                        setCarNumber={setCarNumber}
                        errorsLogs={errorsLogs}
                    />

                    {/* Имя и телефон */}
                    <PersonalInputes
                        name={name}
                        setName={setName}
                        phone={phone}
                        setPhone={setPhone}
                    />

                    {/* паспорт */}
                    <PassportInputes
                        series={series}
                        setSeries={setSeries}
                        passportNumber={passportNumber}
                        setPassportNumber={setPassportNumber}
                        year={year}
                        setYear={setYear}
                        passportDate={passportDate}
                        setPassportDate={setPassportDate}
                        wherePassportGet={wherePassportGet}
                        setWherePassportGet={setWherePassportGet}
                        handleChangeDate={handleChangeDate}
                    />

                    {/* страховка */}
                    <div className="divForm" id={'divBorder'}>
                        <div className="inputTitle">Включить в страховку</div>
                        <DriversForm setDrivers={setDrivers} drivers={drivers}  />
                    </div>

                    <div className="divForm" style={{ alignItems: "start" }}>
                        <div className="inputTitle" style={{ fontSize: '14px' }}>Даю согласие на обработку своих персональных данных и соглашаюсь с политикой обработки персональных данных</div>
                        <Checkbox
                            color="default"
                            sx={{ color: 'black' }}
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>

                    <div className="divForm">
                        <button className={className.join(' ')} ref={formBtn}
                            type="submit"
                            disabled={disabledBtn}
                            title="Заполните форму, перед отправкой"
                        >
                            <EditNoteIcon
                                sx={{ fontSize: '30px' }}
                            />
                            Отправить
                        </button>
                    </div>
                </form>
            </div >
        </div >

        <style jsx>{`
  
           .background {
                display:flex; 
                height:auto;
                justify-content: center;
                align-items:center;
                flex-direction: column;
                background-position: center center;
                background-repeat:no-repeat;
                background-size:cover;
                padding-top: 40px;
                padding-bottom: 40px;
            }

           .column {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: baseline;
                width:900px;
                font-family: var(--font-roboto);
           }

           .titlePage {
                display: flex;
                justify-content: start;
                width:100%;
                font-size:45px;
                font-weight: bold;
                color:black;
                font-family: var(--font-roboto);
            }

           .desc {
                display:flex; 
                width: 100%;
                justify-content: start;
                align-items:center;
                margin-top:20px;
                font-family: var(--font-roboto);
                font-size:21px;
                color:black;
           }

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
           
            
           .btn {
                display:flex;
                justify-content:center;
                flex-direction:row;
                align-items:center;
                flex-direction:row;
                font-family: var(--font-roboto);
                transition: transform.3s;
                width: 100%;
                height: 45px;
                background: transparent;
                border: 2px solid;
                margin-top:40px;
                font-size:20px;
                text-align: center;
                align-items: center;
                gap:8px;
                cursor: pointer;
           }

           .btn_show{
                background-color: #D1AC02;
                color:black;
           }
           
           .btn_show:hover {
                background: #131313;
                color:white;
           }


            @media(max-width: 900px) {
                .column {
                     width: 600px;
                }
  
                .divForm {
                  justify-content: center;
                }
  
                .inputTitle {
                  width: 600px;
                }

            }


           @media(max-width: 600px) {
                .titlePage {
                        font-size: 35px;
                        text-align: center;
                }

                .desc {
                    justify-content: center;
                    font-size:18px;
                    text-align: center;
                } 
    
                .inputTitle {
                    display:flex;
                    width: 100%;
                    font-size: 18px;
                } 

                .column {
                    width:90%
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