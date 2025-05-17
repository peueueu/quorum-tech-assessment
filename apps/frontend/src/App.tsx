import { useEffect, useState } from 'react';
import { DataTable } from "./components/ui/DataTable";
import { Legislators } from 'src/utils/types';

export default function App() {
  const [data, setData] = useState<Legislators[]>();

  useEffect(() => {
    fetch('/api/legislators')
      .then(res => res.json())
      .then(data => console.log(data))
  }, []);

  return (
    <DataTable tableData={data} />
  );
}
