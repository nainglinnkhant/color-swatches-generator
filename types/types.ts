interface ColorFields {
    name: string
    min: number
    max: number
}

export interface ColorObject {
    type: string
    fields: ColorFields[]
}

export interface RGB {
    red: number
    green: number
    blue: number
}

export interface HSL {
    hue: number
    saturation: number
    lightness: number
}

export interface RGBColor extends RGB {
    type: string
}

export interface HSLColor extends HSL {
    type: string
}

export interface RGBColorCode extends RGBColor {
    code: string
}

export interface HSLColorCode extends HSLColor {
    code: string
}