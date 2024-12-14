import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { PATH_STUDENT } from 'src/routes/pathsStudent';
import MyClass from 'src/sections/@dashboard/students/MyClass';

const MyClassPage = () => {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>My Class</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="My Class"
          links={[
            {
              name: 'Students',
              href: PATH_STUDENT.root,
            },
            {
              name: 'My Class',
            },
          ]}
        />
         <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          <MyClass/>
        </Box>
      </Container>
    </>
  );
};
export default MyClassPage;
