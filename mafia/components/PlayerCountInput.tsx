"use client";

import { TextField, Typography } from "@mui/material";

interface PlayerCountInputProps {
  count: number;
  setCount: (count: number) => void;
}

export default function PlayerCountInput({ count, setCount }: PlayerCountInputProps) {
  return (
    <>
      <Typography variant="h5" gutterBottom>
      How many are playing?
      </Typography>
      <TextField
        type="number"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
        fullWidth
        margin="normal"
        inputProps={{ min: 3, max: 20 }}
      />
    </>
  );
}
