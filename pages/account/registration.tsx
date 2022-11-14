import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import * as React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { setCookie } from "cookies-next";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";

const Layout = Dynamic<any>(() => import("../../account/layout"), {
  ssr: false,
});
const Link = Dynamic<any>(() => import("next/link"), { ssr: false });
const ArrowForwardSharpIcon = Dynamic<any>(
  () => import("@mui/icons-material/ArrowForwardSharp"),
  { ssr: false }
);
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
const Button = Dynamic<any>(() => import("@mui/material/Button"), {
  ssr: false,
});
const TwSeo = Dynamic<any>(() => import("../../src/seo/TwSeo"), { ssr: false });
const Country = Dynamic<any>(() => import("../../account/form/country"), {
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
    //email
    if (!values.email) {
      errors.email = t("Field is required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = t("Field is invalid");
    }
    //password
    if (!values.password) {
      errors.password = t("Field is required");
    } else {
      var passw = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d#$@!%&*?]{8,}$/;
      if (!values.password.match(passw)) {
        errors.password = t(
          "Password must be longer than 8, contain at least 1 uppercase & 1 number"
        );
      }
    }
    if (!values.repassword) {
      errors.repassword = t("Field is required");
    } else if (values.repassword != values.password) {
      errors.repassword = "Passwords must match";
    }

    if (!values.civility) {
      errors.civility = t("Field is required");
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
    if (!values.country) {
      errors.country = t("Field is required");
    }
    return errors;
  };

  const initialFormValues = {
    civility: "",
    firstname: "",
    lastname: "",
    phone: "",
    city: "",
    country: "",
    email: "",
    password: "",
    repassword: "",
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
        url: `${process.env.API}${router.locale}/registration`,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          if (res.data.status == 200) {
            setCookie("token", res.data.token);
            router.push(`/${router.locale}/account/submission`);
          } else {
            setAlertClass("error");
            setAlertMsg(res.data.message);
          }
        })
        .catch((error) => {
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
      <Layout pagedata={pagedata}>
        <Typography variant="subtitle2" component="h2">
          {t("Create an account")}
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
              error={formik.touched.civility && Boolean(formik.errors.civility)}
              margin="dense"
            >
              <MenuItem value={1}>{t("Mr")}</MenuItem>
              <MenuItem value={2}>{t("Mrs")}</MenuItem>
            </Select>
            <FormHelperText sx={{ color: "#d32f2f" }}>
              {(formik.touched.civility && formik.errors.civility) || "\u00a0"}
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
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={
              (formik.touched.firstname && formik.errors.firstname) || "\u00a0"
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
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={
              (formik.touched.lastname && formik.errors.lastname) || "\u00a0"
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
            helperText={(formik.touched.city && formik.errors.city) || "\u00a0"}
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
          <TextField
            autoComplete="off"
            fullWidth
            size="medium"
            required
            type="password"
            id="password"
            name="password"
            label={t("Password")}
            variant="outlined"
            margin="dense"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={
              (formik.touched.password && formik.errors.password) || "\u00a0"
            }
          />
          <TextField
            autoComplete="off"
            fullWidth
            size="medium"
            required
            type="password"
            id="repassword"
            name="repassword"
            label={t("Confirm password")}
            value={formik.values.repassword}
            onChange={formik.handleChange}
            error={
              formik.touched.repassword && Boolean(formik.errors.repassword)
            }
            helperText={
              (formik.touched.repassword && formik.errors.repassword) ||
              "\u00a0"
            }
            variant="outlined"
            margin="dense"
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
              {t("register")}
            </Button>
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="center">
            <Link href="">
              <Typography
                sx={{
                  marginTop: "20px",
                  color: "#3B2EB2",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {t("Download the admissions guide")}
              </Typography>
            </Link>
          </Stack>
        </Box>
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
