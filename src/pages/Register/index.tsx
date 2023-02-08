import { createElement, useState } from "react";
import {
  LoginOutlined,
  PersonAddAlt,
  AccountCircle,
  LockOutlined,
  EmailOutlined,
  SubtitlesOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { ContainerRegister, CustomInput, FormContainer, LinkRegister } from "./styles";
import { addMonths } from "date-fns";

export function Register() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <ContainerRegister>
      <header>
        <PersonAddAlt />
        <strong>Registre-se</strong>
        <span>Informe seus dados</span>
      </header>
      <FormContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Sobrenome"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <TextField
          type="email"
          id="outlined-basic"
          label="Email"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <EmailOutlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type="password"
          id="outlined-basic"
          label="Senha"
          variant="outlined"
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <LockOutlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="outlined-basic"
          label="CPF"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SubtitlesOutlined />
              </InputAdornment>
            ),
          }}
        />
        <FormControl>
          <InputLabel id="gender">Sexo</InputLabel>
          <Select labelId="gender" label="Sexo">
            <MenuItem value="sexo 1">Masculino</MenuItem>
            <MenuItem value="sexo 2">Feminino</MenuItem>
          </Select>
        </FormControl>
        <Grid>
          <DatePicker
            selected={date}
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            showMonthDropdown
            showYearDropdown
            closeOnScroll
            maxDate={addMonths(new Date(), 6)}
            dropdownMode="select"
            placeholderText="Data de nascimento"
            customInput={createElement(CustomInput)}
            onChange={(date) => setDate(date)}
            yearItemNumber={9}
          />
        </Grid>
        <TextField
          id="outlined-basic"
          label="CEP"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        />
        <TextField id="outlined-basic" label="Logradouro" variant="outlined" />
        <TextField id="outlined-basic" label="Bairro" variant="outlined" />
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField id="outlined-basic" label="Localidade" variant="outlined" />
          </Grid>
          <Grid item xs={5}>
            <TextField id="outlined-basic" label="UF" variant="outlined" />
          </Grid>
        </Grid>
        <TextField id="outlined-basic" label="Complemento" variant="outlined" />
        <Button type="submit" variant="contained">
          Registrar
          <PersonAddAlt />
        </Button>
      </FormContainer>
      <span>
        Já possui uma conta? <LinkRegister to="/">Entrar</LinkRegister>
      </span>
    </ContainerRegister>
  );
}
