import { AuthContext } from "@/contexts/authContext";
import { getUserParsedInLocalStorage } from "@/utils/authUtils";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ProfileContainer } from "./styles";

export function Profile() {
  const { signOut } = useContext(AuthContext);
  const user = getUserParsedInLocalStorage();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ProfileContainer>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <header>
            <strong>{`${user.nome} ${user.sobrenome}`}</strong>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={user.image} />
            </IconButton>
          </header>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={signOut}>
            <Typography textAlign="center">Sair</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </ProfileContainer>
  );
}
