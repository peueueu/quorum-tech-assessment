export type Legislator = {
  id: number
  name: string
  supportedBills: number
  opposedBills: number
}

export type Bill = {
  id: number
  title: string
  supporters: number
  opposers: number
  primarySponsor: string
}