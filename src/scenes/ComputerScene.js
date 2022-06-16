class ComputerScene extends Scene {
  start() {
    document
      .querySelectorAll('.app-actions')
      .forEach((el) => el.classList.add('hidden'));

    document
      .querySelector('[data-scene="computer"]')
      .classList.remove('hidden');
  }
}
