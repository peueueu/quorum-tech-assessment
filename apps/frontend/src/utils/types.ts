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

export enum LEGISLATOR_COL_NAMES {
  id = "Id",
  name = "Name",
  supportedBills = "Supported Bills",
  opposedBills = "Opposed Bills"
}

export enum BILLS_COL_NAMES {
  id = "Id",
  title = "Title",
  supporters = "Supporters",
  opposers = "Opposers",
  primarySponsor = "Primary Sponsor"
}


export type DataTableProps<T> = {
  data: T[]
}