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
    field: 'sentence',
    headerName: 'Sentence',
    width: 160,
  },
  {
    field: 'questionType',
    headerName: 'Question Type',
    width: 160,
  },
  {
    field: 'key',
    headerName: 'Key answer',
    width: 120,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'answers',
    headerName: 'Answers',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => params.row.answers.join(',') || '',
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
    sentence: string;
    questionType: string;
    key: string;
    answers: string;
  }[];
} & Omit<DataGridProps,'columns' | 'rows'>;

export default function DataGridQuestion({ data, ...rest }: Props) {
  return <DataGrid {...rest} columns={columns} rows={data} />;
}
