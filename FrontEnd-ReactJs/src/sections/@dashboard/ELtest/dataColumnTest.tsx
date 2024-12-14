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
    width: 160,
  },
  {
    field: 'tasks',
    headerName: 'Tasks ID',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => params.row.tasks.join(','),
  },
  {
    field: 'publicDate',
    headerName: 'Public Date',
    width: 100,
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 100,
  },
  {
    field: 'time',
    headerName: 'Time (minutes)',
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
    tasks: string;
    publicDate: Date;
    endDate: Date;
    time: string;
  }[];
} & Omit<DataGridProps, 'columns' | 'rows'>;

export default function DataGridTask({ data, ...rest }: Props) {
  return <DataGrid {...rest} columns={columns} rows={data} />;
}
