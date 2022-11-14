import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { useDropzone } from "react-dropzone";

const Paper = Dynamic<any>(() => import("@mui/material/Paper"), { ssr: false });
const Stack = Dynamic<any>(() => import("@mui/material/Stack"), { ssr: false });
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {
  ssr: false,
});
const ArrowCircleUpIcon = Dynamic<any>(
  () => import("@mui/icons-material/ArrowCircleUp"),
  { ssr: false }
);

interface DZFileProps {
  settings?: any;
}

export default function DZFile(props: DZFileProps) {
  const { t } = useTranslation("common");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const { settings } = props;
  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  return (
    <>
      {!settings?.type && (
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "#1E175B",
            fontWeight: "bold",
          }}
        >
          {settings.label}
        </Typography>
      )}
      <Paper variant="dzfile" {...getRootProps({ className: "dropzone" })}>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <input
            name={settings.name}
            type="file"
            onChange={(e) => {
              settings.handleInputChange(e);
            }}
          />
          <ArrowCircleUpIcon size="large" />
          <Typography variant="body1">
            {t("Déposer des fichiers à joindre, ou")}{" "}
            <span
              style={{
                cursor: "pointer",
              }}
            >
              {t("Parcourir")}
            </span>
          </Typography>
        </Stack>

        {/*<aside><h4>Files</h4><ul>{files}</ul></aside>*/}
      </Paper>
      <p style={{ fontSize: "medium", textAlign: "right", fontWeight: "bold" }}>
        {settings.filename?.name || "No file chosen"}
      </p>
    </>
  );
}
