export type Legislators = {
  id: number
  name: string
  supportedBills: number
  opposedBills: number
}

export type Bills = {
  id: number
  title: string
  supporters: number
  opposers: number
  primarySponsor: string
}

export type DataTableProps<T> = {
  tableData?: T[]
}