import classes from "./Stepper.module.css";
import useTranslation from "next-translate/useTranslation";
 import Dynamic from "next/dynamic";
const CheckIcon = Dynamic<any>(
  () => import("@mui/icons-material/Check"),
  { ssr: false }
);
interface StepperProps {
  settings?: any;
}

export default function Stepper(props: StepperProps) {
  const { settings } = props;
  const { t } = useTranslation("common");

  const steps = [
    t("General informations"),
    t("Files submissions"),
    t("Interview appointment"),
    t("Payment"),
    t("Test")
  ];
  let columns = "";
  steps.forEach(() => {
    columns += " 1fr";
  });
  return (
    <div className={classes.stepperContainer}>
      <div
        className={classes.stepper}
        style={{
          gridTemplateColumns: columns,
        }}
      >
        {steps.map((step, index) => {
          return (
            <div
              key={index}
              className={`${classes.step}   ${
                settings.active === index ? classes.active : ""
              } ${index < settings.active ? classes.done : ""}`}
            >
              <div
                className={`${classes.line} ${
                  index === 0 ? classes.hidden : ""
                }`}
              ></div>
              <div className={classes.circle}>
                {settings.active === index ? (
                  <div className={classes.innerCircle}></div>
                ) : (
                  ""
                )}
                {settings.active > index ? (
                  <CheckIcon sx={{ color: "#fff", width:"15px" }} />
                ) : (
                  ""
                )}
              </div>
              <div
                className={`${classes.line} ${
                  index === steps.length - 1 ? classes.hidden : ""
                } ${index + 1 <= settings.active ? classes.colored : ""}`}
              ></div>
            </div>
          );
        })}
      </div>
      <div
        className={classes.titles}
        style={{
          gridTemplateColumns: columns,
        }}
      >
        {steps.map((step, index) => {
          return (
            <p
              key={index}
              className={`${
                index < settings.active ? classes.coloredText : ""
              }`}
            >
              {step}
            </p>
          );
        })}
      </div>
    </div>
  );
}
