import { Container, Typography } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { PATH_STUDENT } from 'src/routes/pathsStudent';
import DetailClass from 'src/sections/@dashboard/students/DetailClass';
import { fToNow } from 'src/utils/formatTime';

const DetailClassPage = () => {
  const { themeStretch } = useSettingsContext();
  const { idClass, nameClass } = useParams();
  const [endDate, setEndDate] = useState('');

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
            },
          ]}
        />
        <Typography variant="h6">End {fToNow(endDate as unknown as Date)}</Typography>
        <DetailClass idClass={idClass || ''} nameClass={nameClass || ''} setEndDate={setEndDate} />
      </Container>
    </>
  );
};
export default DetailClassPage;
