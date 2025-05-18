import { useEffect, useState } from "react";
import {
  Bill,
  Legislator,
} from "./utils/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shared/components/ui/tabs";
import { DataTable } from "./components/ui/data-table";
import { billsColumnsDef, legislatorsColumnsDef } from "./components/ui/columns";

export default function App() {
  const [legislators, setLegislators] = useState<Legislator[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectedTab, setSelectedTab] = useState<"legislators" | "bills">(
    "legislators"
  );

  useEffect(() => {
    fetch("/api/legislators", {
      cache: "force-cache"
    })
      .then((res) => res.json())
      .then((data) => setLegislators(data));

    fetch("/api/bills", {
      cache: "force-cache"
    })
      .then((res) => res.json())
      .then((data) => setBills(data));
  }, []);

  useEffect(() => { }, [selectedTab]);

  return (
    <>
      <Tabs defaultValue="legislators" className="w-full" value={selectedTab}>
        <TabsList className="grid w-full h-[40px] grid-cols-2 bg-gray-300">
          <TabsTrigger
            className={`tab-trigger text-md ${selectedTab === "legislators" && "tab-selected"}`}
            value="legislators"
            onClick={() => setSelectedTab("legislators")}
          >
            Legislators
          </TabsTrigger>
          <TabsTrigger
            className={`tab-trigger text-md ${selectedTab === "bills" && "tab-selected"}`}
            value="bills"
            onClick={() => setSelectedTab("bills")}
          >
            Bills
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="legislators"
          className="tab-content rounded-lg overflow-x-hidden"
        >
          <DataTable columns={legislatorsColumnsDef} data={legislators} />
        </TabsContent>
        <TabsContent value="bills" className="tab-content rounded-lg overflow-x-hidden">
          <DataTable columns={billsColumnsDef} data={bills} />
        </TabsContent>
      </Tabs>
    </>
  );
}
