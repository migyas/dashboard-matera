import { createElement, useEffect, useState, useCallback } from "react";
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
  FormHelperText,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMonths } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { cpf } from "cpf-cnpj-validator";
import * as zod from "zod";
import { mask, unMask } from "@/utils/mask";
import { ContainerRegister, CustomInput, FormContainer, LinkRegister } from "./styles";
import { optionGender } from "@/utils/mocks/gender";
import { createUser } from "@/services/_v1/user-service";
import { useNavigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import useCustomToast from "@/hooks/useCustomToast";

export const newUserFormValidationSchema = zod.object({
  nome: zod.string().min(1, "Campo obrigatório"),
  sobrenome: zod.string().min(1, "Campo obrigatório"),
  email: zod.string().min(1, "Campo obrigatório").email(),
  senha: zod.string().min(8, "Mínimo de 8 caracteres"),
  cpf: zod.string().min(14, "Campo obrigatório"),
  cep: zod.string().min(7, "Campo obrigatório"),
  logradouro: zod.string(),
  bairro: zod.string(),
  cidade: zod.string(),
  estado: zod.string(),
  complemento: zod.string().min(2, "Campo obrigatório"),
  dt_nascimento: zod.date(),
  sexo: zod.string().min(1),
});

export type NewUserFormData = zod.infer<typeof newUserFormValidationSchema>;

export default function Register() {
  const toast = useCustomToast();
  const [existsCep, setExistsCep] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setError,
    setValue,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm<NewUserFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(newUserFormValidationSchema),
    defaultValues: {
      sexo: optionGender[0].value,
    },
  });

  const cepWatch = watch("cep");
  const navigate = useNavigate();

  async function onSubmit(user: NewUserFormData) {
    try {
      const isValidCPF = cpf.isValid(user.cpf);
      if (isValidCPF) {
        await createUser({ ...user, cpf: unMask(user.cpf) });
        navigate("/");
        toast({
          data: {
            color: "success",
            message: "<strong>Usuário</strong> criado com sucesso",
          },
        });
        reset();
      } else {
        setError("cpf", { message: "CPF Inválido", type: "validate" });
      }
    } catch {
      toast({
        data: {
          color: "error",
          message: "Servidor fora do ar",
        },
      });
      throw new Error("Servidor fora do ar");
    }
  }

  async function getCEPInformation() {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cepWatch}/json`);
      return data;
    } catch {
      setError("cep", { message: "Informar um CEP válido" });
    }
  }

  function fillFieldsInForm(formatedCEP: {
    bairro: string;
    logradouro: string;
    cidade: string;
    estado: string;
  }) {
    const getAllValues = getValues();
    reset({ ...getAllValues, ...formatedCEP });
  }

  const getCEP = useCallback(async () => {
    if (cepWatch && cepWatch.length === 9) {
      const { localidade, uf, logradouro, bairro } = await getCEPInformation();
      const formatedCEP = {
        bairro,
        logradouro,
        cidade: localidade,
        estado: uf,
      };
      setExistsCep(!!formatedCEP);
      fillFieldsInForm(formatedCEP);
    }
  }, [cepWatch]);

  useEffect(() => {
    getCEP();
  }, [cepWatch]);

  return (
    <PublicLayout>
      <ContainerRegister>
        <header>
          <PersonAddAlt />
          <strong>Registre-se</strong>
          <span>Informe seus dados</span>
        </header>
        <FormContainer onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                {...register("nome")}
                label="Nome"
                variant="outlined"
                error={!!errors.nome}
                helperText={!!errors.nome && errors.nome?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register("sobrenome")}
                label="Sobrenome"
                variant="outlined"
                error={!!errors.sobrenome}
                helperText={!!errors.sobrenome && errors.sobrenome?.message}
              />
            </Grid>
          </Grid>
          <TextField
            {...register("email")}
            type="email"
            label="Email"
            variant="outlined"
            autoComplete="current-email"
            error={!!errors.email}
            helperText={!!errors.email && errors.email?.message}
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
            error={!!errors.senha}
            helperText={!!errors.senha && errors.senha?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LockOutlined />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            {...register("cpf", {
              onChange: (e) => {
                setValue("cpf", mask(e.target.value, "999.999.999-99"));
              },
            })}
            type="text"
            label="CPF"
            variant="outlined"
            error={!!errors.cpf}
            helperText={!!errors.cpf && "CPF Inválido"}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="gender">Sexo</InputLabel>
                <Controller
                  control={control}
                  name="sexo"
                  render={({ field }) => (
                    <Select
                      labelId="gender"
                      {...field}
                      variant="outlined"
                      label="Sexo"
                      placeholder="Sexo"
                    >
                      {optionGender.map((gender) => (
                        <MenuItem key={gender.value} value={gender.value}>
                          {gender.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} style={{ zIndex: 99 }}>
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
                    className={`${!!errors.dt_nascimento && "error"}`}
                  />
                )}
              />
              <FormHelperText error>{!!errors.dt_nascimento && "Campo obrigatório"}</FormHelperText>
            </Grid>
          </Grid>
          <TextField
            {...register("cep", {
              onChange: (e) => {
                setValue("cep", mask(e.target.value, "99999-999"));
              },
            })}
            label="CEP"
            variant="outlined"
            error={!!errors.cep}
            helperText={!!errors.cep && errors.cep?.message}
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
          <TextField
            {...register("complemento")}
            label="Complemento"
            error={!!errors.complemento}
            helperText={!!errors.complemento && errors.complemento?.message}
            variant="outlined"
          />
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Registrar
          </Button>
        </FormContainer>
        <span>
          Já possui uma conta? <LinkRegister to="/">Entrar</LinkRegister>
        </span>
      </ContainerRegister>
    </PublicLayout>
  );
}
