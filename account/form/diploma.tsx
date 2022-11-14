import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { useGetDiplomasQuery } from "../../src/api/diplomas";
import { useEffect } from "react";
import React from "react";

const FormHelperText = Dynamic<any>(
  () => import("@mui/material/FormHelperText"),
  {
    ssr: false,
  }
);
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
const Typography = Dynamic(() => import("@mui/material/Typography"), {
  ssr: false,
});

interface DiplomaProps {
  settings?: any;
}

export default function Diploma(props: DiplomaProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { settings } = props;
  const { data } = useGetDiplomasQuery({ culture: router.locale });

  const [allItems, setAllItems] = React.useState([]);

  useEffect(() => {
    if (data) {
      let newArray: any = [];
      Object.values(data.items).map((item: any) => {
        if (item.programs.length !== 0) {
          let newItem = { ...item, type: "item" };
          newArray.push(newItem);
          Object.values(item.programs).map((program: any) => {
            let newProgram = { ...program, type: "program" };
            newArray.push(newProgram);
          });
        }
      });
      setAllItems(newArray);
    }
  }, [data]);
  return (
    <>
      {data && (
        <FormControl fullWidth size="medium" margin="dense">
          <InputLabel
            sx={{
              color: `${
                settings?.formik.touched.program &&
                settings?.formik.errors.program
                  ? "#d32f2f"
                  : ""
              }`,
            }}
            id="program-label"
          >
            {t("Diploma")}
          </InputLabel>
          <Select
            required
            labelId="program-label"
            id="program"
            label={t("Diploma")}
            name="program"
            value={settings?.formik?.values?.program}
            onChange={settings?.formik?.handleChange}
            margin="dense"
            error={
              settings?.formik.touched.program &&
              Boolean(settings?.formik.errors.program)
            }
          >
            {allItems &&
              allItems.map((element: any, index: any) =>
                element.type === "item" ? (
                  <MenuItem
                    key={index}
                    value={""}
                    style={{ PointerEvents: "none", backgroundColor: "#fff" }}
                  >
                    <Typography variant="h6" color="#1E175B">
                      {element.label}
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={index} value={element.id}>
                    {element.label}
                  </MenuItem>
                )
              )}
          </Select>
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {(settings?.formik.touched.program &&
              settings?.formik.errors.program) ||
              "\u00a0"}
          </FormHelperText>
        </FormControl>
      )}
    </>
  );
}
