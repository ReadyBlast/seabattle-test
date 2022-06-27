const app = new Application({
  preparation: PreparationScene,
  computer: ComputerScene,
  online: OnlineScene,
});

app.start('preparation');

// document.querySelector('[data-action="randomize"]').click();
// document.querySelector('[data-type="random"]').disabled = false;
// document.querySelector('[data-type="random"]').click();
