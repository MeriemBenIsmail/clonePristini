import { Grid } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { max } from "date-fns";
let theme = createTheme();
const primaryColor = "#1E175B";
const secondaryColor = "#da9800";
const whiteColor = "#ffffff";
const blackColor = "#000000";
const grayColor = "#f5f5f5";

theme = createTheme(theme, {
  palette: {
    ...theme.palette,
    primary: { main: primaryColor },
    secondary: { main: secondaryColor },
    black: { main: blackColor },
    white: { main: whiteColor },
  },
  typography: {
    h3: {
      marginBottom: theme.spacing(2),
      fontSize: 20,
      fontWeight: 600,
      "& a": { color: blackColor },
    },
    subtitle1: {
      position: "relative",
      marginBottom: theme.spacing(5),
      fontFamily: "Delmon Delicate-Regular",
      fontSize: 64,
      color: whiteColor,
      lineHeight: 1.2,
      textShadow: "0 16px 32px rgba(0,0,0,.2)",
      [theme.breakpoints.down("xl")]: {
        marginBottom: theme.spacing(8),
        fontSize: 58,
      },
      [theme.breakpoints.down(1400)]: {
        marginBottom: theme.spacing(6),
        fontSize: 52,
      },
      [theme.breakpoints.down("lg")]: {
        marginBottom: theme.spacing(4),
        fontSize: 44,
      },
      [theme.breakpoints.down("md")]: {
        marginBottom: theme.spacing(3),
        fontSize: 36,
      },
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(1),
        fontSize: 24,
      },
    },
    subtitle2: {
      position: "relative",
      marginBottom: theme.spacing(5),
      paddingBottom: theme.spacing(3),
      fontFamily: "Montserrat,sans-serif",
      fontWeight: 900,
      fontSize: 40,
      color: primaryColor,
      lineHeight: 1,
      letterSpacing: 1,
      textTransform: "uppercase",
      "::before": {
        position: "absolute",
        bottom: 0,
        left: 0,
        content: "''",
        width: 64,
        height: 4,
        background: secondaryColor,
      },
      "& span": {
        display: "block",
        marginBottom: theme.spacing(1),
        fontFamily: "Delmon Delicate",
        fontWeight: 100,
        fontSize: 34,
        letterSpacing: 0,
      },
      [theme.breakpoints.down("xl")]: {
        marginBottom: theme.spacing(4),
        paddingBottom: theme.spacing(2),
        fontSize: 38,
      },
      [theme.breakpoints.down(1400)]: { fontSize: 36 },
      [theme.breakpoints.down("lg")]: { fontSize: 34 },
      [theme.breakpoints.down("md")]: { fontSize: 30 },
      [theme.breakpoints.down("sm")]: { fontSize: 28 },
    },
    body1: {
      fontFamily: "Montserrat,sans-serif",
      fontSize: 16,
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "Montserrat,sans-serif",
      fontSize: 16,
      lineHeight: 1.6,
    },
    time: {
      display: "flex",
      justifyContent: "end",
      alignItem: "center",
      fontSize: 16,
      fontWeight: 500,
      color: "#555",
      lineHeight: "20px",
      "&::before": {
        paddingRight: 4,
        content: '"schedule"',
        fontFamily: "Material Icons",
        fontSize: 20,
      },
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: { color: "transparent" },
      styleOverrides: {
        root: {
          boxShadow: "none",
          "& .MuiIconButton-root": {
            backgroundColor: "rgba(0,0,0,0.25)",
            color: secondaryColor,
          },
          "& .switchLanguage": {
            borderRadius: theme.spacing(3),
            fontSize: 16,
            fontWeight: 900,
          },
        },
      },
      variants: [
        {
          props: { variant: "mainHeader" },
          style: {
            paddingInline: 120,
            zIndex: 997,
            "& .dropDownElement": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              padding: "10px 10px",
              cursor: "pointer",
              overflow: "hidden",
              width: "100%",
              maxWidth: "70vw",
              "&:hover": {
                backgroundColor: primaryColor,
                color: "#fff",
              },
              "&:last-of-type": {
                borderRadius: "0px 0px 5px 5px ",
              },
              "&:first-of-type": {
                borderRadius: "5px 5px 0px 0px ",
              },
              [theme.breakpoints.down("sm")]: {
                justifyContent: "left",
                "& .MuiTypography-root": {
                  fontSize: "max(0.5vw,8px) !important",
                },
              },
            },
            "& .notificationElement": {
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              padding: "10px 20px",
              cursor: "pointer",
              width: "max-content",
              maxWidth: "50vw",
              "&:last-of-type": {
                borderRadius: "0px 0px 5px 5px ",
              },
              "&:first-of-type": {
                borderRadius: "5px 5px 0px 0px ",
              },
              [theme.breakpoints.down("sm")]: { justifyContent: "center" },
            },
            "& .MuiIconButton-root": {
              background: "rgba(0,0,0,0.04)",
              "&.regular": {
                color: "#fff",
                background: "none",
              },
            },
            "&.account": {
              background: primaryColor + " !important",
            },
            "& .logo": {
              flexGrow: 1,
              textAlign: "center",
            },
            "&.fixed,&.account": {
              background: whiteColor,
              boxShadow: "0 0 8px 0 rgba(51,51,51,.3)",
              "& .MuiIconButton-root": {
                background: "rgba(0,0,0,0.04)",
                "&.regular": {
                  color: "#fff",
                  background: "none",
                },
              },
              "& .logo span": {
                width: "80px !important",
                height: "80px !important",
              },
            },
            [theme.breakpoints.down("xl")]: { paddingInline: 100 },
            [theme.breakpoints.down(1400)]: {
              paddingInline: 50,
              "& .logo span": {
                width: "120px !important",
                height: "120px !important",
              },
            },
            [theme.breakpoints.down("lg")]: {
              "& .logo": { paddingLeft: 0 },
              "& .logo span": {
                width: "100px !important",
                height: "100px !important",
              },
              "&.fixed .logo span,&.account .logo span": {
                width: "70px !important",
                height: "70px !important",
              },
            },
            [theme.breakpoints.down("md")]: {
              paddingInline: 30,
              "& .logo & span": {
                width: "80px !important",
                height: "80px !important",
              },
              "&.fixed .logo span,&.account .logo span": {
                width: "60px !important",
                height: "60px !important",
              },
            },
            [theme.breakpoints.down("sm")]: {
              paddingInline: 15,
              "& .logo span": {
                width: "60px !important",
                height: "60px !important",
              },
            },
          },
        },
      ],
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: primaryColor,
          "& .drawerMenu": {
            width: 250,
            paddingBlock: theme.spacing(5),
            "& a,& .MuiListItemButton-root": {
              fontSize: 16,
              color: whiteColor,
              textDecoration: "none",
            },
            "& a:hover": { color: secondaryColor },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          position: "relative",
          borderRadius: 0,
          "&.deskMainMenu": {
            background: primaryColor,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            color: whiteColor,
            zIndex: 998,
          },
        },
      },
      variants: [
        {
          props: { variant: "section" },
          style: {
            background: "transparent",
            marginTop: theme.spacing(10),
            paddingInline: 120,
            "& .MuiTypography-subtitle2 span,& .subtitle2 span": {
              display: "block",
            },
            "& .borderLeft": {
              paddingBlock: theme.spacing(3),
              paddingLeft: theme.spacing(3),
              borderLeft: "3px solid " + secondaryColor,
            },
            "& .thumbs": {
              position: "relative",
              "&::before": {
                position: "absolute",
                content: '""',
                bottom: 0,
                left: 0,
                width: 200,
                height: 300,
                background: secondaryColor,
                zIndex: 0,
              },
              "&.bgTop::before": {
                bottom: "auto",
                top: "-16px",
                left: "auto",
                right: 0,
                width: 200,
                height: 200,
              },
              "& .thumb": {
                position: "relative",
                width: "100%",
                padding: theme.spacing(1.5),
                zIndex: 1,
              },
            },
            "& .card,& .MuiGrid-item.card": {
              position: "relative",
              padding: theme.spacing(5),
              ":before": {
                position: "absolute",
                content: '""',
                top: theme.spacing(2),
                bottom: theme.spacing(2),
                left: theme.spacing(2),
                right: theme.spacing(2),
                boxShadow: "0 8px 16px 0 rgba(0,0,0,.2)",
                zIndex: 0,
              },
              ":hover:before": { background: secondaryColor },
              "& h3": {
                marginBottom: theme.spacing(3),
                paddingBottom: theme.spacing(2),
                fontSize: 18,
                letterSpacing: 0,
              },
              "& h3::before": { height: 3 },
              "&:hover h3::before": { background: whiteColor },
              "& p": { position: "relative", zIndex: 1 },
              "& .MuiTypography-body1": { paddingBottom: theme.spacing(6) },
              "& .more": {
                position: "absolute",
                bottom: theme.spacing(5),
                zIndex: 10,
              },
              "&:hover h3 a,&:hover p,&:hover .more,&:hover .more:after": {
                color: whiteColor,
              },
            },
            "& .square": {
              marginLeft: theme.spacing(3),
              marginBlock: theme.spacing(2),
              listStyle: "none",
              "& li": {
                position: "relative",
                paddingLeft: theme.spacing(2),
                "&:before": {
                  position: "absolute",
                  content: '""',
                  top: 10,
                  left: 0,
                  width: 8,
                  height: 8,
                  background: primaryColor,
                },
              },
            },
            "& .btn": {
              display: "inline-flex",
              background: secondaryColor,
              position: "relative",
              marginTop: theme.spacing(4),
              paddingInline: theme.spacing(3),
              fontSize: 18,
              fontWeight: 700,
              lineHeight: "40px",
              color: whiteColor,
              "&:after": {
                marginLeft: theme.spacing(3),
                fontFamily: "Material Icons",
                fontSize: 18,
                content: "'east'",
              },
            },
            "&.gray": {
              background: grayColor,
              paddingBlock: theme.spacing(10),
              "& .MuiCardContent-root": {
                background: whiteColor,
                "& h3": { minHeight: 70 },
              },
            },

            "&.drawerSearch": {
              marginTop: 0,
              paddingBlock: theme.spacing(2),
              zIndex: 9999,
              "& .MuiInput-root": {
                color: whiteColor,
                "&:before,&:hover:before": { borderColor: whiteColor },
              },
              "& .MuiInputLabel-root": { color: whiteColor },
              "& .MuiButton-root": { background: "none", boxShadow: "none" },
            },
            "&.profilesMenu": {
              display: "flex",
              alignItems: "center",
              height: "20vh",
              marginTop: 0,
              borderTop: "1px solid rgba(255,255,255,.1)",
              "& h2": {
                marginBottom: 0,
                fontSize: 18,
                fontWeight: 500,
                color: "rgba(255,255,255,.5)",
                "&:after": {
                  position: "absolute",
                  marginLeft: theme.spacing(10),
                  fontFamily: "Material Icons",
                  content: '"chevron_right"',
                },
              },
              "& a": {
                display: "block",
                fontWeight: 700,
                color: whiteColor,
                textAlign: "center",
              },
            },
            "&.intro": {
              textAlign: "center",
              "& .MuiTypography-subtitle2,& .subtitle2": {
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: -1,
                textTransform: "uppercase",
                "&:before": { left: "50%", marginLeft: "-32px" },
              },
              "& p": {
                width: "60%",
                marginInline: "auto",
                fontFamily: "Butler",
                fontSize: 28,
              },
            },
            "&.homeNumbers": {
              margin: 0,
              paddingBlock: theme.spacing(10),
              backgroundImage: 'url("/images/front/numbers.png")',
              backgroundColor: "#100c30",
              backgroundPosition: "left center",
              backgroundSize: "auto 100%",
              backgroundRepeat: "no-repeat",
              color: whiteColor,
              "& .item": {
                paddingInline: "15%",
                fontSize: 38,
                "& span": { fontWeight: 900, fontSize: 60 },
                "& p": {
                  fontSize: 18,
                  fontWeight: 500,
                  textTransform: "uppercase",
                },
              },
            },
            "&.numbers": {
              fontWeight: 900,
              fontSize: 60,
              color: secondaryColor,
              lineHeight: 1,
              "& .thumbs:before": { background: whiteColor },
              "& h3": {
                marginBottom: theme.spacing(4),
                fontSize: 24,
                color: primaryColor,
              },
            },
            "&.underConstruction": {
              paddingBlock: theme.spacing(12),
              textAlign: "center",
              "& h2": {
                marginBottom: theme.spacing(4),
                fontSize: 60,
                fontWeight: 900,
                color: primaryColor,
              },
              "& .body1": { fontSize: 24 },
            },

            "&.team h3": {
              fontSize: 38,
              letterSpacing: 0,
              "& span": { fontSize: 24 },
            },
            "&.events": {
              "& .thumb": { boxShadow: "0 0 16px rgba(0,0,0,.2)" },
              "& .MuiCard-root": {
                boxShadow: "none",
                paddingRight: theme.spacing(2),
                paddingBottom: theme.spacing(2),
              },
              "& .desc": { padding: "0 !important" },
              "& .MuiCardContent-root": {
                position: "relative",
                padding: `${theme.spacing(10)} !important`,
                boxShadow: "0 0 16px rgba(0,0,0,.2)",
              },
              "& .MuiTypography-body1": {
                fontWeight: 300,
                textTransform: "uppercase",
              },
              "& .MuiTypography-h3 a": {
                fontSize: 24,
                fontWeight: 900,
                color: primaryColor,
              },
              "& .place": {
                display: "flex",
                alignItems: "center",
                marginBottom: theme.spacing(5),
                fontSize: 14,
                color: "#666",
                "& svg": { color: secondaryColor },
              },
              "& .timedown": {
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
                lineHeight: 1,
              },
              "& span": {
                display: "inline-block",
                paddingInline: theme.spacing(1),
                fontSize: theme.spacing(5),
              },
              "& .more": { margin: 0 },
              "& .dateEvent": {
                position: "absolute",
                top: 80,
                right: 50,
                border: "1px solid #e5e5e5",
                textAlign: "center",
                "& .day": { paddingInline: 8, fontWeight: 900 },
                "& .month": { paddingInline: 8, fontSize: 14, fontWeight: 300 },
                "& .year": {
                  paddingInline: 8,
                  background: secondaryColor,
                  fontSize: 12,
                  fontWeight: 600,
                  color: whiteColor,
                },
              },
            },
            "&.mainFooter": {
              background: primaryColor,
              paddingTop: theme.spacing(8),
              paddingBottom: theme.spacing(4),
              color: whiteColor,
              "&.account": { marginTop: 0 },
              "& a": {
                color: "rgba(255,255,255,.75)",
                "&:hover": {
                  color: "rgba(255,255,255,1)",
                  textDecoration: "underline",
                },
              },
              "& .logo": { display: "block", textAlign: "center" },
              "& .MuiGrid-item.links": { paddingLeft: theme.spacing(6) },
              "& .MuiAvatar-root": {
                background: "#110d34",
                color: secondaryColor,
              },
              "& .MuiListItemText-root .MuiTypography-body1": {
                fontWeight: 600,
              },
              "& .MuiTypography-body2": { color: whiteColor },
              "& a.registration": {
                fontWeight: 600,
                fontSize: 18,
                color: secondaryColor,
                textDecoration: "underline",
              },
              "& .socialMedias .MuiIconButton-root": {
                background: secondaryColor,
              },
            },
            "&.copyRight": {
              marginTop: 0,
              background: "#110d34",
              lineHeight: "40px",
              textAlign: "center",
              color: whiteColor,
              "& a": {
                color: secondaryColor,
                "&:hover": { textDecoration: "underline" },
              },
            },

            [theme.breakpoints.down("xl")]: {
              marginTop: theme.spacing(8),
              paddingInline: 80,
            },
            [theme.breakpoints.down(1400)]: {
              marginTop: theme.spacing(6),
              paddingInline: 50,
              "&.homeNumbers": { "& .item": { paddingInline: "10%" } },
              "&.underConstruction": {
                paddingBlock: theme.spacing(10),
                "& h2": { fontSize: 54 },
                "& .body1": { fontSize: 22 },
              },
            },
            [theme.breakpoints.down("lg")]: {
              marginTop: theme.spacing(5),
              paddingInline: 30,
              "&.intro": {
                "& .MuiTypography-subtitle2,& .subtitle2": { fontSize: 24 },
                "& p": { width: "80%", fontSize: 24 },
              },
              "&.homeNumbers": {
                "& .item": {
                  paddingInline: "6%",
                  fontSize: 30,
                  "& span": { fontSize: 48 },
                  "& p": { fontSize: 16 },
                },
              },
              "&.numbers": {
                fontSize: 48,
                "& h3": { marginBottom: theme.spacing(3), fontSize: 20 },
              },
              "&.underConstruction": {
                paddingBlock: theme.spacing(8),
                "& h2": { fontSize: 48 },
                "& .body1": { fontSize: 20 },
              },
              "&.events": {
                "& .MuiCardContent-root": {
                  padding: `${theme.spacing(6)} !important`,
                  "& h3": { marginRight: theme.spacing(4) },
                },
                "& .place": { marginBottom: theme.spacing(4) },
                "& span": { fontSize: theme.spacing(4) },
                "& .dateEvent": {
                  top: theme.spacing(6),
                  right: theme.spacing(3),
                },
              },
            },
            [theme.breakpoints.down("md")]: {
              marginTop: theme.spacing(4),
              paddingInline: 20,
              "& .thumbs": {
                order: 0,
                marginBottom: theme.spacing(3),
                maxWidth: 480,
                marginInline: "auto",
                "&::before": { width: 160, height: 240 },
                "&.bgTop::before": { width: 160, height: 160 },
              },
              "& .desc": {
                order: 1,
                marginBottom: theme.spacing(5),
                paddingInline: theme.spacing(3),
              },
              "&.intro": {
                "& .MuiTypography-subtitle2,& .subtitle2": { fontSize: 20 },
                "& p": { width: "90%", fontSize: 20 },
              },
              "&.numbers": {
                fontSize: 60,
                "& h3": { marginBottom: theme.spacing(4), fontSize: 24 },
              },
              "&.underConstruction": {
                paddingBlock: theme.spacing(6),
                "& h2": { fontSize: 44 },
              },
            },
            [theme.breakpoints.down("sm")]: {
              marginTop: theme.spacing(3),
              paddingInline: 10,
              "& .thumbs": {
                maxWidth: 360,
                marginInline: "auto",
                "&::before": { width: 120, height: 180 },
                "&.bgTop::before": { width: 120, height: 120 },
              },
              "&.intro": {
                "& .MuiTypography-subtitle2,& .subtitle2": { fontSize: 18 },
                "& p": { width: "100%", fontSize: 18 },
              },
              "&.homeNumbers": {
                "& .item": {
                  paddingInline: theme.spacing(2),
                  fontSize: 20,
                  "& span": { fontSize: 34 },
                  "& p": { fontSize: 14 },
                },
              },
              "&.numbers": {
                fontSize: 48,
                "& h3": { marginBottom: theme.spacing(3), fontSize: 20 },
              },
              "&.underConstruction": {
                paddingBlock: theme.spacing(5),
                "& h2": { fontSize: 38 },
                "& .body1": { fontSize: 18 },
              },
              "&.events": {
                "& .MuiCardContent-root": {
                  paddingInline: `${theme.spacing(3)} !important`,
                },
                "& .more": {
                  display: "block",
                  marginTop: theme.spacing(5),
                  marginRight: theme.spacing(3),
                  textAlign: "right",
                },
              },
              "&.copyRight": { fontSize: 14 },
            },
            [theme.breakpoints.down(420)]: {
              "& .thumbs": {
                maxWidth: 300,
                marginInline: "auto",
                "&::before": { width: 100, height: 150 },
                "&.bgTop::before": { width: 100, height: 100 },
              },
              "&.underConstruction": {
                "& h2": { fontSize: 34 },
                "& .body1": { fontSize: 16 },
              },
            },
          },
        },
        {
          props: { variant: "block1" },
          style: {
            marginBlock: theme.spacing(10),
            paddingBlock: theme.spacing(10),
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "41.666667%",
              right: 0,
              boxShadow: "0 16px 32px 0 rgba(0,0,0,0.15)",
              zIndex: -1,
            },
            "& .thumb": {
              position: "relative",
              "&:before": {
                position: "absolute",
                top: "-40px",
                content: '""',
                background: primaryColor,
                width: 200,
                height: 100,
              },
            },
            "& .desc": {
              position: "relative",
              paddingInline: theme.spacing(12),
              "& .content": { width: "75%" },
            },
            [theme.breakpoints.down("xl")]: {
              marginBlock: theme.spacing(8),
              paddingBlock: theme.spacing(8),
              "& .desc": {
                paddingInline: theme.spacing(10),
                "& .content": { width: "85%" },
              },
            },
            [theme.breakpoints.down(1400)]: {
              marginBlock: theme.spacing(6),
              paddingBlock: theme.spacing(6),
              "& .desc": {
                paddingInline: theme.spacing(8),
                "& .content": { width: "100%" },
              },
            },
            [theme.breakpoints.down("md")]: {
              marginBlock: theme.spacing(5),
              paddingBlock: theme.spacing(5),
              "&::before": { boxShadow: "none" },
              "& .desc": { paddingInline: theme.spacing(6) },
            },
            [theme.breakpoints.down("sm")]: {
              marginBlock: theme.spacing(4),
              paddingBlock: theme.spacing(4),
              "& .desc": { padding: theme.spacing(4) },
            },
          },
        },
        {
          props: { variant: "block2" },
          style: {
            marginTop: theme.spacing(10),
            paddingInline: 120,
            "&.team h3": {
              fontSize: 28,
              letterSpacing: 0,
              "& span": { fontSize: 28 },
            },
            "& .thumbs": { position: "relative" },
            "&.trainings .thumbs::before": {
              position: "absolute",
              content: '""',
              bottom: 140,
              left: theme.spacing(4),
              width: 150,
              height: 150,
              borderRadius: "100%",
              background: secondaryColor,
            },
            "&.trainings .thumb1": {
              position: "relative",
              display: "block",
              marginBottom: theme.spacing(5),
              marginLeft: theme.spacing(10),
            },
            "&.trainings .thumb2": {
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 200,
              height: 200,
            },
            "& .MuiTypography-subtitle2 span": { display: "block" },
            [theme.breakpoints.down("xl")]: {
              marginTop: theme.spacing(8),
              paddingInline: 100,
            },
            [theme.breakpoints.down(1400)]: {
              marginTop: theme.spacing(6),
              paddingInline: 80,
              "&.team h3": { fontSize: 24, "& span": { fontSize: 24 } },
            },
            [theme.breakpoints.down("lg")]: {
              "&.trainings .thumbs::before": {
                bottom: 120,
                left: theme.spacing(4),
                width: 120,
                height: 120,
              },
              "&.trainings .thumb1": {
                marginBottom: theme.spacing(4),
                marginLeft: theme.spacing(8),
              },
              "&.trainings .thumb2": { width: 160, height: 160 },
            },
            [theme.breakpoints.down("md")]: {
              marginTop: theme.spacing(5),
              paddingInline: 50,
              "&.team .thumbs,&.trainings .thumbs": {
                order: 0,
                maxWidth: 480,
                marginInline: "auto",
              },
              "&.team .desc, &.trainings .desc": {
                order: 1,
                paddingTop: theme.spacing(5),
              },
            },
            [theme.breakpoints.down("sm")]: {
              marginTop: theme.spacing(4),
              paddingInline: 32,
              "&.team .thumbs,&.trainings .thumbs": { maxWidth: 360 },
            },
            [theme.breakpoints.down(420)]: {
              "&.team .thumbs,&.trainings .thumbs": { maxWidth: 320 },
            },
          },
        },
        {
          props: { variant: "block3" },
          style: {
            paddingTop: theme.spacing(10),
            "& .desc": {
              position: "relative",
              background: whiteColor,
              width: "60%",
              marginTop: "-150px",
              paddingBlock: theme.spacing(10),
              paddingInline: 150,
              boxShadow: "8px 0 8px -8px rgba(0,0,0,.2)",
              zIndex: 2,
            },
            [theme.breakpoints.down("xl")]: {
              paddingTop: theme.spacing(8),
              "& .desc": {
                width: "70%",
                marginTop: "-120px",
                paddingBlock: theme.spacing(8),
                paddingInline: 120,
              },
            },
            [theme.breakpoints.down(1400)]: {
              paddingTop: theme.spacing(6),
              "& .desc": {
                width: "80%",
                marginTop: "-100px",
                paddingBlock: theme.spacing(6),
                paddingInline: 100,
              },
            },
            [theme.breakpoints.down("lg")]: {
              paddingTop: theme.spacing(5),
              "& .desc": {
                width: "90%",
                marginTop: "-80px",
                paddingBlock: theme.spacing(5),
                paddingInline: 80,
              },
            },
            [theme.breakpoints.down("md")]: {
              "& .desc": { marginTop: "-50px", paddingInline: 50 },
            },
            [theme.breakpoints.down("sm")]: {
              paddingTop: theme.spacing(4),
              "& .desc": {
                paddingBlock: theme.spacing(3),
                paddingInline: theme.spacing(3),
              },
            },
            [theme.breakpoints.down(420)]: {
              "& .desc": {
                width: "95%",
                marginTop: "-30px",
                paddingBlock: theme.spacing(2),
                paddingInline: theme.spacing(2),
              },
            },
          },
        },

        {
          props: { variant: "deskHeader" },
          style: {
            background: "transparent",
            paddingInline: 50,
            "& .MuiIconButton-root": { height: 48 },
            "& .logo": { flexGrow: 1, textAlign: "center" },
          },
        },
        {
          props: { variant: "deskMenu" },
          style: {
            background: "transparent",
            paddingInline: 50,
            display: "flex",
            height: "calc(80vh - 120px)",
            paddingTop: theme.spacing(10),
          },
        },
        {
          props: { variant: "welcome" },
          style: {
            position: "relative",
            width: "100%",
            "& video": { width: "100%", height: "calc(100vw * 9 / 16 -30px)" },
            "& .content": {
              position: "absolute",
              bottom: "15%",
              width: "100%",
              textAlign: "center",
            },
            "& .MuiTypography-subtitle1": { marginBottom: theme.spacing(5) },
            "& .content a": {
              background: "rgba(0,0,0,.2)",
              marginTop: theme.spacing(3),
              color: secondaryColor,
              borderColor: secondaryColor,
            },
            [theme.breakpoints.down("xl")]: { "& .content": { bottom: "12%" } },
            [theme.breakpoints.down(1400)]: { "& .content": { bottom: "10%" } },
            [theme.breakpoints.down("lg")]: {
              "& .content": { bottom: "8%" },
              "& .MuiTypography-subtitle1": { marginBottom: theme.spacing(4) },
              "& .content a": { marginTop: theme.spacing(2) },
            },
            [theme.breakpoints.down("md")]: {
              "& .content": { bottom: "4%" },
              "& .MuiTypography-subtitle1": { marginBottom: theme.spacing(3) },
            },
            [theme.breakpoints.down("sm")]: {
              "& .content": { bottom: theme.spacing(2) },
            },
          },
        },
        {
          props: { variant: "pageHeader" },
          style: {
            "&:after": {
              background: "rgba(30,23,91,.7)",
              content: '""',
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            },
            "& .content": {
              position: "absolute",
              bottom: "8%",
              width: "100%",
              paddingInline: 120,
              zIndex: 2,
            },
            "& .desc": {
              borderLeft: `1px solid ${secondaryColor}`,
              paddingBlock: theme.spacing(3),
            },
            "& .MuiTypography-body1": {
              paddingInline: theme.spacing(4),
              fontFamily: "Butler",
              fontSize: 22,
              color: whiteColor,
              letterSpacing: 1,
            },
            [theme.breakpoints.down("xl")]: {
              "& .content": { bottom: "6%", paddingInline: 80 },
              "& .MuiTypography-body1": { fontSize: 20 },
            },
            [theme.breakpoints.down(1400)]: {
              "& .content": { bottom: "4%", paddingInline: 50 },
              "& .MuiTypography-body1": {
                paddingInline: theme.spacing(3),
                fontSize: 18,
              },
            },
            [theme.breakpoints.down("lg")]: {
              "& .content": {
                bottom: theme.spacing(2),
                "& h1": { marginBottom: theme.spacing(1) },
              },
              "& .desc": { paddingBlock: 0 },
              "& .MuiTypography-body1": {
                paddingInline: theme.spacing(2),
                fontSize: 18,
                letterSpacing: 0,
              },
            },
            [theme.breakpoints.down("md")]: {
              "& .content": { paddingInline: 30 },
              "& .desc": { display: "none" },
            },
            [theme.breakpoints.down("sm")]: {
              "& .content": { paddingInline: 15 },
            },
          },
        },
        {
          props: { variant: "profiles" },
          style: {
            maxWidth: 900,
            marginInline: "auto",
            paddingInline: theme.spacing(3),
            background: grayColor,
            boxShadow: "0 16px 32px 0 rgba(0,0,0,0.15)",
            marginBottom: theme.spacing(10),
            paddingBlock: theme.spacing(5),
            "& h2": { marginBottom: 0 },
            "& a": {
              display: "block",
              fontWeight: 700,
              color: "#000000",
              textAlign: "center",
              textTransform: "uppercase",
            },
            [theme.breakpoints.down("lg")]: { maxWidth: 800 },
            [theme.breakpoints.down("md")]: {
              maxWidth: 500,
              "& a": { marginBottom: theme.spacing(3) },
            },
            [theme.breakpoints.down("sm")]: {
              maxWidth: 300,
              "& a": { fontSize: 16 },
            },
          },
        },
        {
          props: { variant: "aboutMenu" },
          style: {
            maxWidth: 900,
            display: "flex",
            justifyContent: "center",
            marginInline: "auto",
            background: grayColor,
            boxShadow: "0 16px 32px 0 rgba(0,0,0,0.15)",
            "& a": {
              display: "block",
              paddingBlock: theme.spacing(5),
              paddingInline: theme.spacing(4),
              fontWeight: 700,
              color: primaryColor,
              "&:hover": { color: secondaryColor },
            },
            [theme.breakpoints.down("sm")]: { display: "none" },
          },
        },
        {
          props: { variant: "intro" },
          style: {
            "&.gray": {
              background: grayColor,
              paddingBlock: theme.spacing(10),
            },
            [theme.breakpoints.down("xl")]: {
              "& p": { width: "80%", fontSize: 24 },
            },
            [theme.breakpoints.down(1400)]: {
              "& p": { width: "90%", fontSize: 20 },
            },
            [theme.breakpoints.down("md")]: {
              "& p": { width: "100%", paddingInline: 60, fontSize: 18 },
            },
            [theme.breakpoints.down("sm")]: {
              "& h2": { fontSize: 24 },
              "& p": { paddingInline: 32, fontSize: 16 },
            },
          },
        },

        {
          props: { variant: "main" },
          style: {
            "& .alert": {
              opacity: 0,
              margin: "10px 0px",
              display: "flex",
              justifySelf: "start",
              gap: "7px",
              fontWeight: 500,
              padding: "5px",
              fontSize: "small",
              borderRadius: "5px",
              position: "relative",
              "&.error": {
                opacity: "1",
                color: "#fff",
                backgroundColor: "rgba(255, 108, 108, 0.593)",
              },
              "&.success": {
                opacity: "1",
                color: "#fff",
                backgroundColor: "rgb(116, 188, 145)",
              },
              "& span": {
                position: "absolute",
                right: "10px",
                cursor: "pointer",
                "&:hover": {
                  color: "rgb(60, 21, 21)",
                },
              },
            },
            "&.account": {
              background: grayColor,
              paddingBlock: 150,

              "& .wrapper": {
                background: whiteColor,
                marginBlock: theme.spacing(12),
                padding: theme.spacing(8),
                boxShadow: "0 30px 60px #00000029",
                "& .doubleGrid": {
                  gap: "20px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  "@media screen and (max-width:540px)": {
                    gridTemplateColumns: "1fr ",
                  },
                },
                "& .form": { maxWidth: 800, marginInline: "auto" },
                "& .detailsPayment": {
                  marginBlock: theme.spacing(6),
                  alignItems: "center",
                  gap: theme.spacing(2.5),
                  "& .MuiTypography-body1": {
                    fontSize: "max(1vw,18px)",
                    fontWeight: 500,
                    color: primaryColor,
                  },
                  "& .amount": {
                    background: secondaryColor,
                    paddingBlock: theme.spacing(3),
                    borderRadius: theme.spacing(1),
                    color: whiteColor,
                    fontSize: "max(1.8vw,30px)",
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
                "& .paymentOptions": {
                  marginBottom: theme.spacing(6),
                  "& .MuiFormControlLabel-label": {
                    marginLeft: theme.spacing(3),
                  },
                  "& .MuiFormControlLabel-label:first-of-type": {
                    marginLeft: 0,
                  },
                },
                "& .paymentModes": {
                  marginBottom: theme.spacing(6),
                  "& .MuiFormControlLabel-label": {
                    fontWeight: "bold !important",
                  },
                },
              },
            },
          },
        },
        {
          props: { variant: "dzfile" },
          style: {
            marginBlock: theme.spacing(3),
            paddingInline: "15%",
            paddingBlock: theme.spacing(3),
            border: "2px dashed #e5e5e5",
            borderRadius: 4,
            "& .MuiTypography-h6": { color: primaryColor },
            "& .MuiSvgIcon-root": {
              marginRight: theme.spacing(2),
              fontSize: 38,
            },
            "& .MuiTypography-body1 span": {
              fontWeight: 600,
              color: secondaryColor,
              textDecoration: "underline",
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: { root: { boxShadow: "0 8px 16px 0 rgba(0,0,0,.2)" } },
    },
    MuiButton: {
      defaultProps: { disableFocusRipple: true, disableRipple: true },
      styleOverrides: {
        root: {
          minWidth: 200,
          marginTop: theme.spacing(5),
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        marginLeft: theme.spacing(0.5),
        root: {
          padding: 0,
          color: "transparent",
          marginLeft: "25px",
          background: "#FFFFFF 0% 0% no-repeat padding-box",
          border: "1px solid #D6D6D6",
          backgroundColor: whiteColor,
          "&.Mui-checked": {
            color: secondaryColor,
          },
          "& .Mui-checked, & .Mui-checked:focus, & .Mui-checked:hover": {
            backgroundColor: `${secondaryColor} !important`,
          },
        },
      },
    },

    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          color: secondaryColor,
          "& .Mui-selected, & .Mui-selected:focus, & .Mui-selected:hover": {
            backgroundColor: `${secondaryColor} !important`,
          },
        },
      },
    },
    /* MuiClockPicker: {
      styleOverrides: {
        root: {
          color: secondaryColor,
          "& .Mui-selected, & .Mui-selected:focus, & .Mui-selected:hover": {
            backgroundColor: `${secondaryColor} !important`,
          },
          "& .MuiPickersArrowSwitcher-button": {
            backgroundColor: `transperent !important`,
            "& .MuiIconButton-root": {
              backgroundColor: `transperent !important`,
            },
          },
          "& .MuiIconButton-root:first-of-type": {
            backgroundColor: `${secondaryColor} `,
          },
        },
      },
    },*/

    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#DA9800",
        },
      },
    },
  },
});
export default theme;
