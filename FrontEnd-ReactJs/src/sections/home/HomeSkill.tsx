import { m } from 'framer-motion';
// @mui
import { useTheme } from '@mui/material/styles';
import { Button, Box, Container, Stack, CardProps, Card, Typography } from '@mui/material';
import { PlanPremiumIcon } from 'src/assets/icons';
// utils
import Label from 'src/components/label';
import { bgGradient } from '../../utils/cssStyles';
// routes
import { PATH_FREE_VERSION, PATH_MINIMAL_ON_STORE } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';
import { _skills } from './content';

// ----------------------------------------------------------------------

export default function HomeSkill() {
  return (
    <Container component={MotionViewport}>
      <Stack
          spacing={3}
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 10 },
          }}
        >
          <m.div variants={varFade().inDown}>
            <Typography variant="h2">
            Choose skill <br /> to learn
            </Typography>
          </m.div>
        </Stack>
      <Stack
        alignItems="center"
        justifyContent="center"
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          gap: 2,
        }}
      >
        {_skills.map((card, index) => (
          <SkillCard key={card.subscription} card={card} index={index} />
        ))}
      </Stack>
    </Container>
  );
}

// ----------------------------------------------------------------------
interface Props extends CardProps {
  card: {
    subscription: string;
    caption: string;
    labelAction: string;
  };
  index: number;
}
function SkillCard({ card, index, sx, ...other }: Props) {
  const { subscription, labelAction } = card;

  return (
    <Card
      sx={{
        py: 4,
        px: 6,
        boxShadow: (theme) => theme.customShadows.z24,
        bgcolor: 'background.default',
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h5" sx={{textAlign:'center'}}>{subscription}</Typography>

      <Box sx={{ width: 60, height: 60, margin: 'auto' }}>
        <PlanPremiumIcon />
      </Box>

      <Button fullWidth size="large" variant="contained">
        {labelAction}
      </Button>
    </Card>
  );
}
