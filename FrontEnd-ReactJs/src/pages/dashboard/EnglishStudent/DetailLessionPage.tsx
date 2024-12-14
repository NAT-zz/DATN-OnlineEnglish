import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { PATH_STUDENT } from 'src/routes/pathsStudent';
import DetailLession from 'src/sections/@dashboard/students/DetailLession';

const DetailLessionPage = () => {
  const { themeStretch } = useSettingsContext();

  const { idClass, nameClass, idLession } = useParams();
    
  return (
    <>
      <Helmet>
        <title>{nameClass}</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={nameClass}
          links={[
            {
              name: 'Students',
              href: PATH_STUDENT.root,
            },
            {
              name: 'My Class',
              href: PATH_STUDENT.class.listMyClass,
            },
            {
              name: nameClass,
              href: `${PATH_STUDENT.class.listMyClass}/${idClass}/${nameClass}`,
            },
            {
              name: '#',
            },
          ]}
        />
        <DetailLession idLession={idLession || ''} />
      </Container>
    </>
  );
};
export default DetailLessionPage;
