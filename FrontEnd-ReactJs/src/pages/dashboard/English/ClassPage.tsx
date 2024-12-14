import { Helmet } from 'react-helmet-async';
// @mui
import { Box, Container } from '@mui/material';
// routes
// components
// sections
import { PATH_DASHBOARD } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { ClassForm } from 'src/sections/@dashboard/ELclass';

// ----------------------------------------------------------------------

export default function LessonPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Create New Class </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new Class"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Class',
              href: PATH_DASHBOARD.class.root,
            },
            {
              name: 'Create',
            },
          ]}
        />
        <ClassForm />
      </Container>
    </>
  );
}
