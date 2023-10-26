import { NextRequest, NextResponse } from "next/server";
import db from "../../../../prisma";
import { ZodError, z } from "zod";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        if (req.method === 'POST') {

            const clinetSchema = z.object({
                name: z.string(),
                phone: z.string().min(16).max(16),
                carNumber: z.string().min(8).max(9),
                series: z.string().max(4),
                passportNumber: z.string().max(6),
                wherePassportGet: z.string().min(2).max(200),
                passportDate: z.string().max(24),
                year: z.string().min(4).max(4),
                carModel: z.string(),
                carBrand: z.string(),
                drivers: z.array(z.object({
                    id: z.number(),
                    yearsOld: z.string().min(2).max(2),
                    exp: z.string().min(1).max(2),
                    gender: z.enum(['Мужской', 'Женский'])
                })).nonempty({}),
            })

            const adminFromReq = clinetSchema.parse(await req.json())


            //Отправка заявки на почту 
            
            // let testEmailAccount = await nodemailer.createTestAccount()
            // let transporter = nodemailer.createTransport({
            //     host: 'smtp.yandex.ru',
            //     port: 465,
            //     secure: true,
            //     auth: {
            //         user: 'UriyAPKOHT@yandex.ru',
            //         pass: 'bmcxzevnqlokiqgy',
            //     },
            // })

            // let result = await transporter.sendMail({
            //     text: `Заявка от ${adminFromReq.name} ${adminFromReq.phone} машина ${adminFromReq.carBrand}  ${adminFromReq.year} года выпуска 
            //      ${adminFromReq.carModel} ГОС номер${adminFromReq.wherePassportGet}. 
            //      Паспорт  ${adminFromReq.series}  ${adminFromReq.passportNumber} выдан  ${adminFromReq.passportDate}  ${adminFromReq.wherePassportGet}`,
            //     html:
            //         `Заявка от ${adminFromReq.name} ${adminFromReq.phone} машина ${adminFromReq.carBrand}  ${adminFromReq.year} года выпуска
            //     ${adminFromReq.carModel} ГОС номер${adminFromReq.wherePassportGet}.
            //     Паспорт  ${adminFromReq.series}  ${adminFromReq.passportNumber} выдан  ${adminFromReq.passportDate}  ${adminFromReq.wherePassportGet}`,
            // }).catch((error) => {
            //     console.error(error);
            // });


            //регистрация в базу
            const clientSend = await db.client.create({
                data: {
                    name: adminFromReq.name,
                    phone: adminFromReq.phone,
                    carNumber: adminFromReq.carNumber,
                    series: adminFromReq.series,
                    passportNumber: adminFromReq.passportNumber,
                    carBrand: adminFromReq.carBrand,
                    carModel: adminFromReq.carModel,
                    wherePassportGet: adminFromReq.wherePassportGet,
                    passportDate: adminFromReq.passportDate,
                    drivers: adminFromReq.drivers,
                    year: adminFromReq.year,
                }
            })

            const allClientSend = await db.client.findMany()
            return NextResponse.json({ allClientSend })

        } else {
            return new Response(
                "Неверный адрес",
                { status: 404 }
            )
        }

    } catch (error) {
        if (error instanceof ZodError) {
            return new Response(
                ` ${error}`,
                { status: 404 }
            )
        } else {
            return new Response(
                `Ошибка сервера ${error}`,
                { status: 500 }
            )
        }
    }
}

