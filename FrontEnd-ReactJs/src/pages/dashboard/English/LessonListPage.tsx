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
import LessonList from 'src/sections/@dashboard/ELlesson/LessonList';

// ----------------------------------------------------------------------

export default function TaskListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> List Lesson </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List lesson"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Lesson',
              href: PATH_DASHBOARD.lesson.root,
            },
          ]}
        />
        <Card>
          <Box sx={{ height: 590 }}>
            <LessonList />
          </Box>
        </Card>
      </Container>
    </>
  );
}
