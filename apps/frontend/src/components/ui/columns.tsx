import { ColumnDef } from "@tanstack/react-table"
import type { Bill, Legislator } from '../../utils/types'

export const billsColumnsDef: ColumnDef<Bill>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "supporters",
    header: "Supporters",
  },
  {
    accessorKey: "opposers",
    header: "Opposers",
  },
  {
    accessorKey: "primarySponsor",
    header: "Primary Sponsor"
  }
]

export const legislatorsColumnsDef: ColumnDef<Legislator>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "supportedBills",
    header: "Supported Bills",
  },
  {
    accessorKey: "opposedBills",
    header: "Opposed Bills",
  },
]
