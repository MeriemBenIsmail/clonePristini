import Dynamic from "next/dynamic";

const Paper = Dynamic<any>(() => import("@mui/material/Paper"), { ssr: false });
const Header = Dynamic(() => import("./components/header"), { ssr: false });
const Footer = Dynamic(() => import("./components/footer"), { ssr: false });

interface LayoutProps {
  pagedata?: any;
  children?: any;
}

export default function Layout(props: LayoutProps) {
  const { children, pagedata } = props;
  return (
    <>
      <Header settings={{ pagedata: pagedata, theme:"light" }} />
      <Paper variant="main" component="main">
        {children}
      </Paper>
      <Footer />
    </>
  );
}
