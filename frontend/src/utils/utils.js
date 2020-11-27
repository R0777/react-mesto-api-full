export const renderLoading = (isLoading) => {
  const buttonText = document.querySelector('.popup__save');
  if (isLoading) {
    buttonText.textContent = 'Сохранение...';
  } else {
    buttonText.textContent = 'Сохранить';
  }
};
