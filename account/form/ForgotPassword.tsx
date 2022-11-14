import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import * as React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { useFormik } from "formik";

const Layout = Dynamic<any>(() => import("../layout"), {
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
const TwSeo = Dynamic<any>(() => import("../../src/seo/TwSeo"), {
  ssr: false,
});
interface ForgotPasswordProps {
  settings?: any;
}
export default function ForgotPassword(props: ForgotPasswordProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { settings } = props;
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

    return errors;
  };

  const initialFormValues = {
    email: "",
  };
  const formik = useFormik({
    initialValues: initialFormValues,
    validate: validate,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("email", values.email);
       axios({
        url: `${process.env.API}${router.locale}/password`,
        method: "POST",
        data: formData,
      })
        .then((res) => {
          if (res.data.status == 200) {
            setAlertClass("success");
            setAlertMsg(t("Email successfully sent, Check your inbox")+" ! ");
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
      <Typography variant="subtitle2" component="h2">
        {t("Reset your password")}
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
        <Typography
          sx={{ color: "#1E175B", marginBottom: "20px", textAlign: "center" }}
          component="p"
        >
          {t("Enter your email and receive a link to reset your password") +
            "."}
        </Typography>
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
          helperText={(formik.touched.email && formik.errors.email) || "\u00a0"}
        />
        <Typography
          onClick={() => {
            settings.setForgotPass(false);
          }}
          sx={{
            color: "#3B2EB2",
            textDecoration: "underline",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          {t("Go back to sign in page")}
        </Typography>
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
            {t("Send")}
          </Button>
        </Stack>
      </Box>
    </>
  );
}
