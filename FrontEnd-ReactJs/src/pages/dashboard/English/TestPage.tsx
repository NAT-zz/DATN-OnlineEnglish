import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Container } from '@mui/material';
// routes
// components
// sections
import { PATH_DASHBOARD } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { TestForm } from 'src/sections/@dashboard/ELtest';

// ----------------------------------------------------------------------

export default function LessonPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Create New Test </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new Test"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Test',
              href: PATH_DASHBOARD.test.root,
            },
            {
              name: 'Create',
            },
          ]}
        />
        <TestForm />
      </Container>
    </>
  );
}
