import { Helmet } from 'react-helmet-async';
// @mui
import { Card, Container } from '@mui/material';
// routes
// components
// sections
import { PATH_DASHBOARD } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { Box } from '@mui/system';
import TaskList from 'src/sections/@dashboard/ELtask/TaskList';

// ----------------------------------------------------------------------

export default function TaskListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> List Task </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List task"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Task',
              href: PATH_DASHBOARD.task.root,
            },
          ]}
        />
        <Card>
          <Box sx={{ height: 590 }}>
            <TaskList />
          </Box>
        </Card>
      </Container>
    </>
  );
}
