import * as React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { setCookie } from "cookies-next";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import ForgotPassword from "./ForgotPassword";
const Link = Dynamic<any>(() => import("next/link"), { ssr: false });
const Box = Dynamic<any>(() => import("@mui/material/Box"), { ssr: false });
const Stack = Dynamic<any>(() => import("@mui/material/Stack"), { ssr: false });
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {
  ssr: false,
});
const TextField = Dynamic<any>(() => import("@mui/material/TextField"), {
  ssr: false,
});
const Button = Dynamic<any>(() => import("@mui/material/Button"), {
  ssr: false,
});

interface LoginProps {
  settings?: any;
}

export default function Login(props: LoginProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [alertClass, setAlertClass] = React.useState("");
  const [alertMsg, setAlertMsg] = React.useState("\u00a0");
  const [forgotPass, setForgotPass] = React.useState(false);
  const validationSchema = yup.object({
    username: yup
      .string()
      .email(t("Field is invalid"))
      .required(t("Field is required")),
    password: yup.string().required(t("Field is required")),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios({
        url: `${process.env.API}login`,
        headers: { "content-type": "application/json" },
        method: "POST",
        data: values,
      })
        .then((res) => {
          console.log(res);

          if (res.status == 200) {
            setCookie("token", res.data.token);
             location.reload();
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
      {forgotPass ? (
        <ForgotPassword
          settings={{ setForgotPass: setForgotPass }}
        ></ForgotPassword>
      ) : (
        <>
          <Typography variant="subtitle2" component="h2">
            {t("Sign in")}
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
              fullWidth
              size="medium"
              required
              type="email"
              id="username"
              name="username"
              label={t("Email")}
              variant="outlined"
              margin="dense"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={
                (formik.touched.username && formik.errors.username) || "\u00a0"
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
            <Typography
              onClick={() => {
                setForgotPass(true);
              }}
              sx={{
                color: "#3B2EB2",
                textDecoration: "underline",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              {t("Forgot password") + " ?"}
            </Typography>
            <Typography
              variant="body"
              sx={{
                display: "flex",
                gap: "5px",
              }}
              component="p"
            >
              {t("Not registered") + " ?"}
              <Link href={`/${router.locale}/account/registration`}>
                <Typography
                  sx={{
                    color: "#DA9800",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {t("Sign up")}
                </Typography>
              </Link>
            </Typography>
            <Stack spacing={2} direction="row" justifyContent="center">
              <Button
                sx={{ position: "relative" }}
                variant="contained"
                size="large"
                color="secondary"
                type="submit"
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
              >
                {t("Sign in")}
              </Button>
            </Stack>
          </Box>
        </>
      )}
    </>
  );
}
