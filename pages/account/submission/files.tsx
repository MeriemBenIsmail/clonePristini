import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import * as React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import { useFormik } from "formik";
const FileField = Dynamic<any>(
  () => import("../../../account/form/FileField"),
  {
    ssr: false,
  }
);
const Layout = Dynamic<any>(() => import("../../../account/layout"), {
  ssr: false,
});
const ArrowForwardSharpIcon = Dynamic<any>(
  () => import("@mui/icons-material/ArrowForwardSharp"),
  { ssr: false }
);
const Stepper = Dynamic<any>(() => import("../../../account/Stepper"), {
  ssr: false,
});
const Stack = Dynamic<any>(() => import("@mui/material/Stack"), { ssr: false });
const Box = Dynamic<any>(() => import("@mui/material/Box"), { ssr: false });
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {
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
const DZFile = Dynamic<any>(() => import("../../../account/form/dzfile"), {
  ssr: false,
});
const FormHelperText = Dynamic<any>(
  () => import("@mui/material/FormHelperText"),
  {
    ssr: false,
  }
);
const Files: NextPage = ({ pagedata }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [alertClass, setAlertClass] = React.useState("");
  const [alertMsg, setAlertMsg] = React.useState("");
  const [cinFile, setCinFile] = React.useState("");
  const changeCinHandler = (e: any) => {
    setCinFile(e.target.files[0]);
  };
  const [cvFile, setCvFile] = React.useState("");
  const changeCvHandler = (e: any) => {
    setCvFile(e.target.files[0]);
  };
  const [diplomaFile, setDiplomaFile] = React.useState("");
  const changeDiplomaHandler = (e: any) => {
    setDiplomaFile(e.target.files[0]);
  };
  const [rnFile, setRnFile] = React.useState("");
  const changeRnHandler = (e: any) => {
    setRnFile(e.target.files[0]);
  };
  const initialFormValues = {
    cinFile: cinFile,
    cvFile: cvFile,
    rnFile: rnFile,
    diplomaFile: diplomaFile,
  };
  const validate = (values: any) => {
    const errors: any = {};
    if (!cinFile) {
      errors.cinFile = t("Field is required");
    }
    if (!cvFile) {
      errors.cvFile = t("Field is required");
    }
    if (!rnFile) {
      errors.rnFile = t("Field is required");
    }
    if (!diplomaFile) {
      errors.diplomaFile = t("Field is required");
    }
    return errors;
  };

  const formik = useFormik({
    validate: validate,
    initialValues: initialFormValues,
    onSubmit: async () => {
      setAlertClass("");
      setAlertMsg("");
      const formData = new FormData();
      formData.append("cin", cinFile);
      formData.append("cv", cvFile);
      formData.append("diplome", diplomaFile);
      formData.append("rn", rnFile);
      if (!(cinFile && cvFile && diplomaFile && rnFile)) {
        setAlertClass("error");
        setAlertMsg(t("Veuillez ajouter tous les fichiers."));
        window.scrollTo(0, 0);
        return false;
      }
      const token = getCookie("token");
      axios({
        url: `${process.env.API}${router.locale}/account/submissions/files`,
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
    },
  });

  return (
    <>
      {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
      <Layout pagedata={pagedata}>
        {!pagedata?.profile && <Login />}
        {pagedata?.profile && (
          <>
            <Stepper settings={{ active: 1 }}></Stepper>
            <Typography variant="subtitle2" component="h2">
              {t("Files submissions")}
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
                    setAlertClass("");
                  }}
                >
                  x
                </span>
              </Box>
              <FileField
                formik={formik}
                name="cin"
                settings={{
                  name: "cin",
                  label: t("CIN"),
                  filename: cinFile,
                  handleInputChange: changeCinHandler,
                }}
              ></FileField>
              <FormHelperText
                sx={{
                  textAlign: "right",
                  fontSize: "max(1.2vw,15px)",
                  color: "#d32f2f",
                }}
              >
                {(formik.touched.cinFile && formik.errors.cinFile) || "\u00a0"}
              </FormHelperText>
              <FileField
                formik={formik}
                name="cv"
                settings={{
                  name: "cv",
                  label: t("CV"),
                  filename: cvFile,
                  handleInputChange: changeCvHandler,
                }}
              ></FileField>
              <FormHelperText
                sx={{
                  textAlign: "right",
                  fontSize: "max(1.2vw,15px)",
                  color: "#d32f2f",
                }}
              >
                {(formik.touched.cvFile && formik.errors.cvFile) || "\u00a0"}
              </FormHelperText>
              <FileField
                formik={formik}
                name="diploma"
                settings={{
                  name: "diplome",
                  label: t("Diploma"),
                  filename: diplomaFile,
                  handleInputChange: changeDiplomaHandler,
                }}
              ></FileField>
              <FormHelperText
                sx={{
                  textAlign: "right",
                  fontSize: "max(1.2vw,15px)",
                  color: "#d32f2f",
                }}
              >
                {(formik.touched.diplomaFile && formik.errors.diplomaFile) ||
                  "\u00a0"}
              </FormHelperText>
              <FileField
                formik={formik}
                name="rn"
                settings={{
                  name: "rn",
                  label: t("Transcript of grades"),
                  filename: rnFile,
                  handleInputChange: changeRnHandler,
                }}
              ></FileField>

              <FormHelperText
                sx={{
                  textAlign: "right",
                  fontSize: "max(1.2vw,15px)",
                  color: "#d32f2f",
                }}
              >
                {(formik.touched.rnFile && formik.errors.rnFile) || "\u00a0"}
              </FormHelperText>
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
  if (!pagedata?.folder)
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

export default Files;
