import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Container } from '@mui/material';
// routes
// components
// sections
import { PATH_DASHBOARD } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { TaskForm } from 'src/sections/@dashboard/ELtask';

// ----------------------------------------------------------------------

export default function TaskPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Create New Task </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new task"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Task',
              href: PATH_DASHBOARD.task.root,
            },
            {
              name: 'Create',
            },
          ]}
        />
        <TaskForm />
      </Container>
    </>
  );
}
