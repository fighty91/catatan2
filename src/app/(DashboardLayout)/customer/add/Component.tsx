import { Grid } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "./add-customer.css"

type Props = {
  name: string;
  label: string;
  value: string;
  onValueChange: any;
};

export const PhoneInputComponent = ({ name, label, value, onValueChange}: Props) => (

  <Grid size={{ xs: 12, sm: 6 }}>
    <PhoneInput
      value={value}
      inputProps={{
        name: {name},
        required: true,
      }}
      onChange={onValueChange}
      country="id"
      preferredCountries={["id"]}
      enableSearch
      // countryCodeEditable={false}
      enableAreaCodes
      specialLabel={label}
      placeholder={label}
      containerStyle={{
        width: '100%'
      }}
      inputStyle={{
        width: '100%',
        height: '53px', // atau '40px' untuk small
        fontSize: '15px',           // Sedikit mengecilkan font agar kesan "pudar" lebih terasa
        borderColor: 'rgba(0, 0, 0, 0.23)',
        color: 'rgba(0, 0, 0, 0.7)', // Membuat teks input lebih pudar
        // opacity: 0.9                // Alternatif lain untuk memudarkan seluruh elemen input
      }}
      buttonStyle={{
        position: 'absolute'
      }}
      dropdownStyle={{
        maxWidth: '270px',
        zIndex: 1000
      }}
      searchStyle={{
        width: '95%',     // Agar search bar di dalam tidak overflow
        margin: '10px auto'
      }}
    />
  </Grid>
);