import * as React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useGetLinksQuery } from "../../src/api/links";
import { deleteCookie } from "cookies-next";
import logo from "../../public/images/pristini.png";
import Paper from "@mui/material/Paper";
import AppBar from "@mui/material/AppBar";

const Box = Dynamic<any>(() => import("@mui/material/Box"), { ssr: false });
const Link = Dynamic<any>(() => import("next/link"), { ssr: false });
const Image = Dynamic(() => import("next/image"), { ssr: false });
const Slide = Dynamic(() => import("@mui/material/Slide"), { ssr: false });
const Toolbar = Dynamic(() => import("@mui/material/Toolbar"), { ssr: false });
const Stack = Dynamic(() => import("@mui/material/Stack"), { ssr: false });
const SwipeableDrawer = Dynamic(() => import("@mui/material/SwipeableDrawer"), {
  ssr: false,
});
const Modal = Dynamic(() => import("@mui/material/Modal"), { ssr: false });
const Typography = Dynamic(() => import("@mui/material/Typography"), {
  ssr: false,
});
const Menu = Dynamic(() => import("@mui/material/Menu"), { ssr: false });
const MenuItem = Dynamic(() => import("@mui/material/MenuItem"), {
  ssr: false,
});
const IconButton = Dynamic<any>(() => import("@mui/material/IconButton"), {
  ssr: false,
});
const MenuIcon = Dynamic(() => import("@mui/icons-material/Menu"), {
  ssr: false,
});
const SearchIcon = Dynamic(() => import("@mui/icons-material/Search"), {
  ssr: false,
});
const MailIcon = Dynamic(() => import("@mui/icons-material/MailOutline"), {
  ssr: false,
});
const DrawerMenu = Dynamic(() => import("../structure/drawerMenu"), {
  ssr: false,
});
const DrawerSearch = Dynamic(() => import("../structure/drawerSearch"), {
  ssr: false,
});
const ModalMenu = Dynamic(() => import("../structure/modalMenu"), {
  ssr: false,
});
const ExpandMoreIcon = Dynamic(() => import("@mui/icons-material/ExpandMore"), {
  ssr: false,
});
const LogoutIcon = Dynamic(() => import("@mui/icons-material/Logout"), {
  ssr: false,
});
const PersonIcon = Dynamic(() => import("@mui/icons-material/Person"), {
  ssr: false,
});
const SettingsIcon = Dynamic(() => import("@mui/icons-material/Settings"), {
  ssr: false,
});
const NotificationsNoneIcon = Dynamic(
  () => import("@mui/icons-material/NotificationsNone"),
  {
    ssr: false,
  }
);
interface HeaderProps {
  window?: () => Window;
  settings?: any;
  children?: any;
}
type AnchorDrawer = "left";
type AnchorDrawerSearch = "top";

function HideOnScroll(props: HeaderProps) {
  const { children, window, settings } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header(props: HeaderProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { data } = useGetLinksQuery({ culture: router.locale });
  const { settings } = props;
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [textColor, setTextColor] = React.useState("#fff");
  const logout = () => {
    deleteCookie("token");
    router.push(`/${router.locale}/account/dashboard`);
  };
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleScroll = () => {
    if (document.getElementsByClassName("mainHeader").length > 0) {
      if (window.pageYOffset > 50) {
        document.getElementsByClassName("mainHeader")[0].classList.add("fixed");
        if (settings?.theme == "light") {
          setTextColor("#da9800");
        }
      } else {
        document
          .getElementsByClassName("mainHeader")[0]
          .classList.remove("fixed");
        if (settings?.theme == "light") {
          setTextColor("#fff");
        }
      }
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const anchorDrawer = "left";
  const [stateDrawer, setStateDrawer] = React.useState({ left: false });
  const toggleDrawer =
    (anchorDrawer: AnchorDrawer, openDrawer: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      )
        return;
      setStateDrawer({ ...stateDrawer, [anchorDrawer]: openDrawer });
    };

  const anchorDrawerSearch = "top";
  const [stateDrawerSearch, setStateDrawerSearch] = React.useState({
    top: false,
  });
  const toggleDrawerSearch =
    (anchorDrawerSearch: AnchorDrawerSearch, openDrawerSearch: boolean) =>
    (e: React.KeyboardEvent | React.MouseEvent) => {
      if (e && e.type === "keydown") return;
      setStateDrawerSearch({
        ...stateDrawerSearch,
        [anchorDrawerSearch]: openDrawerSearch,
      });
    };

  const switchLanguage = "switch-language";
  const [switchLanguageAnchor, setSwitchLanguageAnchor] =
    React.useState<null | HTMLElement>(null);
  const isSwitchLanguageMenuOpen = Boolean(switchLanguageAnchor);
  const handleSwitchLanguageMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setSwitchLanguageAnchor(event.currentTarget);
  };
  const handleSwitchLanguageMenuClose = () => {
    setSwitchLanguageAnchor(null);
  };
  const renderSwitchLanguageMenu = (
    <Menu
      anchorEl={switchLanguageAnchor}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      id={switchLanguage}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isSwitchLanguageMenuOpen}
      onClose={handleSwitchLanguageMenuClose}
    >
      <MenuItem onClick={handleSwitchLanguageMenuClose}>
        <Link href="/fr" locale="fr">
          <a>{t("French")}</a>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleSwitchLanguageMenuClose}>
        <Link href="/en" locale="en">
          <a>{t("English")}</a>
        </Link>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <React.Fragment key={anchorDrawer}>
        <HideOnScroll {...props}>
          <AppBar
            variant="mainHeader"
            className={`mainHeader ${
              settings?.classes ? settings.classes : ""
            }`}
          >
            <Toolbar
              sx={{
                gridTemplateColumns: {
                  xs: !settings.pagedata?.profile ? "1fr 1fr 1fr" : "1fr 1fr ",
                  md: "1fr 1fr 1fr",
                  lg: "1fr 1fr 1fr",
                },
                display: "grid",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: { xs: "none", md: "flex", lg: "flex" } }}>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open modal"
                  onClick={handleOpenModal}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              {!settings.pagedata?.profile && (
                <Box sx={{ display: { xs: "flex", md: "none", lg: "none" } }}>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer(anchorDrawer, true)}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              )}
              <Link href={`/${router.locale}`}>
                <Box
                  sx={{
                    textAlign: {
                      xs: !settings.pagedata?.profile ? "center" : "left",
                      lg: "center",
                      md: "center",
                    },
                  }}
                >
                  <a className="logo">
                    <Image
                      src={logo}
                      alt={t("AI University")}
                      layout="fixed"
                      objectFit="cover"
                      width={150}
                      height={150}
                    />
                  </a>
                </Box>
              </Link>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="right"
              >
                {!settings.pagedata?.profile ? (
                  <>
                    <IconButton
                      size="large"
                      aria-label=""
                      color="inherit"
                      onClick={toggleDrawerSearch(anchorDrawerSearch, true)}
                    >
                      <SearchIcon />
                    </IconButton>
                    <IconButton
                      size="large"
                      aria-label=""
                      color="inherit"
                      href="mailto:aiuniversity@pristini-international.tn"
                    >
                      <MailIcon />
                    </IconButton>
                    {/*<IconButton size="large" aria-label="" color="inherit" edge="end" aria-controls={switchLanguage} aria-haspopup="true" onClick={handleSwitchLanguageMenuOpen} className="switchLanguage">{router.locale=='en'? 'EN':'FR'} <KeyboardArrowDown /></IconButton>*/}
                  </>
                ) : (
                  <>
                    <IconButton
                      onClick={() => {
                        if (showDropdown) {
                          setShowDropdown(false);
                        }
                        setShowNotifications(!showNotifications);
                      }}
                      className="regular"
                      sx={{
                        display: "flex",
                        color:
                          textColor == "#da9800" ? " #828081 !important" : "",
                        position: "relative",
                      }}
                      size="large"
                      edge="start"
                    >
                      {showNotifications && (
                        <Box
                          onMouseLeave={() => {
                            setShowNotifications(false);
                          }}
                          sx={{
                            background: "#fff",
                            color: "#292078",
                            borderRadius: "5px",
                          }}
                          position="absolute"
                          top="100%"
                          right="10px"
                        >
                          <Box className="notificationElement" onClick={logout}>
                            <Typography>
                              {t("Votre dossier est accepté")}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                      <NotificationsNoneIcon fontSize="large" />
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          right: "20%",
                          width: "30%",
                          borderRadius: "50%",
                          height: "30%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "x-small",
                          backgroundColor: "#da9800 !important",
                          color: "#fff",
                        }}
                      >
                        0
                      </Box>
                    </IconButton>
                    <Box
                      onClick={() => {
                        if (showNotifications) {
                          setShowNotifications(false);
                        }
                        handleDropdown();
                      }}
                      sx={{
                        padding: "10px",
                        height: "60px",
                        alignItems: "center",
                        margin: "0 !important",
                      }}
                    >
                      <svg
                        style={{
                          height: "100%",
                          alignItems: "center",
                        }}
                        viewBox="-2.28 0 66.3577 66.3577"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <clipPath id="clipPath">
                            <path
                              clipRule="evenodd"
                              d="M53.456 52.022A30.766 30.766 0 0 1 30.9 61.829a31.163 31.163 0 0 1-3.833-.237 34.01 34.01 0 0 1-11.15-3.644 31.007 31.007 0 0 1-7.849-6.225l1.282-3.1 13.91-6.212c.625 3.723 7.806 8.175 7.806 8.175s7.213-3.412 8.087-8.211l12.777 6.281z"
                              fill="none"
                            />
                          </clipPath>
                          <clipPath id="clipPath-2">
                            <path
                              clipRule="evenodd"
                              d="M14.112 46.496l6.814-3.042 10.209 13.978 10.328-13.938 5.949 2.831v20.033h-33.3V46.496z"
                              fill="none"
                            />
                          </clipPath>
                        </defs>
                        <title />
                        <g data-name="Layer 2" id="Layer_2">
                          <g data-name="—ÎÓÈ 1" id="_ÎÓÈ_1">
                            <circle
                              cx="30.8999"
                              cy="30.8999"
                              fill="#3B2EB2"
                              r="30.8999"
                            />
                            <path
                              d="M23.255 38.68l15.907.121v12.918l-15.907-.121V38.68z"
                              fill="#f9dca4"
                              fillRule="evenodd"
                            />
                            <path
                              d="M39.165 38.778v3.58a7.783 7.783 0 0 1-.098 1.18 6.527 6.527 0 0 1-.395 1.405c-5.374 4.164-13.939.748-15.306-6.365z"
                              fillRule="evenodd"
                              opacity="0.11"
                            />
                            <path
                              d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.266 0-21.281-35.266 0-35.266z"
                              fill="#ffe8be"
                              fillRule="evenodd"
                            />
                            <path
                              d="M18.365 24.046c-3.07 1.339-.46 7.686 1.472 7.658a31.972 31.972 0 0 1-1.472-7.659z"
                              fill="#f9dca4"
                              fillRule="evenodd"
                            />
                            <path
                              d="M44.135 24.046c3.07 1.339.465 7.686-1.466 7.657a31.978 31.978 0 0 0 1.466-7.657z"
                              fill="#f9dca4"
                              fillRule="evenodd"
                            />
                            <path
                              d="M44.123 24.17s7.96-11.785-2.636-16.334a11.881 11.881 0 0 0-12.87-5.22C22.775 3.805 20.604 6.7 20.604 6.7s-5.53 5.014-10.44 5.117a9.774 9.774 0 0 0 6.28 1.758c-.672 1.68-1.965 7.21 1.989 10.854 4.368-2.868 8.012-8.477 8.012-8.477s.982 3.257.207 4.86a18.879 18.879 0 0 0 7.922-3.531c2.542-2.036 3.893-4.297 5.31-4.326 3.256-.069 4.213 9.74 4.24 11.216z"
                              fill="#ecbe6a"
                              fillRule="evenodd"
                            />
                            <path
                              d="M53.456 52.022A30.766 30.766 0 0 1 30.9 61.829a31.163 31.163 0 0 1-3.833-.237 34.01 34.01 0 0 1-11.15-3.644 31.007 31.007 0 0 1-7.849-6.225l1.282-3.1 13.91-6.212c.625 3.723 7.806 8.175 7.806 8.175s7.213-3.412 8.087-8.211l12.777 6.281z"
                              fill="#498bd9"
                              fillRule="evenodd"
                            />
                            <g clipPath="url(#clipPath)">
                              <path
                                d="M14.112 46.496l6.814-3.042 10.209 13.978 10.328-13.938 5.949 2.831v20.033h-33.3V46.496z"
                                fill="#545f69"
                                fillRule="evenodd"
                              />
                              <g clipPath="url(#clipPath-2)">
                                <path
                                  d="M37.79 42.881h.732v21.382h-.732V42.881zm-14.775 0h.731v21.382h-.73V42.881zm-2.981 0h.731v21.382h-.731V42.881zm-2.944 0h.731v21.382h-.73V42.881zm-2.981 0h.731v21.382h-.731V42.881zm20.708 0h.731v21.382h-.731V42.881zm-2.981 0h.731v21.382h-.731V42.881zm-2.944 0h.731v21.382h-.731V42.881zm-2.981 0h.731v21.382h-.731V42.881zm20.785 0h.732v21.382h-.732V42.881zm-2.98 0h.73v21.382h-.73V42.881zm-2.944 0h.73v21.382h-.73z"
                                  fill="#434955"
                                  fillRule="evenodd"
                                />
                              </g>
                            </g>
                            <path
                              d="M23.265 41.27l7.802 9.316-6.305 3.553-4.823-10.591 3.326-2.278z"
                              fill="#58b0e0"
                              fillRule="evenodd"
                            />
                            <path
                              d="M39.155 41.45l-8.088 9.136 6.518 3.553 4.777-10.719-3.207-1.97z"
                              fill="#58b0e0"
                              fillRule="evenodd"
                            />
                            <path
                              d="M21.637 23.157h6.416a1.58 1.58 0 0 1 1.119.464v.002a1.579 1.579 0 0 1 .464 1.117v2.893a1.585 1.585 0 0 1-1.583 1.583h-6.416a1.578 1.578 0 0 1-1.116-.465h-.002a1.58 1.58 0 0 1-.464-1.118V24.74a1.579 1.579 0 0 1 .464-1.117l.002-.002a1.578 1.578 0 0 1 1.116-.464zm6.416.85h-6.416a.735.735 0 0 0-.517.214l-.001.002a.735.735 0 0 0-.214.517v2.893a.73.73 0 0 0 .215.517.735.735 0 0 0 .517.215h6.416a.735.735 0 0 0 .732-.732V24.74a.734.734 0 0 0-.214-.518.731.731 0 0 0-.518-.215z"
                              fill="#464449"
                              fillRule="evenodd"
                            />
                            <path
                              d="M34.548 23.157h6.416a1.58 1.58 0 0 1 1.118.464v.002a1.579 1.579 0 0 1 .465 1.117v2.893a1.585 1.585 0 0 1-1.583 1.583h-6.416a1.58 1.58 0 0 1-1.117-.465l-.001-.002a1.58 1.58 0 0 1-.465-1.116V24.74a1.58 1.58 0 0 1 .465-1.117l.002-.001a1.58 1.58 0 0 1 1.116-.465zm6.416.85h-6.416a.73.73 0 0 0-.517.214l-.001.002a.729.729 0 0 0-.214.517v2.893a.73.73 0 0 0 .214.517l.001.001a.73.73 0 0 0 .517.214h6.416a.735.735 0 0 0 .732-.732V24.74a.734.734 0 0 0-.214-.518h-.001a.731.731 0 0 0-.517-.215z"
                              fill="#464449"
                              fillRule="evenodd"
                            />
                            <path
                              d="M29.415 24.506h3.845v.876h-3.845z"
                              fill="#464449"
                            />
                          </g>
                        </g>
                      </svg>
                    </Box>
                    <Typography
                      onClick={() => {
                        if (showNotifications) {
                          setShowNotifications(false);
                        }
                        handleDropdown();
                      }}
                      sx={{
                        color: textColor,
                        alignItems: "center",
                        display: { lg: "flex", md: "flex", xs: "none" },
                      }}
                    >
                      {t("Hello") + " "}
                      {settings.pagedata?.profile?.firstname}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        if (showNotifications) {
                          setShowNotifications(false);
                        }
                        handleDropdown();
                      }}
                      className="regular"
                      sx={{
                        padding: { lg: "12px", md: "12px", xs: 0 },
                        display: "flex",
                        color: textColor + " !important",
                        marginLeft: "0 !important",
                      }}
                      size="large"
                      edge="start"
                    >
                      {showDropdown && (
                        <Box
                          sx={{
                            background: "#fff",
                            color: "#292078",
                            borderRadius: "5px",
                          }}
                          position="absolute"
                          top="calc(100% + 30px)"
                          width="max-content"
                          right="10px"
                        >
                          <Link href={`/${router.locale}/account/profile`}>
                            <Box className="dropDownElement">
                              <PersonIcon />
                              <Typography>{t("My Profile")} </Typography>
                            </Box>
                          </Link>
                          <Link
                            href={`/${router.locale}/account/profile/password`}
                          >
                            <Box className="dropDownElement">
                              <SettingsIcon />
                              <Typography minWidth="fit-content">
                                {t("Change Password")}
                              </Typography>
                            </Box>
                          </Link>
                          <Box className="dropDownElement" onClick={logout}>
                            <LogoutIcon />
                            <Typography>{t("Logout")}</Typography>
                          </Box>
                        </Box>
                      )}
                      <ExpandMoreIcon
                        sx={{ display: { lg: "flex", md: "flex", xs: "none" } }}
                      />
                    </IconButton>
                  </>
                )}
                {settings.pagedata?.profile && (
                  <Box sx={{ display: { xs: "flex", md: "none", lg: "none" } }}>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      onClick={toggleDrawer(anchorDrawer, true)}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Box>
                )}
              </Stack>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        {renderSwitchLanguageMenu}
        <SwipeableDrawer
          anchor={anchorDrawer}
          open={stateDrawer[anchorDrawer]}
          onClose={toggleDrawer(anchorDrawer, false)}
          onOpen={toggleDrawer(anchorDrawer, true)}
        >
          <Box
            className="drawerMenu"
            role="presentation"
            onKeyDown={toggleDrawer(anchorDrawer, false)}
          >
            {data?.items && <DrawerMenu settings={{ links: data.items }} />}
          </Box>
        </SwipeableDrawer>
        <Modal open={openModal} onClose={handleCloseModal} sx={{ zIndex: 998 }}>
          <Paper className="deskMainMenu">
            {data?.items && (
              <ModalMenu
                settings={{ links: data?.items }}
                handleCloseModal={handleCloseModal}
                toggleDrawerSearch={toggleDrawerSearch}
                anchorDrawerSearch={anchorDrawerSearch}
              />
            )}
          </Paper>
        </Modal>
      </React.Fragment>
      <React.Fragment key={anchorDrawerSearch}>
        <SwipeableDrawer
          anchor={anchorDrawerSearch}
          open={stateDrawerSearch[anchorDrawerSearch]}
          onClose={toggleDrawerSearch(anchorDrawerSearch, false)}
          onOpen={toggleDrawerSearch(anchorDrawerSearch, true)}
        >
          <Paper
            variant="section"
            className="drawerSearch"
            role="presentation"
            onKeyDown={toggleDrawerSearch(anchorDrawerSearch, false)}
          >
            <DrawerSearch
              setStateDrawerSearch={setStateDrawerSearch}
              anchorDrawerSearch={anchorDrawerSearch}
            />
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
}
