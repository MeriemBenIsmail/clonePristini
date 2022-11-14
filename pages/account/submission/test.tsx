import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import * as React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const DateTimePicker = Dynamic(
  (() =>
    import("@mui/x-date-pickers/DateTimePicker").then(
      (module) => module.DateTimePicker
    )) as any,
  {
    ssr: false,
  }
);
const LocalizationProvider = Dynamic(
  (() =>
    import("@mui/x-date-pickers/LocalizationProvider").then(
      (module) => module.LocalizationProvider
    )) as any,
  {
    ssr: false,
  }
);

const Layout = Dynamic<any>(() => import("../../../account/layout"), {
  ssr: false,
});
const Stepper = Dynamic<any>(() => import("../../../account/Stepper"), {
  ssr: false,
});
const Stack = Dynamic<any>(() => import("@mui/material/Stack"), { ssr: false });
const Box = Dynamic<any>(() => import("@mui/material/Box"), { ssr: false });
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {
  ssr: false,
});
const TextField = Dynamic<any>(() => import("@mui/material/TextField"), {
  ssr: false,
});
const Button = Dynamic<any>(() => import("@mui/material/Button"), {
  ssr: false,
});
const TwSeo = Dynamic<any>(() => import("../../../src/seo/TwSeo"), {
  ssr: false,
});
const Login = Dynamic<any>(() => import("../../../account/form/login"), {
  ssr: false,
});

const Interview: NextPage = ({ pagedata }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [value, setValue] = React.useState<Date | null>(
    new Date("2018-01-01T00:00:00.000Z")
  );
  const [alertClass, setAlertClass] = React.useState("");
  const [alertMsg, setAlertMsg] = React.useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setAlertClass("");
    setAlertMsg("");
    const formData = new FormData();
    if (!value) {
      setAlertClass("error");
      setAlertMsg(t("Veuillez verifier vos informations."));
      window.scrollTo(0, 0);
      return false;
    }
    formData.append("date", value.toDateString());
    const token = getCookie("token");
    axios({
      url: `${process.env.API}${router.locale}/account/submissions/level-test`,
      headers: { authorization: `Bearer ${token}` },
      method: "POST",
      data: formData,
    }).then((res) => {
      if (res.data.status == 200) {
        router.push(`/${router.locale}/account/submission/status`);
      } else {
        setAlertClass("error");
        setAlertMsg(res.data.message);
      }
    });
  };

  return (
    <>
      {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
      <Layout pagedata={pagedata}>
        {!pagedata?.profile && <Login />}
        {pagedata?.profile && (
          <>
            <Stepper settings={{ active: 4 }}></Stepper>
            <Typography variant="subtitle2" component="h2">
              {t("Test appointment")}
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              id="form"
              maxWidth="sm"
              margin="auto"
            >
              <Typography
                sx={{ color: "#1E175B", textAlign: "Center" }}
                my={5}
                variant="body1"
                component="p"
              >
                {t(
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                )}
              </Typography>
              <Box id="alert" className={`alert ${alertClass}`}>
                {alertMsg}
              </Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label={t("Date")}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </LocalizationProvider>
              <Stack spacing={2} direction="row" justifyContent="center">
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  type="submit"
                >
                  {t("next")}
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { req, res } = ctx;
  const token = getCookie("token", { req, res });
  let pagedata: any = {};
  if (!token) return { props: { pagedata } };
  await axios({
    url: `${process.env.API}${ctx.locale}/account/submissions/folder`,
    headers: { authorization: `Bearer ${token}` },
    method: "POST",
  })
    .then((result) => {
      if (result.data.status == 200) {
        pagedata = result.data;
      } else {
        deleteCookie("token", { req, res });
      }
    })
    .catch((error) => {
      deleteCookie("token", { req, res });
    });
  if (!pagedata?.folder)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission`,
      },
    };
  if (pagedata?.folder && pagedata?.folder?.step == 1)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission`,
      },
    };
  if (pagedata?.folder && pagedata?.folder?.step == 2)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission/status`,
      },
    };
  if (pagedata?.folder && pagedata?.folder?.step == 3)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission/interview`,
      },
    };
  if (pagedata?.folder && pagedata?.folder?.step == 4)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission/status`,
      },
    };
  if (pagedata?.folder && pagedata?.folder?.step == 5)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission/payment`,
      },
    };
  if (pagedata?.folder && pagedata?.folder?.step == 6)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission/status`,
      },
    };
  if (pagedata?.folder && pagedata?.folder?.step == 8)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission/status`,
      },
    };
  return { props: { pagedata } };
}

export default Interview;
