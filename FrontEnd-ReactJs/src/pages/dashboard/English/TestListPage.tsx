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
import TestList from 'src/sections/@dashboard/ELtest/TestList';

// ----------------------------------------------------------------------

export default function TaskListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> List Test </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List test"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Test',
              href: PATH_DASHBOARD.test.root,
            },
          ]}
        />
        <Card>
          <Box sx={{ height: 590 }}>
            <TestList />
          </Box>
        </Card>
      </Container>
    </>
  );
}
