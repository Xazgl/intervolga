//@ts-check

const { PrismaClient } = require("@prisma/client");
const { AxiosError } = require("axios");
const fs = require('fs/promises');
const wait = require('timers/promises').setTimeout
const path = require("path");
const xml2js = require('xml2js')

const cbrLinks = [ "http://www.cbr.ru/scripts/XML_daily.asp?date_req=02/03/2002"] //ссылка на файлы от Макспостера
const axios = require('axios').default

const db = new PrismaClient()
const parser = new xml2js.Parser()


async function start() {
    try {
        /**
         * @type {import('./valute').Valute[] } 
         */
        const valutes = (await Promise.all(cbrLinks.map(async (cbrLink) => {
            try {
                const res = await axios.get(cbrLink)
                const xml = await parser.parseStringPromise(res.data)
                //  if(xml.valutes.length > 0) {
                // console.log(`ответ ${(xml.valutes.valute)}`)
                return xml?.ValCurs?.Valute || []; // возвращаем пустой массив, если нет данных          
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error.code + ': ' + error.message)
                    // logger.error(error.toJSON())
                }
                return [];
            }
        }))).filter(veh => veh !== null).flat()
        for (const valute of valutes) {
            console.log(JSON.stringify(valute.Name[0]))
            const valuteDb = await db.exchangeRate.findUnique({
                where: {
                    id: valute['$'].ID,
                }
            })
            if (valuteDb === null) {
                try {
                    const newValute = await db.exchangeRate.create({
                        data: {
                            id: valute['$'].ID,
                            value: valute.Value[0],
                            nominal:valute.Nominal[0],
                            name:valute.Name[0],
                            charCode:valute.CharCode[0],

                        }
                    })

                    console.log(newValute)
                } catch (error) {
                    console.error(error)
                    // console.log('VIN: ' + valute.name[0])
                }
            } else {
                // console.log(car);
            }
        }

        await wait(5000)
    } catch (error) {
        console.error(error)
    }
}


start()

