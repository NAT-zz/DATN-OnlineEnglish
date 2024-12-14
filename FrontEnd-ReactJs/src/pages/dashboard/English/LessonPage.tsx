import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Container } from '@mui/material';
// routes
// components
// sections
import { PATH_DASHBOARD } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { LessonForm } from 'src/sections/@dashboard/ELlesson';

// ----------------------------------------------------------------------

export default function LessonPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Create New Lesson </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new Lesson"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Lesson',
              href: PATH_DASHBOARD.lesson.root,
            },
            {
              name: 'Create',
            },
          ]}
        />
        <LessonForm />
      </Container>
    </>
  );
}
