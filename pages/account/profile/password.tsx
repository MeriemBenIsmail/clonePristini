import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import * as React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { setCookie } from "cookies-next";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { useFormik } from "formik";

const Layout = Dynamic<any>(() => import("../../../account/layout"), {
  ssr: false,
});
const ArrowForwardSharpIcon = Dynamic<any>(
  () => import("@mui/icons-material/ArrowForwardSharp"),
  { ssr: false }
);
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

const Profile: NextPage = ({ pagedata }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [alertClass, setAlertClass] = React.useState("");
  const [alertMsg, setAlertMsg] = React.useState("\u00a0");

  const validate = (values: any) => {
    const errors: any = {};

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
      errors.repassword = t("Confirm password is required");
    } else if (values.repassword != values.password) {
      errors.repassword = "Passwords must match";
    }

    return errors;
  };

  const initialFormValues = {
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
      const token = getCookie("token");
      axios({
        url: `${process.env.API}${router.locale}/account/profile/password`,
        headers: { authorization: `Bearer ${token}` },
        method: "POST",
        data: formData,
      })
        .then((res) => {
          if (res.data.status == 200) {
            setAlertClass("success");
            setAlertMsg(t("Password successfully updated"));
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

  return (
    <>
      {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
      <Layout pagedata={pagedata}>
        <Typography variant="subtitle2" component="h2">
          {t("Update your password")}
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
              {t("Update")}
            </Button>
          </Stack>
        </Box>
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
    url: `${process.env.API}${ctx.locale}/account/profile`,
    headers: { authorization: `Bearer ${token}` },
    method: "GET",
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
  return { props: { pagedata } };
}

export default Profile;
