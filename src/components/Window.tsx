import { Box, Button, IconButton, Typography } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useEffect, useState } from "react";
import { generateArrays } from "../logic/CreateArrays";
import SendNumbers from "../logic/SendNumbers";

function Window() {
  const [firstMas, setFirstMas] = useState<number[]>([]);
  const [secondMas, setSecondMas] = useState<number[]>([]);
  const [result, setResult] = useState("");
  const [disabled, setDisabled] = useState(true);

  const handleSetArrays = () => {
    const [firstRandomArray, secondRandomArray] = generateArrays();

    setFirstMas(firstRandomArray);
    setSecondMas(secondRandomArray);
  };

  const handleFirstMas = (value: number) => {
    if (!firstMas.includes(value)) {
      if (firstMas.length === 8) {
        return;
      }
      setFirstMas([...firstMas, value]);
    } else {
      setFirstMas([...firstMas.filter((elem) => elem !== value)]);
    }
  };

  const handleSecondMas = (value: number) => {
    if (!secondMas.includes(value)) {
      if (secondMas.length === 1) {
        return;
      }
      setSecondMas([...secondMas, value]);
    } else {
      setSecondMas([...secondMas.filter((elem) => elem !== value)]);
    }
  };

  useEffect(() => {
    if (firstMas.length === 8 && secondMas.length === 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [firstMas, secondMas]);

  const handleCheckArrays = () => {
    const [firstRandomArray, secondRandomArray] = generateArrays();
    let count = 0;

    firstMas.map((elem) => {
      if (firstRandomArray.includes(elem)) {
        count++;
      }
    });

    if (secondRandomArray.includes(secondMas[0])) {
      count++;
    }

    if (count > 3) {
      setResult("win");
      SendNumbers(firstMas, secondMas, true);
      return;
    }

    setResult("lose");
    SendNumbers(firstMas, secondMas, false);
  };

  return (
    <Box
      sx={{
        width: "50vw",
        minWidth: "310px",
        margin: "10vh auto",
        backgroundColor: "white",
        borderRadius: "15px",
      }}
    >
      {result === "win" ? (
        <Box
          sx={{
            width: "100%",
            padding: "40px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Ого, вы выиграли!
          </Typography>
          <Typography variant="h6">Поздравляем!</Typography>
        </Box>
      ) : result === "lose" ? (
        <Box
          sx={{
            width: "100%",
            padding: "40px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Ой-ой... вы проиграли
          </Typography>
          <Typography variant="h6">Попробуйте снова!</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            // margin: "10vh auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5">Билет 1</Typography>
            <IconButton onClick={handleSetArrays}>
              <AutoFixHighIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: "100%", display: "flex", gap: "30px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Поле 1
            </Typography>
            <Typography variant="h6">Отметьте 8 чисел.</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            {Array.from({ length: 19 }, () => 0).map((_, index) => (
              <Button
                key={index}
                onClick={() => handleFirstMas(index + 1)}
                variant="outlined"
                sx={{
                  backgroundColor:
                    firstMas.indexOf(index + 1) === -1
                      ? "none"
                      : "rgb(248, 223, 0)",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "18px",
                  border: "2px solid #DDDDDD",
                  padding: "3px 0px",
                  ":hover": { backgroundColor: "yellow" },
                }}
                size="large"
              >
                {index + 1}
              </Button>
            ))}
          </Box>
          <Box sx={{ width: "100%", display: "flex", gap: "30px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Поле 2
            </Typography>
            <Typography variant="h6">Отметьте 1 число.</Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
            {Array.from({ length: 2 }, () => 0).map((_, index) => (
              <Button
                key={index}
                onClick={() => handleSecondMas(index + 1)}
                variant="outlined"
                sx={{
                  backgroundColor:
                    secondMas.indexOf(index + 1) === -1
                      ? "none"
                      : "rgb(248, 223, 0)",
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "18px",
                  border: "1px solid #DDDDDD",
                  padding: "3px 0px",
                  ":hover": { backgroundColor: "yellow" },
                }}
                size="large"
              >
                {index + 1}
              </Button>
            ))}
          </Box>
          <Button
            onClick={handleCheckArrays}
            disabled={disabled}
            variant="outlined"
            sx={{
              width: "250px",
              height: "50px",
              textTransform: "none",
              color: "black",
              border: "1px solid #DDDDDD",
              borderRadius: "25px",
              margin: "20px auto 5px",
              fontSize: "17px",
            }}
          >
            Показать результаты
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Window;
