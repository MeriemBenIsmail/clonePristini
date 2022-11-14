import { useState, useRef } from "react";
import classes from "./FileField.module.css";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";

const ArrowCircleUpIcon = Dynamic<any>(
  () => import("@mui/icons-material/ArrowCircleUp"),
  { ssr: false }
);
const Typography = Dynamic<any>(() => import("@mui/material/Typography"), {
  ssr: false,
});
interface FielFieldProps {
  settings?: any;
}
export default function FileField(props: FielFieldProps) {
  const [fileName, setFileName] = useState("Aucun fichier choisi");
  const [clickable, setClickable] = useState(false);
  const { settings } = props;
  const { t } = useTranslation("common");

  const fileInput: any = useRef(null);
  const button = useRef(null);
  const onChange = (e: any) => {
    if (e.target.files.length !== 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(t("No file chosen"));
    }
    props.settings.handleInputChange(e);
  };
  return (
    <div className={classes.fileField}>
      {!settings?.type && (
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: "#1E175B",
            fontWeight: "bold",
            paddingBottom: "10px",
          }}
        >
          {settings.label}
        </Typography>
      )}
      <div className={classes.field}>
        <div className={classes.content}>
          <ArrowCircleUpIcon size="large" />
          <p style={{ paddingLeft: "10px" }} className={classes.note}>
            {t("Drop files to add or")+" "}
          </p>
          <p
            className={classes.button}
            ref={button}
            onMouseOver={() => {
              setClickable(true);
            }}
            onTouchStart={() => {
              setClickable(true);
            }}
            onClick={() => {
              fileInput.current.click();
            }}
          >
            {t("Upload")}
          </p>
        </div>
        <div className={classes.fakeFieldBorder}>
          <input
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*,application/pdf"
            name={props.settings.name}
            ref={fileInput}
            onClick={(e) => {
              if (!clickable) {
                e.preventDefault();
              }
              setClickable(false);
            }}
            className={classes.fakeFileField}
            type="file"
            required={false}
            onChange={onChange}
          />
        </div>
      </div>
      <p className={classes.fileName}>{fileName}</p>
    </div>
  );
}
