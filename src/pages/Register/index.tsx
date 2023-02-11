import { createElement, useEffect, useState } from "react";
import { PersonAddAlt, LockOutlined, EmailOutlined, SearchOutlined } from "@mui/icons-material";
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
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { cpf } from "cpf-cnpj-validator";
import { mask } from "@/utils/mask";

interface RegisterFormData {
  cep: string;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  sexo: string;
  dt_nascimento: Date;
  logradouro: string;
  bairro: string;
  cidade: string;
  complemento?: string;
  estado: string;
}

export function Register() {
  const [existsCep, setExistsCep] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<RegisterFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [cepWatch, cpfWatch] = watch(["cep", "cpf"]);

  async function onSubmit(data: any) {
    // TODO - Formatar a data ao enviar
    console.log(data);
  }

  async function getCEPInformation() {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cepWatch}/json`);
    return data;
  }

  useEffect(() => {
    if (cepWatch && cepWatch.length === 9) {
      const cep = async () => {
        const { localidade, uf, logradouro, bairro } = await getCEPInformation();
        const formatedCEP = {
          bairro,
          logradouro,
          cidade: localidade,
          estado: uf,
        };
        setExistsCep(!!formatedCEP);
        reset(formatedCEP);
      };
      cep();
    }
  }, [cepWatch]);

  useEffect(() => {
    if (cpfWatch) {
      const isValid = cpf.isValid(cpfWatch);
      if (!isValid) {
        setError("cpf", { message: "CPF Inválido" });
      } else {
        clearErrors("cpf");
      }
    }
  }, [cpfWatch]);

  return (
    <ContainerRegister>
      <header>
        <PersonAddAlt />
        <strong>Registre-se</strong>
        <span>Informe seus dados</span>
      </header>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField {...register("nome")} label="Nome" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField {...register("sobrenome")} label="Sobrenome" variant="outlined" />
          </Grid>
        </Grid>
        <TextField
          {...register("email")}
          type="email"
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
          {...register("senha")}
          type="password"
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
        <Controller
          control={control}
          name="cpf"
          render={({ field: { onChange, value } }) => (
            <TextField
              onChange={(e) => {
                onChange(mask(e.target.value, "999.999.999-99"));
              }}
              value={value}
              label="CPF"
              variant="outlined"
              error={!!errors.cpf}
              helperText={!!errors.cpf && errors.cpf?.message}
            />
          )}
        />
        {/* <TextField
          {...register("cpf", {
            onChange: ({ target }) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
              }).format(target.value),
            valueAsNumber: true,
          })}
          label="CPF"
          variant="outlined"
        /> */}
        <FormControl>
          <InputLabel id="gender">Sexo</InputLabel>
          <Select labelId="gender" label="Sexo" {...register("sexo")}>
            <MenuItem value="sexo 1">Masculino</MenuItem>
            <MenuItem value="sexo 2">Feminino</MenuItem>
          </Select>
        </FormControl>
        <Grid style={{ zIndex: 9999 }}>
          <Controller
            name="dt_nascimento"
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <DatePicker
                name={name}
                selected={value}
                locale="pt-BR"
                dateFormat="dd/MM/yyyy"
                showMonthDropdown
                showYearDropdown
                closeOnScroll
                maxDate={addMonths(new Date(), 6)}
                dropdownMode="select"
                placeholderText="Data de nascimento"
                customInput={createElement(CustomInput)}
                onChange={onChange}
                yearItemNumber={9}
              />
            )}
          />
        </Grid>
        <TextField
          {...register("cep")}
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
        <TextField
          disabled={!existsCep}
          {...register("logradouro")}
          label="Logradouro"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          disabled={!existsCep}
          {...register("bairro")}
          label="Bairro"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TextField
              disabled={!existsCep}
              {...register("cidade")}
              label="Cidade"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              disabled={!existsCep}
              {...register("estado")}
              label="UF"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
        <TextField disabled={!existsCep} label="Complemento" variant="outlined" />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Registrar
        </Button>
      </FormContainer>
      <span>
        Já possui uma conta? <LinkRegister to="/">Entrar</LinkRegister>
      </span>
    </ContainerRegister>
  );
}
