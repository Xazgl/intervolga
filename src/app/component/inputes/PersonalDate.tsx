import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IMaskInput } from "react-imask";
import { ErrorObj } from "../form/type";
import { getBorderClass } from "./fucnction";

type Props = {
    name: string,
    setName: Dispatch<SetStateAction<string>>,
    phone: string,
    setPhone: Dispatch<SetStateAction<string>>,
    errorObj: ErrorObj[]
}

export function PersonalInputes({ name, setName, phone, setPhone, errorObj }: Props) {

    return (
        <>
            {/* Имя */}
            <div className="divForm" id={'divBorder'}>
                <label htmlFor="name" className="form-label"></label>
                <div className="inputTitle">Имя*</div>
                <input type="text"
                    className={`${getBorderClass(errorObj, 'name')}`}
                    id="name"
                    name="name"
                    placeholder="Александр"
                    required
                    value={name}
                    onChange={(event) => {
                        const inputValue = event.target.value;
                        const sanitizedValue = inputValue.replace(/[^A-Za-zА-Яа-яЁё\s]/g, ''); // Заменяет все символы, кроме букв и пробелов
                        const capitalizedValue = sanitizedValue.charAt(0).toUpperCase() + sanitizedValue.slice(1);
                        if (capitalizedValue.length <= 50) {
                            setName(capitalizedValue);
                        }
                    }}

                />
            </div>

            {/* телефон */}
            <div className="divForm">
                <div className="inputTitle">Телефон* </div>
                <label htmlFor="phone" className="form-label"></label>
                <IMaskInput
                    style={{
                        fontSize: '18px',
                        height: '40px',
                        width: '100%',
                        marginTop: '10px',
                        padding: '12px 12px',
                        outline: 'none',
                        fontFamily: 'var(--font-roboto)',
                        backgroundColor: 'white',
                        
                    }}
                    id="inputP"
                    className={`${getBorderClass(errorObj, 'phone')}`}
                    mask={'+{7}(000)000-00-00'}
                    placeholder="+7 ___ ___ __ __"
                    required
                    value={phone}
                    name="phone"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPhone(event.target.value)}
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