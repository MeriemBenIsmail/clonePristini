import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { useGetLinksQuery } from "../../src/api/links";
import logo from "../../public/images/pristini.png";
import logoGroup from "../../public/images/pristini-group.png";
import theme from "../../src/styles/theme";

const Link = Dynamic<any>(() => import("next/link"), { ssr: false });
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), { ssr: false });
const Stack = Dynamic<any>(() => import("@mui/material/Stack"), { ssr: false });
const Grid = Dynamic(() => import("@mui/material/Grid"), { ssr: false });
const List = Dynamic(() => import("@mui/material/List"), { ssr: false });
const ListItem = Dynamic(() => import("@mui/material/ListItem"), {
  ssr: false,
});
const ListItemAvatar = Dynamic(() => import("@mui/material/ListItemAvatar"), {
  ssr: false,
});
const Avatar = Dynamic(() => import("@mui/material/Avatar"), { ssr: false });
const ListItemText = Dynamic(() => import("@mui/material/ListItemText"), {
  ssr: false,
});
const Typography = Dynamic(() => import("@mui/material/Typography"), {
  ssr: false,
});
const IconButton = Dynamic(() => import("@mui/material/IconButton"), {
  ssr: false,
});
const EmailIcon = Dynamic(() => import("@mui/icons-material/Email"), {
  ssr: false,
});
const LocalPhoneIcon = Dynamic(() => import("@mui/icons-material/LocalPhone"), {
  ssr: false,
});
const RoomIcon = Dynamic(() => import("@mui/icons-material/Room"), {
  ssr: false,
});
const FacebookIcon = Dynamic(() => import("@mui/icons-material/Facebook"), {
  ssr: false,
});
const TwitterIcon = Dynamic(() => import("@mui/icons-material/Twitter"), {
  ssr: false,
});
const LinkedInIcon = Dynamic(() => import("@mui/icons-material/LinkedIn"), {
  ssr: false,
});
const YouTubeIcon = Dynamic(() => import("@mui/icons-material/YouTube"), {
  ssr: false,
});
const TwImage = Dynamic(() => import("../../src/templates/TwImage"), {
  ssr: false,
});

interface FooterProps {
  settings?: any;
}

export default function Footer(props: FooterProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { settings } = props;
  const { data } = useGetLinksQuery({ culture: router.locale, id: 2 });

  return (
    <>
      <Paper
        variant="section"
        className={`mainFooter ${settings?.classes ? settings.classes : ""}`}
        component="footer"
      >
        <Grid container spacing={2}>
          <Grid item lg={2} xs={12}>
            <Link href={`/${router.locale}`}>
              <a className="logo">
                <TwImage
                  settings={{
                    src: logo,
                    alt: "",
                    layout: "fixed",
                    width: 150,
                    height: 150,
                  }}
                />
              </a>
            </Link>
          </Grid>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={2}>
              <Grid item lg={7} xs={12}>
                <Grid container spacing={2}>
                  {data?.items?.slice(0, 2).map((item: any, index: number) =>
                    item.hasChild ? (
                      <Grid
                        item
                        xs={6}
                        className="links"
                        sx={{ marginTop: theme.spacing(2.5) }}
                      >
                        <Typography variant="h3">{item.label}</Typography>
                        <List aria-label={item.label}>
                          {item.childs.map((child: any) => (
                            <ListItem>
                              <Link href={child.link} key={child.id}>
                                <a>{child.label}</a>
                              </Link>
                            </ListItem>
                          ))}
                        </List>
                        {/*index==1 && <Link href=""><a className="registration">{t('Registration')}</a></Link>*/}
                      </Grid>
                    ) : (
                      ""
                    )
                  )}
                </Grid>
              </Grid>
              <Grid item lg={5} xs={12}>
                <List disablePadding={true}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <EmailIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={t("Email")}
                      secondary="aiuniversity@pristini-international.tn"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LocalPhoneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={t("Phone")}
                      secondary="+216 96 777 555"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <RoomIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={t("Address")}
                      secondary="Novation city - Pôle technologique - Sousse"
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={2} xs={12}>
            <Link href={`/${router.locale}`}>
              <a className="logo">
                <TwImage
                  settings={{
                    src: logoGroup,
                    alt: "",
                    layout: "fixed",
                    width: 150,
                    height: 150,
                  }}
                />
              </a>
            </Link>
          </Grid>
        </Grid>
        <Stack
          className="socialMedias"
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <IconButton size="large" aria-label="" color="inherit">
            <FacebookIcon />
          </IconButton>
          <IconButton size="large" aria-label="" color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton size="large" aria-label="" color="inherit">
            <LinkedInIcon />
          </IconButton>
          <IconButton size="large" aria-label="" color="inherit">
            <YouTubeIcon />
          </IconButton>
        </Stack>
      </Paper>
      <Paper variant="section" className="copyRight">
        2022 © {t("Design and Development by")}:{" "}
        <Link href="https://www.tanitweb.com" target="_blank">
          TanitWeb
        </Link>
      </Paper>
    </>
  );
}
