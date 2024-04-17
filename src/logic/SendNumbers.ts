import axios from "axios";

const SendNumbers = async (
  firstArray: number[],
  secondArray: number[],
  isTicketWon: boolean,
  retryCount: number = 2
) => {
  const requestData = {
    selectedNumber: {
      firstField: firstArray,
      secondField: secondArray,
    },
    isTicketWon: isTicketWon,
  };

  const url = "https://fakeurl.com";

  try {
    const response = await axios.post(url, requestData);
    console.log("Данные успешно отправлены на сервер", response.data);
    return;
  } catch (error: any) {
    console.error("АЩИБКА");
    if (retryCount > 0) {
      setTimeout(() => {
        SendNumbers(firstArray, secondArray, isTicketWon, retryCount - 1);
      }, 2000);
    } else {
      console.error(
        "Произошла ошибка при отправке данных на сервер:",
        error.message
      ); // тут любая логика того, как можно оповестить пользователя об ошибке
    }
  }
};

export default SendNumbers;
