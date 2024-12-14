// @mui
import { DataGrid, DataGridProps, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// ----------------------------------------------------------------------

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 80,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 120,
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 160,
  },
  {
    field: 'lessons',
    headerName: 'Lessons ID',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => params.row.lessons.join(','),
  },
  {
    field: 'tests',
    headerName: 'Tests ID',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => params.row.tests.join(','),
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 100,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 100,
  },
  {
    field: 'action',
    headerName: ' ',
    width: 80,
    align: 'right',
    sortable: false,
    disableColumnMenu: true,
  },
];

type Props = {
  data: {
    id: string;
    name: string;
    description: string;
    lessons: string;
    tests: string;
    startDate: Date;
    endDate: Date;
  }[];
} & Omit<DataGridProps, 'columns' | 'rows'>;

export default function DataGridTask({ data, ...rest }: Props) {
  return <DataGrid {...rest} columns={columns} rows={data} />;
}
