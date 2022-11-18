export type MoyskladMeta = {
    href: string
    type: string
    mediaType: string
    uuid?: string
}

export class MoyskaldEnityWithMeta  {
    meta: MoyskladMeta
}