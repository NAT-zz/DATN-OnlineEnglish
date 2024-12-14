import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { PATH_STUDENT } from 'src/routes/pathsStudent';
import AllClass from 'src/sections/@dashboard/students/AllClass';

const AllClassPage = () => {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>All Class</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="All Class"
          links={[
            {
              name: 'Students',
              href: PATH_STUDENT.root,
            },
            {
              name: 'All Class',
            },
          ]}
        />
        <AllClass />
      </Container>
    </>
  );
};
export default AllClassPage;
