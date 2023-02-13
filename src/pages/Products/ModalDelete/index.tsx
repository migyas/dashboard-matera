import { deleteProductById } from "@/services/_v1/product-service";
import { Button, Fade, Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { ModalContent } from "../styles";

interface ModaDeleteProps {
  id: string;
  open: boolean;
  toggle: () => void;
}

export function ModalDelete({ toggle, open, id }: ModaDeleteProps) {
  const navigate = useNavigate();

  async function handleDeleteProduct() {
    try {
      await deleteProductById(id);
      navigate("/products");
    } catch {
      console.log("Erro na API");
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
