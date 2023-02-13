import { updateProduct } from "@/services/_v1/product-service";
import { maskCurrency } from "@/utils/mask";
import { Button, Fade, Grid, Modal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { ProductData } from "..";
import { ModalContent } from "../styles";
import useCustomToast from "@/hooks/useCustomToast";

export const updateProductFormValidationSchema = zod.object({
  nome: zod.string().min(3, "Campo obrigatório"),
  marca: zod.string().min(3, "Campo obrigatório"),
  preco: zod.string().min(1, "Campo obrigatório"),
  qt_estoque: zod.number().min(1, "Campo obrigatório"),
  qt_vendas: zod.number().min(1, "Campo obrigatório"),
});

export type UpdateProductFormData = zod.infer<typeof updateProductFormValidationSchema>;

interface ModalEditProps {
  open: boolean;
  toggle: () => void;
  product: ProductData;
}

export function ModalEdit({ toggle, open, product }: ModalEditProps) {
  const toast = useCustomToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<UpdateProductFormData>({
    mode: "onBlur",
    resolver: zodResolver(updateProductFormValidationSchema),
  });

  function handleSelectedFile(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      setSelectedFile(files[0]);
    }
  }

  async function onSubmit(newProduct: UpdateProductFormData) {
    try {
      const data = new FormData();
      if (selectedFile) {
        data.append("file", selectedFile, selectedFile.name);
        await updateProduct({ ...newProduct, avatar: data });
        toast({
          data: {
            color: "success",
            message: "<strong>Produto</strong> criado com sucesso",
          },
        });
        toggle();
      } else {
        await updateProduct({ ...newProduct, avatar: product.avatar });
        toggle();
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

  function handleClose() {
    toggle();
    reset();
  }

  useEffect(() => {
    if (product) {
      reset({ ...product, preco: product.preco && maskCurrency(product.preco) });
    }
  }, [product]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <header>
              <strong>Editar produto</strong>
            </header>
            <TextField
              {...register("nome")}
              label="Nome"
              fullWidth
              error={!!errors.nome}
              helperText={!!errors.nome && errors.nome?.message}
            />
            <TextField
              {...register("marca")}
              label="Marca"
              fullWidth
              error={!!errors.marca}
              helperText={!!errors.marca && errors.marca?.message}
            />

            <TextField
              {...register("preco", {
                onChange: (e) => setValue("preco", maskCurrency(e.target.value)),
              })}
              fullWidth
              placeholder="R$ 00,00"
              error={!!errors.preco}
              helperText={!!errors.preco && errors.preco?.message}
              label="Preço"
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  {...register("qt_estoque", {
                    valueAsNumber: true,
                  })}
                  fullWidth
                  type="number"
                  label="Qtd Estoque"
                  error={!!errors.qt_estoque}
                  helperText={!!errors.qt_estoque && errors.qt_estoque?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("qt_vendas", {
                    valueAsNumber: true,
                  })}
                  fullWidth
                  type="number"
                  label="Qtd Vendas"
                  error={!!errors.qt_vendas}
                  helperText={!!errors.qt_vendas && errors.qt_vendas?.message}
                />
              </Grid>
            </Grid>
            <Button variant="contained" component="label">
              Enviar Avatar
              <input type="file" hidden accept="image/*" onChange={handleSelectedFile} />
            </Button>
            {selectedFile && <strong style={{ color: "#222" }}>{selectedFile.name}</strong>}
            <Grid container spacing={3} mt={4}>
              <Grid item>
                <Button color="error" variant="outlined" onClick={handleClose}>
                  Cancelar
                </Button>
              </Grid>
              <Grid item>
                <Button color="success" variant="contained" type="submit" disabled={isSubmitting}>
                  Salvar alterações
                </Button>
              </Grid>
            </Grid>
          </form>
        </ModalContent>
      </Fade>
    </Modal>
  );
}
