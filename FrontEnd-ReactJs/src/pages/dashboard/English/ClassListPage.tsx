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
import ClassList from 'src/sections/@dashboard/ELclass/ClassList';

// ----------------------------------------------------------------------

export default function TaskListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> List Class </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List Class"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Class',
              href: PATH_DASHBOARD.class.root,
            },
          ]}
        />
        <Card>
          <Box sx={{ height: 590 }}>
            <ClassList />
          </Box>
        </Card>
      </Container>
    </>
  );
}
