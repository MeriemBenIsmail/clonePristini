import Dynamic from "next/dynamic";
import mainTheme from '../../src/styles/theme';
import {styled} from '@mui/material/styles';

const CountUp = Dynamic(() => import("react-countup"), {ssr:false});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {ssr:false});
const Box = Dynamic(() => import("@mui/material/Box"), {ssr:false});
const Grid = Dynamic(() => import("@mui/material/Grid"), {ssr:false});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {ssr:false});

export default function RenderNumbers() {
  return <Paper variant='section' className='homeNumbers'>
    <Grid container spacing={2}>
      <Grid item md={4} xs={6}>
        <Box className="item">
          <CountUp end={13000} /> m<sup>2</sup>
          <Typography variant="body1">De locaux chaleureux <br />et accueillants</Typography>
        </Box>
      </Grid>
      <Grid item md={4} xs={6}>
        <Box className="item">
          <CountUp end={2500} />
          <Typography variant="body1">Étudiants en capacité d'accueil</Typography>
        </Box>
      </Grid>
      <Grid item md={4} xs={6}>
        <Box className="item">
          <CountUp end={40} /> %
          <Typography variant="body1">Enseignants <br />experts</Typography>
        </Box>
      </Grid>
      <Grid item md={4} xs={6}>
        <Box className="item">
          <CountUp end={1} />
          <Typography variant="body1">INCUBATEUR de <br />startups IA</Typography>
        </Box>
      </Grid>
      <Grid item md={4} xs={6}>
        <Box className="item">
          (+) <CountUp end={30} />
          <Typography variant="body1">Partenaires nationaux <br />et internationaux</Typography>
        </Box>
      </Grid>
      <Grid item md={4} xs={6}>
        <Box className="item">
          <CountUp end={1} /> 
          <Typography variant="body1">Clinique <br />de L'IA</Typography>
        </Box>
      </Grid>
    </Grid>
  </Paper>
}