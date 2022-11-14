import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import * as React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import { useFormik } from "formik";

const ArrowForwardSharpIcon = Dynamic<any>(
  () => import("@mui/icons-material/ArrowForwardSharp"),
  { ssr: false }
);
const Stepper = Dynamic<any>(() => import("../../../account/Stepper"), {
  ssr: false,
});
const Layout = Dynamic<any>(() => import("../../../account/layout"), {
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
const Diploma = Dynamic<any>(() => import("../../../account/form/diploma"), {
  ssr: false,
});
const FormControl = Dynamic<any>(() => import("@mui/material/FormControl"), {
  ssr: false,
});
const InputLabel = Dynamic<any>(() => import("@mui/material/InputLabel"), {
  ssr: false,
});
const Select = Dynamic<any>(() => import("@mui/material/Select"), {
  ssr: false,
});
const MenuItem = Dynamic<any>(() => import("@mui/material/MenuItem"), {
  ssr: false,
});
const FormHelperText = Dynamic<any>(
  () => import("@mui/material/FormHelperText"),
  {
    ssr: false,
  }
);

const General: NextPage = ({ pagedata }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const defaultValues = pagedata?.folder
    ? {
        level: pagedata.folder.level,
        year: pagedata.folder.year,
        establishment: pagedata.folder.establishment,
        program: pagedata.folder.program,
      }
    : { level: "", year: "", establishment: "", program: "" };
  const [alertClass, setAlertClass] = React.useState("");
  const [alertMsg, setAlertMsg] = React.useState("");

  const initialFormValues = defaultValues;
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.year) {
      errors.year = t("Field is required");
    } else {
      let currentYear = new Date().getFullYear();
      let enteredYear = parseInt(values.year);
      if (currentYear < enteredYear || !enteredYear) {
        errors.year = t("Field is invalid");
      }
    }
    if (!values.level) {
      errors.level = t("Field is required");
    }
    if (!values.establishment) {
      errors.establishment = t("Field is required");
    }
    if (!values.program) {
      errors.program = t("Field is required");
    }
    return errors;
  };
  const formik = useFormik({
    validate: validate,
    initialValues: initialFormValues,
    onSubmit: (values) => {
      setAlertClass("");
      setAlertMsg("");
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value);
      }
      const token = getCookie("token");
      axios({
        url: `${process.env.API}${router.locale}/account/submissions/new`,
        headers: { authorization: `Bearer ${token}` },
        method: "POST",
        data: formData,
      }).then((res) => {
        if (res.data.status == 200) {
          router.push(`/${router.locale}/account/submission/files`);
        } else {
          setAlertClass("error");
          setAlertMsg(res.data.message);
        }
      });
    },
  });

  return (
    <>
      {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
      <Layout pagedata={pagedata}>
        {!pagedata?.profile && <Login />}
        {pagedata?.profile && (
          <>
            <Stepper settings={{ active: 0 }}></Stepper>
            <Typography variant="subtitle2" component="h2">
              {t("General informations")}
            </Typography>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              id="form"
              maxWidth="sm"
              margin="auto"
            >
              <Box id="alert" className={`alert ${alertClass} banner`}>
                {alertMsg}
              </Box>
              <FormControl fullWidth size="medium" margin="dense">
                <InputLabel
                  sx={{
                    color: `${
                      formik.touched.level && formik.errors.level
                        ? "#d32f2f"
                        : ""
                    }`,
                  }}
                  id="level-label"
                >
                  {t("Level of studies")}
                </InputLabel>
                <Select
                  required
                  labelId="level-label"
                  id="level"
                  label={t("Level of studies")}
                  name="level"
                  value={formik.values.level}
                  onChange={formik.handleChange}
                  error={formik.touched.level && Boolean(formik.errors.level)}
                  margin="dense"
                >
                  <MenuItem value={1}>{t("Bac")}</MenuItem>
                  <MenuItem value={2}>{t("Bac+3")}</MenuItem>
                  <MenuItem value={3}>{t("Bac+5")}</MenuItem>
                  <MenuItem value={4}>{t("sup Bac+5")}</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {(formik.touched.level && formik.errors.level) || "\u00a0"}
                </FormHelperText>
              </FormControl>
              <TextField
                fullWidth
                size="medium"
                required
                id="year"
                name="year"
                label={t("Year of graduation")}
                variant="outlined"
                margin="dense"
                value={formik.values.year}
                onChange={formik.handleChange}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={
                  (formik.touched.year && formik.errors.year) || "\u00a0"
                }
              />
              <TextField
                fullWidth
                size="medium"
                required
                id="establishment"
                name="establishment"
                label={t("Establishment")}
                variant="outlined"
                margin="dense"
                value={formik.values.establishment}
                onChange={formik.handleChange}
                error={
                  formik.touched.establishment &&
                  Boolean(formik.errors.establishment)
                }
                helperText={
                  (formik.touched.establishment &&
                    formik.errors.establishment) ||
                  "\u00a0"
                }
              />
              <Diploma
                settings={{
                  formik: formik,
                }}
              />
              <Stack spacing={2} direction="row" justifyContent="center">
                <Button
                  sx={{ position: "relative" }}
                  endIcon={
                    <ArrowForwardSharpIcon
                      sx={{
                        position: "absolute",
                        right: "20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                    />
                  }
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
  if (pagedata?.folder && pagedata?.folder?.step == 7)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission/test`,
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

export default General;
