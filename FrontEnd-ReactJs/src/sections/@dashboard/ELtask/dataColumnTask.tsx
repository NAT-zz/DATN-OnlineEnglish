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
    field: 'task',
    headerName: 'Task',
    width: 160,
  },
  {
    field: 'topic',
    headerName: 'Topic',
    width: 160,
  },
  {
    field: 'taskType',
    headerName: 'Task Type',
    width: 100,
  },
  {
    field: 'questions',
    headerName: 'Questions ID',
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => {
      const listIdQuestion = params.row.questions.map((e: { id: string; }) => e.id);
      return listIdQuestion.join(',');
    }
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
    task: string;
    topic: string;
    taskType: string;
    questions: string;
  }[];
} & Omit<DataGridProps,'columns' | 'rows'>;

export default function DataGridTask({ data, ...rest }: Props) {
  return <DataGrid {...rest} columns={columns} rows={data} />;
}
