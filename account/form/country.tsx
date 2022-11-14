import { useRouter } from "next/router";
import Dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import { useGetCountriesQuery } from "../../src/api/countries";

const FormControl = Dynamic<any>(() => import("@mui/material/FormControl"), {
  ssr: false,
});
const FormHelperText = Dynamic<any>(
  () => import("@mui/material/FormHelperText"),
  {
    ssr: false,
  }
);
const InputLabel = Dynamic<any>(() => import("@mui/material/InputLabel"), {
  ssr: false,
});
const Select = Dynamic<any>(() => import("@mui/material/Select"), {
  ssr: false,
});
const MenuItem = Dynamic<any>(() => import("@mui/material/MenuItem"), {
  ssr: false,
});

interface CountryProps {
  settings?: any;
}

export default function Country(props: CountryProps) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { settings } = props;
  const { data } = useGetCountriesQuery({ culture: router.locale });
  return (
    <>
      {data && (
        <FormControl fullWidth size="medium" margin="dense">
          <InputLabel
            sx={{
              color: `${
                settings.formik.touched.country &&
                settings.formik.errors.country
                  ? "#d32f2f"
                  : ""
              }`,
            }}
            id="country-label"
          >
            {t("Country")}
          </InputLabel>
          <Select
            required
            labelId="country-label"
            id="diploma"
            label={t("Country")}
            name="country"
            value={settings.formik.values.country}
            onChange={settings.formik.handleChange}
            error={
              settings.formik.touched.country &&
              Boolean(settings.formik.errors.country)
            }
            margin="dense"
          >
            {data.items &&
              data.items.map((item: any, index: any) => (
                <MenuItem key={index} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
          </Select>
          <FormHelperText sx={{ color: "#d32f2f" }}>
            {(settings.formik.touched.country &&
              settings.formik.errors.country) ||
              "\u00a0"}
          </FormHelperText>
        </FormControl>
      )}
    </>
  );
}
