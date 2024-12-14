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
import { QuestionList } from 'src/sections/@dashboard/ELquestion';

// ----------------------------------------------------------------------

export default function QuestionListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> List Question </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List question"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Question',
              href: PATH_DASHBOARD.question.root,
            },
          ]}
        />
        <Card>
          <Box sx={{ height: 590 }}>
            <QuestionList />
          </Box>
        </Card>
      </Container>
    </>
  );
}
