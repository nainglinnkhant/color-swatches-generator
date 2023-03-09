import type { NextApiRequest, NextApiResponse } from 'next'
import { Color, ColorObject } from '../../types/types'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{colors: Color[]}>,
) {
    const colorFormats = [
        {
            type: 'rgb',
            fields: [
                { name: 'red', min: 0, max: 255 },
                { name: 'green', min: 0, max: 255 },
                { name: 'blue', min: 0, max: 255 },
            ],
        },
        {
            type: 'hsl',
            fields: [
                { name: 'hue', min: 0, max: 360 },
                { name: 'saturation', min: 0, max: 100 },
                { name: 'lightness', min: 10, max: 90 },
            ],
        },
    ]

    const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min)

    const generateColorFormat = () => {
        const type = getRandomInt(0, colorFormats.length)
        return colorFormats[type]
    }

    const generateColor = ({ type, fields }: ColorObject) => {
        const requiredFieldsObjs = fields.map(field => ({
            [field.name]: getRandomInt(field.min, field.max)
        }))
        // const requiredFields = Object.assign(...requiredFieldsObjs)
        const requiredFields = requiredFieldsObjs.reduce(
            (acc, field) => ({ ...acc, ...field }),
            {}
        )

        return {
            type,
            ...requiredFields,
        } as Color
    }

    const formats = new Array(5).fill(0).map(() => generateColorFormat())

    const colors = formats.map(format => generateColor(format))

    res.status(200).json({ colors })
}
