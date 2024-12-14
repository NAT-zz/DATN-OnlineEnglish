import { Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { PATH_STUDENT } from 'src/routes/pathsStudent';
import DetailTest from 'src/sections/@dashboard/students/DetailTest';

const DetailTestPage = () => {
  const { themeStretch } = useSettingsContext();

  const { idClass, nameClass, idTest } = useParams();

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
        <DetailTest idTest={idTest || ''} />
      </Container>
    </>
  );
};
export default DetailTestPage;
