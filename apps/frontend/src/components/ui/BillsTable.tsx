import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/ui/table"
import { DataTableProps, Bill } from "src/utils/types"


const BILLS_TABLE_COLS_DEF = [
  "ID",
  "Title",
  "Supporters",
  "Opposers",
  "Primary Sponsor"
] as const;

export function BillsTable({ data }: DataTableProps<Bill>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {BILLS_TABLE_COLS_DEF.map((colName) => {
            return <TableHead key={colName} className="w-[100px]">{colName}</TableHead>
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((bill) => (
          <TableRow key={bill.id}>
            <TableCell className="color-primary font-medium">{bill.id}</TableCell>
            <TableCell>{bill.title}</TableCell>
            <TableCell>{bill.supporters}</TableCell>
            <TableCell>{bill.opposers}</TableCell>
            <TableCell>{bill.primarySponsor}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}