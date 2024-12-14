import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { PATH_STUDENT } from 'src/routes/pathsStudent';

const ListLessionPage = () => {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>List Lession</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="List Lession"
          links={[
            {
              name: 'Student',
              href: PATH_STUDENT.root,
            },
            {
              name: 'List Lession',
            },
          ]}
        />
      </Container>
    </>
  );
};
export default ListLessionPage;
