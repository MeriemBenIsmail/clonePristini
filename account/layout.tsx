import Dynamic from "next/dynamic";

const Paper = Dynamic<any>(() => import("@mui/material/Paper"), { ssr: false });
const Container = Dynamic<any>(() => import("@mui/material/Container"), {
  ssr: false,
});
const Header = Dynamic(() => import("../front/components/header"), {
  ssr: false,
});
const Footer = Dynamic(() => import("../front/components/footer"), {
  ssr: false,
});

interface LayoutProps {
  pagedata?: any;
  children?: any;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <>
      <Header settings={{ classes: "account", pagedata: props.pagedata }} />
      <Paper variant="main" component="main" className="account">
        <Container maxWidth="lg" className="wrapper">
          {children}
        </Container>
      </Paper>
      <Footer settings={{ classes: "account" }} />
    </>
  );
}
