import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import * as React from "react";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import Layout from "../../../account/layout";

const Stepper = Dynamic<any>(() => import("../../../account/Stepper"), {
  ssr: false,
});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {
  ssr: false,
});

const TwSeo = Dynamic<any>(() => import("../../../src/seo/TwSeo"), {
  ssr: false,
});
const Login = Dynamic<any>(() => import("../../../account/form/login"), {
  ssr: false,
});
const Status: NextPage = ({ pagedata }: any) => {
  const { t } = useTranslation("common");
  let activeStep = pagedata?.folder?.step / 2;
  const messages = [
    t(""),
    t("Your file has been successfully submitted to our administration"),
    t("Thank you for selecting a date for the conversation"),
    t("Your proof of payment is received"),
    ,
    t("Thank you for selecting a date to take the test"),
  ];

  const subMessages = [
    t(""),
    t("Awaiting verification"),
    t("Awaiting confirmation"),
    t("Awaiting validation"),
    t("Awaiting confirmation"),
  ];
  return (
    <>
      {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
      <Layout pagedata={pagedata}>
        {!pagedata?.profile && <Login />}
        {pagedata?.profile && (
          <>
            <Stepper settings={{ active: activeStep }}></Stepper>
            <Typography variant="subtitle2" component="h2">
              {t("Submission status")}
            </Typography>
            <div
              style={{
                padding: "10px",
                paddingBottom: 0,
                display: "flex",
                flexDirection: "column",
                width: "70%",
                margin: "auto",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  width: "80%",
                  color: "#1E175B",
                  fontSize: "medium",
                  textAlign: "center",
                  lineHeight: "30px",
                  margin: "auto",
                  marginBottom: " 30px",
                }}
              >
                {messages[activeStep]}
              </p>
              <p
                style={{
                  width: "80%",
                  color: "#1E175B",
                  fontSize: "medium",
                  textAlign: "center",
                  lineHeight: "30px",
                  margin: "auto",
                  marginBottom: " 30px",
                }}
              >
                {subMessages[activeStep]+" ..."}
              </p>
            </div>
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
  if (pagedata?.folder && pagedata?.folder?.step == 3)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission/interview`,
      },
    };
  if (pagedata?.folder && pagedata?.folder?.step == 5)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission/payment`,
      },
    };
  if (pagedata?.folder && pagedata?.folder?.step == 7)
    return {
      redirect: {
        permanent: false,
        destination: `/${ctx.locale}/account/submission/test`,
      },
    };
  return { props: { pagedata } };
}

export default Status;
