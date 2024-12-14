import { Box, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import AllCard from 'src/sections/@dashboard/students/CardSection';

const DailyPage = () => {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Daily Tasks</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Today's Tasks"
          links={[
            {
              name: 'Students',
            },
            {
              name: 'Daily',
            },
          ]}
        />
        <AllCard />
      </Container>
    </>
  );
};
export default DailyPage;
