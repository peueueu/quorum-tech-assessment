import { useEffect, useState } from "react";
import { LegislatorsTable } from "./components/ui/LegislatorsTable";
import {
  BILLS_COL_NAMES,
  Bill,
  LEGISLATOR_COL_NAMES,
  Legislator,
} from "./utils/types";
import { BillsTable } from "./components/ui/BillsTable";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shared/components/ui/tabs";

export default function App() {
  const [legislators, setLegislators] = useState<Legislator[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectedTab, setSelectedTab] = useState<"legislators" | "bills">(
    "legislators"
  );

  useEffect(() => {
    fetch("/api/legislators")
      .then((res) => res.json())
      .then((data) => setLegislators(data));

    fetch("/api/bills")
      .then((res) => res.json())
      .then((data) => setBills(data));
  }, []);

  useEffect(() => { }, [selectedTab]);

  return (
    <>
      <Tabs defaultValue="legislators" className="w-full" value={selectedTab}>
        <TabsList className="grid w-full h-[40px] grid-cols-2 bg-gray-200">
          <TabsTrigger
            className={`text-md ${selectedTab === "legislators" && "tab-selected"}`}
            value="legislators"
            onClick={() => setSelectedTab("legislators")}
          >
            Legislators
          </TabsTrigger>
          <TabsTrigger
            className={`text-md ${selectedTab === "bills" && "tab-selected"}`}
            value="bills"
            onClick={() => setSelectedTab("bills")}
          >
            Bills
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="legislators"
          className="rounded-lg overflow-x-hidden"
        >
          <LegislatorsTable data={legislators} />
        </TabsContent>
        <TabsContent value="bills" className="rounded-lg overflow-x-hidden">
          <BillsTable data={bills} />
        </TabsContent>
      </Tabs>
    </>
  );
}
