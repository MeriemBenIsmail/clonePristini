import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import * as React from "react";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
const ArrowForwardSharpIcon = Dynamic<any>(
  () => import("@mui/icons-material/ArrowForwardSharp"),
  { ssr: false }
);
const Diploma = Dynamic<any>(() => import("../../account/form/diploma"), {
  ssr: false,
});
const PageHeader = Dynamic(() => import("../../front/slides/pageHeader"), {
  ssr: false,
});
const Layout = Dynamic(() => import("../../front/layout"), {
  ssr: false,
});
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), { ssr: false });
const Stack = Dynamic<any>(() => import("@mui/material/Stack"), { ssr: false });
const Box = Dynamic<any>(() => import("@mui/material/Box"), { ssr: false });
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {
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
const TextField = Dynamic<any>(() => import("@mui/material/TextField"), {
  ssr: false,
});

const RadioGroup = Dynamic<any>(() => import("@mui/material/RadioGroup"), {
  ssr: false,
});
const Grid = Dynamic<any>(() => import("@mui/material/Grid"), { ssr: false });

const FormControlLabel = Dynamic<any>(
  () => import("@mui/material/FormControlLabel"),
  { ssr: false }
);
const Radio = Dynamic<any>(() => import("@mui/material/Radio"), { ssr: false });

const Button = Dynamic<any>(() => import("@mui/material/Button"), {
  ssr: false,
});
const TwSeo = Dynamic<any>(() => import("../../src/seo/TwSeo"), { ssr: false });
const Country = Dynamic<any>(() => import("../../account/form/country"), {
  ssr: false,
});
const Container = Dynamic<any>(() => import("@mui/material/Container"), {
  ssr: false,
});
const FormHelperText = Dynamic<any>(
  () => import("@mui/material/FormHelperText"),
  {
    ssr: false,
  }
);

const Registration: NextPage = ({ pagedata }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [alertClass, setAlertClass] = React.useState("");
  const [alertMsg, setAlertMsg] = React.useState("\u00a0");

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = t("Field is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = t("Field is invalid");
    }
    if (!values.firstname) {
      errors.firstname = t("Field is required");
    }
    if (!values.lastname) {
      errors.lastname = t("Field is required");
    }
    if (!values.phone) {
      errors.phone = t("Field is required");
    } else {
      let enteredPhone = parseInt(values.phone);
      if (values.phone.length !== 8 || !enteredPhone) {
        errors.phone = t("Field is invalid");
      }
    }
    if (!values.city) {
      errors.city = t("Field is required");
    }
    if (!values.level) {
      errors.level = t("Field is required");
    }
    if (!values.year) {
      errors.year = t("Field  is required");
    } else {
      let currentYear = new Date().getFullYear();
      let enteredYear = parseInt(values.year);
      if (currentYear < enteredYear || !enteredYear) {
        errors.year = t("Field is invalid");
      }
    }
    if (!values.establishment) {
      errors.establishment = t("Field  is required");
    }
    if (!values.program) {
      errors.program = t("Field is required");
    }
    if (!values.civility) {
      errors.civility = t("Field is required");
    }
    if (!values.country) {
      errors.country = t("Field is required");
    }
    if (!values.contact) {
      errors.contact = t("Field is required");
    }
    return errors;
  };

  const initialFormValues = {
    firstname: "",
    lastname: "",
    phone: "",
    city: "",
    country: "",
    email: "",
    level: "",
    year: "",
    establishment: "",
    program: "",
    civility: "",
    contact: "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validate: validate,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        formData.append(key, value);
      }
      axios({
        url: `${process.env.API}${router.locale}/jpo/registration`,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          if (res.data.status == 200) {
            setAlertClass("success");
            setAlertMsg("Successfull Registration");
          } else {
            setAlertClass("error");
            setAlertMsg(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          setAlertClass("error");
          setAlertMsg(error.response.data.message);
        });
    },
  });

  const submitting = formik?.isSubmitting;

  useEffect(() => {
    if (formik.errors !== {}) {
      window.scrollTo(0, 0);
    }
  }, [submitting]);
  return (
    <>
      {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
      <Layout>
        <PageHeader
          settings={{
            title: "Journees Portes Ouvertes",
            src: "/images/front/masters.png",
          }}
        />
        <Paper variant="main" component="main" className="account">
          <Container
            maxWidth="lg"
            className="wrapper"
            style={{ marginBlock: "0" }}
          >
            <Typography variant="subtitle2" component="h2">
              {t("Registration Form")}
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
                <span
                  onClick={() => {
                    setAlertMsg("\u00a0");
                    setAlertClass("");
                  }}
                >
                  x
                </span>
              </Box>

              <FormControl fullWidth size="medium" margin="dense">
                <InputLabel
                  sx={{
                    color: `${
                      formik.touched.civility && formik.errors.civility
                        ? "#d32f2f"
                        : ""
                    }`,
                  }}
                  id="civility-label"
                >
                  {t("Civility")}
                </InputLabel>
                <Select
                  required
                  labelId="civility-label"
                  id="civility"
                  label={t("Civility")}
                  name="civility"
                  value={formik.values.civility}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.civility && Boolean(formik.errors.civility)
                  }
                  margin="dense"
                >
                  <MenuItem value={1}>{t("Mr")}</MenuItem>
                  <MenuItem value={2}>{t("Mrs")}</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {(formik.touched.civility && formik.errors.civility) ||
                    "\u00a0"}
                </FormHelperText>
              </FormControl>

              <TextField
                fullWidth
                size="medium"
                required
                id="firstname"
                name="firstname"
                variant="outlined"
                margin="dense"
                label={t("Firstname")}
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={
                  (formik.touched.firstname && formik.errors.firstname) ||
                  "\u00a0"
                }
              />
              <TextField
                fullWidth
                size="medium"
                required
                id="lastname"
                name="lastname"
                label={t("Lastname")}
                variant="outlined"
                margin="dense"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={
                  (formik.touched.lastname && formik.errors.lastname) ||
                  "\u00a0"
                }
              />
              <TextField
                fullWidth
                size="medium"
                required
                id="phone"
                name="phone"
                label={t("Phone")}
                variant="outlined"
                margin="dense"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={
                  (formik.touched.phone && formik.errors.phone) || "\u00a0"
                }
              />
              <TextField
                fullWidth
                size="medium"
                required
                id="city"
                name="city"
                label={t("City")}
                variant="outlined"
                margin="dense"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={
                  (formik.touched.city && formik.errors.city) || "\u00a0"
                }
              />
              <Country
                settings={{
                  formik: formik,
                }}
              />
              <TextField
                fullWidth
                size="medium"
                required
                type="email"
                id="email"
                name="email"
                label={t("Email")}
                variant="outlined"
                margin="dense"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={
                  (formik.touched.email && formik.errors.email) || "\u00a0"
                }
              />
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
                  {t("Study Level")}
                </InputLabel>
                <Select
                  required
                  labelId="level-label"
                  id="level"
                  label={t("Study Level")}
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
                type="text"
                id="year"
                name="year"
                label={t("Graduation Year")}
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
                type="text"
                id="establishment"
                name="establishment"
                label={t("University")}
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

              <FormControl
                sx={{
                  marginBottom: "15px !important",
                }}
                className="paymentOptions"
              >
                <Typography
                  sx={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    color: "#1E175B",
                  }}
                >
                  {t(
                    "Si vous souhaitez être recontacté par un de nos conseillers concernant nos formations, choisissez le moyen de communication que vous préférez :*"
                  )}
                </Typography>
                <RadioGroup
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.contact && Boolean(formik.errors.contact)
                  }
                  column
                  aria-labelledby=""
                  name="contact"
                  spacing="4"
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label={t("By Phone")}
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label={t("By Email")}
                  />
                  <FormControlLabel
                    value="3"
                    control={<Radio />}
                    label={t("By Whatsup")}
                  />
                </RadioGroup>
                <FormHelperText sx={{ color: "#d32f2f", marginTop: "15px" }}>
                  {(formik.touched.contact && formik.errors.contact) ||
                    "\u00a0"}
                </FormHelperText>
              </FormControl>

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
                  {t("Register")}
                </Button>
              </Stack>
            </Box>
          </Container>
        </Paper>
      </Layout>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const res = await fetch(`${process.env.API}${ctx.locale}/settings/general`);
  const pagedata = await res.json();
  return { props: { pagedata } };
}

export default Registration;
