import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/components/ui/table"
import { DataTableProps, Legislator } from "src/utils/types"

const LEGISLATORS_TABLE_COLS_DEF = [
  "ID",
  "Name",
  "Supported Bills",
  "Opposed Bills",
] as const;

export function LegislatorsTable({ data }: DataTableProps<Legislator>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {LEGISLATORS_TABLE_COLS_DEF.map((colName) => {
            return <TableHead key={colName} className="w-[100px]">{colName}</TableHead>
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((legislator) => (
          <TableRow key={legislator.id}>
            <TableCell className="font-medium">{legislator.id}</TableCell>
            <TableCell>{legislator.name}</TableCell>
            <TableCell>{legislator.supportedBills}</TableCell>
            <TableCell>{legislator.opposedBills}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}