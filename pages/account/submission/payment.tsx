import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import * as React from "react";
import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import { useFormik } from "formik";

import icon1 from "../../../public/images/front/01.svg";

import icon2 from "../../../public/images/front/04.svg";

import icon3 from "../../../public/images/front/03.svg";

import icon4 from "../../../public/images/front/02.svg";

const Layout = Dynamic<any>(() => import("../../../account/layout"), {
  ssr: false,
});
const FileField = Dynamic<any>(
  () => import("../../../account/form/FileField"),
  {
    ssr: false,
  }
);

const Stepper = Dynamic<any>(() => import("../../../account/Stepper"), {
  ssr: false,
});

const ArrowForwardSharpIcon = Dynamic<any>(
  () => import("@mui/icons-material/ArrowForwardSharp"),
  { ssr: false }
);
const FormHelperText = Dynamic<any>(
  () => import("@mui/material/FormHelperText"),
  {
    ssr: false,
  }
);
const Image = Dynamic(() => import("next/image"), { ssr: false });
const Stack = Dynamic<any>(() => import("@mui/material/Stack"), { ssr: false });
const Box = Dynamic<any>(() => import("@mui/material/Box"), { ssr: false });
const Grid = Dynamic<any>(() => import("@mui/material/Grid"), { ssr: false });
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {
  ssr: false,
});
const TextField = Dynamic<any>(() => import("@mui/material/TextField"), {
  ssr: false,
});
const FormControl = Dynamic<any>(() => import("@mui/material/FormControl"), {
  ssr: false,
});
const FormLabel = Dynamic<any>(() => import("@mui/material/FormLabel"), {
  ssr: false,
});
const RadioGroup = Dynamic<any>(() => import("@mui/material/RadioGroup"), {
  ssr: false,
});
const FormControlLabel = Dynamic<any>(
  () => import("@mui/material/FormControlLabel"),
  { ssr: false }
);
const Radio = Dynamic<any>(() => import("@mui/material/Radio"), { ssr: false });
const Button = Dynamic<any>(() => import("@mui/material/Button"), {
  ssr: false,
});
const TwSeo = Dynamic<any>(() => import("../../../src/seo/TwSeo"), {
  ssr: false,
});
const Login = Dynamic<any>(() => import("../../../account/form/login"), {
  ssr: false,
});


const Payment: NextPage = ({ pagedata }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [proofFile, setProofFile] = React.useState("");
  const defaultValues = { type: "", mode: "", other: "", proofFile: proofFile };
  const [otherActive, setOtherActive] = React.useState(false);
  const [bankTransferActive, setBankTransferActive] = React.useState(false);
  const changeProofHandler = (e: any) => {
    setProofFile(e.target.files[0]);
  };
  const [alertClass, setAlertClass] = React.useState("");
  const [alertMsg, setAlertMsg] = React.useState("");
  const initialFormValues = defaultValues;
  const validate = (values: any) => {
    const errors: any = {};
    if (!values.type) {
      errors.type = t("Payment type is required");
    }
    if (!values.mode) {
      errors.mode = t("Payment mode is required");
    }
    if (!proofFile) {
      errors.proofFile = t("Proof file is required");
    }
    if (otherActive && !values.other) {
      errors.other = t("Other mode is required");
    }
    return errors;
  };

  const formik = useFormik({
    validate: validate,
    initialValues: initialFormValues,
    onSubmit: async (values) => {
      values.proofFile = proofFile;
      if (!otherActive) values.other = "";
      setAlertClass("");
      setAlertMsg("");
      const formData = new FormData();
      formData.append("proof", proofFile);
      formData.append("other", values.other);
      formData.append("mode", values.mode);
      formData.append("type", values.type);
      const token = getCookie("token");
      axios({
        url: `${process.env.API}${router.locale}/account/submissions/payment`,
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
  const modeChangeHandler = (e: any) => {
    if (e.target.value == 4) {
      setOtherActive(true);
      setBankTransferActive(false);
    } else if (e.target.value == 3) {
      setBankTransferActive(true);
      setOtherActive(false);
    } else {
      setOtherActive(false);
      setBankTransferActive(false);
    }
    formik.handleChange(e);
  };

  return (
    <>
      {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
      <Layout pagedata={pagedata}>
        {!pagedata?.profile && <Login />}
        {pagedata?.profile && (
          <>
            <Stepper settings={{ active: 3 }}></Stepper>
            <Typography variant="subtitle2" component="h2">
              {t("Payment")}
            </Typography>
            <Grid
              container
              justifyContent="center"
              component="div"
              maxWidth="md"
              margin="auto"
              spacing={2}
              className="detailsPayment"
            >
              <Grid item md={7}>
                <Typography variant="body1">
                  {t(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  )}
                </Typography>
              </Grid>
              <Grid item md={4} className="amount">
                1400.000<sup style={{ fontWeight: "300" }}>DT</sup>
              </Grid>
            </Grid>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
              id="form"
            >
              <Box maxWidth="sm" margin="auto">
                <Box id="alert" className={`alert ${alertClass}`}>
                  {alertMsg}
                </Box>
                <FormControl
                  sx={{
                    marginBottom: "5px !important",
                  }}
                  className="paymentOptions"
                >
                  <Typography
                    sx={{
                      color: "#1E175B",
                      fontWeight: "bold",
                      paddingBottom: "20px",
                    }}
                    variant="h6"
                    component="h2"
                  >
                    {t("Payment options")}:
                  </Typography>
                  <RadioGroup
                    value={formik.values.type}
                    onChange={formik.handleChange}
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    row
                    aria-labelledby=""
                    name="type"
                    spacing="4"
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label={t("Annual")}
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label={t("Semester")}
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label={t("Quarterly")}
                    />
                  </RadioGroup>
                  <FormHelperText sx={{ color: "#d32f2f", marginTop: "15px" }}>
                    {(formik.touched.type && formik.errors.type) || "\u00a0"}
                  </FormHelperText>
                </FormControl>
                <Box
                  className="paymentModes"
                  sx={{
                    marginBottom: "0 !important",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#1E175B",
                      fontWeight: "bold",
                      paddingBottom: "20px",
                    }}
                    variant="h6"
                    component="h2"
                  >
                    {t("Payment modes")}:
                  </Typography>
                  <RadioGroup
                    value={formik.values.mode}
                    onChange={modeChangeHandler}
                    error={formik.touched.mode && Boolean(formik.errors.mode)}
                    row
                    aria-labelledby=""
                    name="mode"
                    spacing="4"
                  >
                    <Grid display="flex" flexDirection="column" gap="20px">
                      <Grid className="doubleGrid">
                        <Grid item md={6}>
                          <Stack
                            sx={{
                              padding:
                              
                              "20px",
                              background: "#F7F7F7 0% 0% no-repeat padding-box",
                              boxShadow: "0px 3px 6px #0000001C",
                              border: "1px solid #E7EBF0",
                              borderRadius: "4px",
                            }}
                            display="grid"
                            gridTemplateColumns="0.3fr 1fr "
                            className="paymentMode"
                          >
                            <Image
                              src={icon2}
                              alt={""}
                              layout="fixed"
                              width={50}
                              height={50}
                            />
                            <FormControlLabel
                              className="classes"
                              labelPlacement="start"
                              value="1"
                              name="mode"
                              control={<Radio />}
                              label={t("Bank card")}
                            />
                          </Stack>
                        </Grid>
                        <Grid item md={6}>
                          <div>
                            <Stack
                              sx={{
                                padding: "20px",
                                background:
                                  "#F7F7F7 0% 0% no-repeat padding-box",
                                boxShadow: "0px 3px 6px #0000001C",
                                border: "1px solid #E7EBF0",
                                borderRadius: "4px",
                              }}
                              display="grid"
                              gridTemplateColumns="0.3fr 1fr "
                              className="paymentMode"
                            >
                              <Image
                                src={icon1}
                                alt={""}
                                layout="fixed"
                                width={50}
                                height={50}
                              />
                              <FormControlLabel
                                name="mode"
                                labelPlacement="start"
                                value="2"
                                control={<Radio />}
                                label={t("Check")}
                              />
                            </Stack>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid className="doubleGrid">
                        <Grid item md={6}>
                          <Stack
                            sx={{
                              padding: "20px",
                              background: "#F7F7F7 0% 0% no-repeat padding-box",
                              boxShadow: "0px 3px 6px #0000001C",
                              border: "1px solid #E7EBF0",
                              borderRadius: "4px",
                            }}
                            className="paymentMode"
                            display="grid"
                            gridTemplateColumns="0.3fr 1fr "
                          >
                            <Image
                              src={icon4}
                              alt={""}
                              layout="fixed"
                              width={50}
                              height={50}
                            />
                            <FormControlLabel
                              labelPlacement="start"
                              value="3"
                              name="mode"
                              control={<Radio />}
                              label={t("Bank transfer")}
                            />
                          </Stack>
                        </Grid>
                        <Grid item md={6}>
                          <Stack
                            sx={{
                              padding: "20px",
                              background: "#F7F7F7 0% 0% no-repeat padding-box",
                              boxShadow: "0px 3px 6px #0000001C",
                              border: "1px solid #E7EBF0",
                              borderRadius: "4px",
                            }}
                            className="paymentMode"
                            display="grid"
                            gridTemplateColumns="0.3fr 1fr "
                          >
                            <Image
                              src={icon3}
                              alt={""}
                              layout="fixed"
                              width={50}
                              height={50}
                            />
                            <FormControlLabel
                              labelPlacement="start"
                              name="mode"
                              value="4"
                              control={<Radio />}
                              label={t("Others")}
                            />
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  </RadioGroup>
                  <FormHelperText sx={{ color: "#d32f2f", marginTop: "15px" }}>
                    {(formik.touched.mode && formik.errors.mode) || "\u00a0"}
                  </FormHelperText>
                </Box>
              </Box>
              {otherActive && (
                <Box maxWidth="sm" margin="auto">
                  <Typography
                    sx={{
                      color: "#1E175B",
                      fontWeight: "bold",
                      paddingBottom: "20px",
                    }}
                    variant="h6"
                    component="h2"
                  >
                    {t("Other payment modes")}:
                  </Typography>
                  <TextField
                    fullWidth
                    size="medium"
                    required
                    id="other"
                    name="other"
                    label={t("Other")}
                    variant="outlined"
                    margin="dense"
                    value={formik.values.other}
                    onChange={formik.handleChange}
                    error={formik.touched.other && Boolean(formik.errors.other)}
                    helperText={
                      (formik.touched.other && formik.errors.other) || "\u00a0"
                    }
                  />
                </Box>
              )}
              {bankTransferActive && (
                <>
                  <Typography
                    sx={{
                      color: "#1E175B",
                      fontWeight: "bold",
                      paddingBottom: "20px",
                    }}
                    variant="h6"
                    component="h2"
                  >
                    {t("Bank Informations")}:
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xl={3} md={3} xs={12}>
                      <Typography sx={{ color: "#da9800", fontWeight: "bold" }}>
                        {t("Bank")}
                      </Typography>
                      <Box
                        marginTop="20px"
                        display="flex"
                        flexDirection="column"
                        gap="10px"
                      >
                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("BIAT")}
                        </Typography>

                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("BTK")}
                        </Typography>

                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("UIB")}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xl={3} md={3} xs={12}>
                      <Typography sx={{ color: "#da9800", fontWeight: "bold" }}>
                        {t("RIB")}
                      </Typography>
                      <Box
                        marginTop="20px"
                        display="flex"
                        flexDirection="column"
                        gap="10px"
                      >
                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("0000000000")}
                        </Typography>

                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("0000000000")}
                        </Typography>

                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("0000000000")}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xl={3} md={3} xs={12}>
                      <Typography sx={{ color: "#da9800", fontWeight: "bold" }}>
                        {t("IBan")}
                      </Typography>
                      <Box
                        marginTop="20px"
                        display="flex"
                        flexDirection="column"
                        gap="10px"
                      >
                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("TN5533333333")}
                        </Typography>

                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("TN5533333333")}
                        </Typography>

                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("TN5533333333")}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xl={3} md={3} xs={12}>
                      <Typography sx={{ color: "#da9800", fontWeight: "bold" }}>
                        {t("Devise")}
                      </Typography>
                      <Box
                        marginTop="20px"
                        display="flex"
                        flexDirection="column"
                        gap="10px"
                      >
                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("TND")}
                        </Typography>

                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("TND")}
                        </Typography>

                        <Typography
                          sx={{
                            backgroundColor: "#F2F2F2 ",
                            border: "2px solid #F1F4F7",
                            borderRadius: "10px",
                            fontWeight: "600",
                            padding: "10px",
                          }}
                        >
                          {t("TND")}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}

              <Typography
                sx={{
                  color: "#1E175B",
                  fontWeight: "bold",
                  marginTop: "20px",
                  paddingBottom: "20px",
                }}
                variant="h6"
                component="h2"
              >
                {t("Payment proof")}:
              </Typography>
              <FileField
                formik={formik}
                settings={{
                  name: "proof",
                  label: t("Proof of payment"),
                  type: 2,
                  filename: proofFile,
                  handleInputChange: changeProofHandler,
                }}
              ></FileField>
              <FormHelperText sx={{ color: "#d32f2f" }}>
                {(formik.touched.proofFile && formik.errors.proofFile) ||
                  "\u00a0"}
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

    if(!pagedata?.folder) return {redirect:{permanent:false,destination:`/${ctx.locale}/account/submission`}}
    if(pagedata?.folder && pagedata?.folder?.step==1) return {redirect:{permanent:false,destination:`/${ctx.locale}/account/submission`}}
    if(pagedata?.folder && pagedata?.folder?.step==2) return {redirect:{permanent:false,destination:`/${ctx.locale}/account/submission/status`}}
    if(pagedata?.folder && pagedata?.folder?.step==3) return {redirect:{permanent:false,destination:`/${ctx.locale}/account/submission/interview`}}
    if(pagedata?.folder && pagedata?.folder?.step==4) return {redirect:{permanent:false,destination:`/${ctx.locale}/account/submission/status`}}
    if(pagedata?.folder && pagedata?.folder?.step==6) return {redirect:{permanent:false,destination:`/${ctx.locale}/account/submission/status`}}
    if(pagedata?.folder && pagedata?.folder?.step==7) return {redirect:{permanent:false,destination:`/${ctx.locale}/account/submission/test`}}
    if(pagedata?.folder && pagedata?.folder?.step==8) return {redirect:{permanent:false,destination:`/${ctx.locale}/account/submission/status`}}
    return {props:{pagedata}}
  }
  
  

export default Payment;
