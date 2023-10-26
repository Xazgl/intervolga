import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Dispatch } from 'react';
import { ErrorObj } from '../form/type';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: '#ffffffeb',
    border: '2px solid red',
    boxShadow: 24,
    p: 4,
};


type Props = {
    open: boolean,
    setOpen: Dispatch<React.SetStateAction<boolean>>,
    errorObj: ErrorObj[]
}


export default function ModalError({ open, setOpen, errorObj }: Props) {

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h3 className='text-black text-2xl text-center'>Форма заполнена не корректно</h3>
                    <ul className='text-black mt-8'>
                        {errorObj.length > 0 &&
                            errorObj.map((error, index) => (
                                <li className='text-black mt-3' key={index}>
                                    <span className='text-base font-medium '> Поле {error.fieldName}</span>: {error.messageError}
                                </li>
                            ))
                        }
                    </ul>
                </Box>
            </Modal>
        </div>
    );
}