const getErrorMessage = message => {
  switch(message) {
    case "not_allowed":
      return "Произошла ошибка. В бесплатной версии API базовой валютой может быть только USD. 😞";
    default:
      return "Неизвестная ошибка.";
  }
}

export default getErrorMessage;