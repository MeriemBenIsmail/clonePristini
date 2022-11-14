import type { NextPage } from "next";
import { GetServerSidePropsContext } from "next";
import * as React from "react";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { getCookie, deleteCookie } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
const Layout = Dynamic<any>(() => import("../../front/layout"), {
  ssr: false,
});
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {
  ssr: false,
});
const PageHeader = Dynamic(() => import("../../front/slides/pageHeader"), {
  ssr: false,
});
const Button = Dynamic<any>(() => import("@mui/material/Button"), {
  ssr: false,
});
const ArrowForwardSharpIcon = Dynamic<any>(
  () => import("@mui/icons-material/ArrowForwardSharp"),
  { ssr: false }
);
const Paper = Dynamic<any>(() => import("@mui/material/Paper"), {
  ssr: false,
});
const Grid = Dynamic<any>(() => import("@mui/material/Grid"), {
  ssr: false,
});

const TwSeo = Dynamic<any>(() => import("../../src/seo/TwSeo"), {
  ssr: false,
});
const Login = Dynamic<any>(() => import("../../account/form/login"), {
  ssr: false,
});
const Dashboard: NextPage = ({ pagedata }: any) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  return (
    <>
      {pagedata?.seo && <TwSeo seo={pagedata.seo} />}
      <Layout pagedata={pagedata}>
        <PageHeader
          settings={{
            title: t("online admission"),
            src: "/images/front/dashboard.png",
            height: 500,
            width: 2000,
          }}
        />
        {!pagedata?.profile && (
          <Paper variant="section">
            <Login />
          </Paper>
        )}
        {pagedata?.profile && (
          <Paper variant="block2" className="trainings">
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <Grid item xl={5} md={5} xs={12}>
                <Typography
                  sx={{
                    color: "#2F2589",
                    fontWeight: "500",
                    fontSize: "max(1vw,20px)",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna .
                </Typography>
                <Button
                  onClick={() => {
                    if (!pagedata?.folder) {
                      router.push(`/${router.locale}/account/submission`);
                    } else {
                      let steps = [
                        "files",
                        "status",
                        "interview",
                        "status",
                        "payment",
                        "status",
                        "test",
                        "status",
                      ];
                      router.push(
                        `/${router.locale}/account/submission/${
                          steps[pagedata?.folder?.step - 1]
                        }`
                      );
                    }
                  }}
                  sx={{ position: "relative", paddingRight: "20px" }}
                  endIcon={
                    <ArrowForwardSharpIcon
                      sx={{
                        position: "absolute",
                        right: "10px",
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
                  {pagedata?.folder
                    ? t("view inscription")
                    : t("new inscription")}
                </Button>
              </Grid>
              <Grid item xl={5} md={5} xs={12}>
                <Typography
                  sx={{
                    color: "#2F2589",
                    fontWeight: "500",
                    fontSize: "max(1vw,20px)",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna .
                </Typography>
                <Button
                  onClick={() => {
                    router.push(`/${router.locale}/account/history`);
                  }}
                  sx={{ position: "relative", paddingRight: "20px" }}
                  endIcon={
                    <ArrowForwardSharpIcon
                      sx={{
                        position: "absolute",
                        right: "10px",
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
                  {t("view my history")}
                </Button>
              </Grid>
            </Grid>
          </Paper>
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
      console.log("dashboard", result);
      if (result.data.status == 200) {
        pagedata = result.data;
      } else {
        //deleteCookie("token", { req, res });
      }
    })
    .catch((error) => {
      // deleteCookie("token", { req, res });
      console.log(error);
    });

  return { props: { pagedata } };
}

export default Dashboard;
