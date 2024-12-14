import { Helmet } from 'react-helmet-async';
// @mui
import { Container } from '@mui/material';
// routes
// components
// sections
import { PATH_DASHBOARD } from 'src/routes/paths';
import { QuestionForm } from 'src/sections/@dashboard/ELquestion';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function QuestionPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title> Create New Question </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Create a new question"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Question',
              href: PATH_DASHBOARD.question.root,
            },
            {
              name: 'Create',
            },
          ]}
        />

        <QuestionForm />
      </Container>
    </>
  );
}
