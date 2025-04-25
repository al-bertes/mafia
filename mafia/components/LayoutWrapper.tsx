"use client";

import { Container, Paper } from "@mui/material";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper sx={{ p: 4, minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {children}
      </Paper>
    </Container>
  );
}
