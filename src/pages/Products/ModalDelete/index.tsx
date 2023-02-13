import useCustomToast from "@/hooks/useCustomToast";
import { deleteProductById } from "@/services/_v1/product-service";
import { Button, Fade, Grid, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ModalContent } from "../styles";

interface ModaDeleteProps {
  id: string;
  open: boolean;
  toggle: () => void;
}

export function ModalDelete({ toggle, open, id }: ModaDeleteProps) {
  const navigate = useNavigate();
  const toast = useCustomToast();

  async function handleDeleteProduct() {
    try {
      await deleteProductById(id);
      toast({
        data: {
          color: "success",
          message: "<strong>Produto</strong> deletado com sucesso",
        },
      });
      navigate("/products");
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

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={toggle}
      closeAfterTransition
    >
      <Fade in={open}>
        <ModalContent>
          <header>
            <strong>Deseja realmente excluir o produto?</strong>
          </header>
          <Grid container spacing={3} mt={4}>
            <Grid item>
              <Button color="error" variant="outlined" onClick={toggle}>
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button color="error" variant="contained" onClick={handleDeleteProduct}>
                Deletar
              </Button>
            </Grid>
          </Grid>
        </ModalContent>
      </Fade>
    </Modal>
  );
}
