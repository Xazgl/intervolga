export type Brend = {
    id: number,
    name: string,
}


export type Gender = {
    id: number,
    name: string,
}


export const Genders: Gender[] = [
    {
        id: 1,
        name: 'Мужской'
    }, {
        id: 2,
        name: 'Женский'
    },
]

export type Driver = {
    id: number,
    yearsOld: string,
    exp: string,
    gender: 'Мужской' | 'Женский',
}

export type Drivers = Driver[]


export type ErrorObj = {
    fieldName: string,
    messageError: string
}

export type ZodeErrorObj = {
    code: string,
    minimum: string,
    type: string,
    inclusive: boolean,
    exact:  boolean,
    message: string,
    path: [string]
}
