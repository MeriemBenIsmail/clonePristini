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
import { useEffect } from "react";

const Layout = Dynamic<any>(() => import("../../../account/layout"), {
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
const TwSeo = Dynamic<any>(() => import("../../../src/seo/TwSeo"), { ssr: false });
const Country = Dynamic<any>(() => import("../../../account/form/country"), {
  ssr: false,
});
const FormHelperText = Dynamic<any>(
  () => import("@mui/material/FormHelperText"),
  {
    ssr: false,
  }
);

const Profile: NextPage = ({ pagedata }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [alertClass, setAlertClass] = React.useState("");
  const [alertMsg, setAlertMsg] = React.useState("\u00a0");

  const validate = (values: any) => {
    const errors: any = {};
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
    civility: pagedata?.profile?.civility || "",
    firstname: pagedata?.profile?.firstname || "",
    lastname: pagedata?.profile?.lastname || "",
    phone: pagedata?.profile?.phone || "",
    city: pagedata?.profile?.city || "",
    country: pagedata?.profile?.country || "",
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
        url: `${process.env.API}${router.locale}/account/profile/edit`,
        headers: { authorization: `Bearer ${token}` },
        method: "POST",
        data: formData,
      })
        .then((res) => {
          if (res.data.status == 200) {
            setAlertClass("success");
            setAlertMsg(t("Profile successfully updated"));
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
          {t("Update your profile")}
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
