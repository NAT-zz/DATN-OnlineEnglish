// @mui
import { Box } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import { fileThumb } from 'src/components/file-thumbnail';
import { magicLessionRef } from './LessionView';

// ----------------------------------------------------------------------

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 80,
  },
  {
    field: 'topic',
    headerName: 'Topic',
    width: 160,
  },
  {
    field: 'content',
    headerName: 'Content',
    width: 160,
    renderCell: ({ value }: GridRenderCellParams<string>) => (
      <Box
        onClick={() => magicLessionRef.current?.onOpen(value || '')}
        component="img"
        src={fileThumb('document')}
        sx={{
          width: 32,
          height: 32,
          flexShrink: 0,
        }}
      />
    ),
  },
  {
    field: 'type',
    headerName: 'Lesson Type',
    width: 100,
  },
  {
    field: 'tasks',
    headerName: 'Tasks ID',
    // flex: 1,
    valueGetter: (params: GridValueGetterParams) => params.row.tasks.join(','),
  },
  {
    field: 'publicDate',
    headerName: 'Public Date',
    width: 300,
  },
  {
    field: 'taskEndDate',
    headerName: 'Task End Date',
    width: 300,
  },
];

type Props = {
  data: {
    id: string;
    topic: string;
    content: string;
    lessonType: string;
    tasks: string;
    publicDate: Date;
    taskEndDate: Date;
  }[];
} & Omit<DataGridProps, 'columns' | 'rows'>;

export default function DataGridTask({ data, ...rest }: Props) {
  return <DataGrid {...rest} columns={columns} rows={data} />;
}
