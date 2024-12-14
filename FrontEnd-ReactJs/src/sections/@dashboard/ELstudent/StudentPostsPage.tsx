import orderBy from 'lodash/orderBy';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
// @mui
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { IBlogPost } from 'src/@types/blog';
import { getSubmiited } from 'src/api/useQuestion';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { SkeletonPostItem } from 'src/components/skeleton';
import { PATH_DASHBOARD } from 'src/routes/paths';
import BlogPostCard from './BlogPostCard';
import BlogPostsSearch from './BlogPostsSearch';
import BlogPostsSort from './BlogPostsSort';
// utils

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

type ISubmitData = {
  submitted: [
    {
      student: {
        _id: '673628c87e1dedaf86828d0c';
        id: 3;
        userName: 'Tuan Nguyen';
        avatar: null;
      };
      result: {
        id: 2;
        multiple_choice: {
          score: '20% - 1/5 ';
          correctQuestions: [3];
        };
        essays: [
          {
            idTask: 4;
            score: 'waiting';
            content: 'test';
          }
        ];
      };
      createdAt: 1733670063340;
    }
  ];
  unsubmitted: [
    {
      student: {
        _id: '673628c87e1dedaf86828d0c';
        id: 3;
        userName: 'Tuan Nguyen';
        avatar: null;
      };
    }
  ];
};

export default function StudentPostsPage() {
  const { themeStretch } = useSettingsContext();

  const [submitData, setSubmitData] = useState<ISubmitData>();
  const { idClass, type, idType } = useParams();

  const [sortBy, setSortBy] = useState('latest');

  // const sortedPosts = applySortBy(submitData, sortBy);

  useEffect(() => {
    getSubmiited(idClass as string, type as string, idType as string).then((value) => {
      setSubmitData(value.data);
      console.log('submit data: ', value.data);
    });
  }, [idClass, idType, type]);

  const handleChangeSortBy = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title> Students </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Question"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Students',
              href: PATH_DASHBOARD.studentManager.root,
            },
            {
              name: 'List',
            },
          ]}
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch />
          <BlogPostsSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
        </Stack>

        <Box
          sx={{
            display: 'flex', // Arrange items in a row or column
            flexDirection: 'column', // Stack items vertically
            gap: 2, // Space between the items
          }}
        >
          <Box
            sx={{
              border: '1px solid #ddd', // Light border
              borderRadius: 2, // Rounded corners
              padding: 2, // Inner padding
              boxShadow: 1, // Optional shadow for depth
            }}
          >
            <Box
              sx={{
                display: 'flex', // Arrange items in a row
                alignItems: 'center', // Vertically center align items
                gap: 2, // Space between the text and progress circle
                padding: 2,
                marginTop: -3,
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, marginTop: 2 }}>
                Submitted
              </Typography>
            </Box>
            <Grid container spacing={1}>
              {submitData?.submitted.map((post: any, index: number) => (
                <Grid key={post.id} item>
                  <BlogPostCard post={post} index={index} type={type as string} />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box
            sx={{
              border: '1px solid #ddd', // Light border
              borderRadius: 2, // Rounded corners
              padding: 2, // Inner padding
              boxShadow: 1, // Optional shadow for depth
            }}
          >
            <Box
              sx={{
                display: 'flex', // Arrange items in a row
                alignItems: 'center', // Vertically center align items
                gap: 2, // Space between the text and progress circle
                padding: 2,
                marginTop: -3,
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, marginTop: 2 }}>
                Unsubmitted
              </Typography>
            </Box>
            <Grid container spacing={1.5}>
              {submitData?.unsubmitted.map((post: any, index: number) => (
                <Grid key={post.id} item>
                  <BlogPostCard post={post} index={index} type={type as string} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
