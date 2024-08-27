type Fn = (...args: any) => void;

class TaskPro {
  #tasks: Fn[] = [];
  #currentIndex = 0;
  #isRunning = false;

  async #next() {
    this.#currentIndex++;
    await this.#runTask();
  }

  async #runNext(task: Fn) {
    const i = this.#currentIndex;
    task(this.#next.bind(this));
    const j = this.#currentIndex;
    if (i === j) {
      await this.#next();
    }
  }

  #reset() {
    this.#currentIndex = 0;
    this.#isRunning = false;
    this.#tasks = [];
  }

  #getTask() {
    return this.#tasks[this.#currentIndex];
  }

  async #runTask() {
    if (this.#currentIndex >= this.#tasks.length) {
      this.#reset();
      return;
    }

    await this.#runNext(this.#getTask());
  }

  addTask(fn: Fn) {
    this.#tasks.push(fn);
  }

  async run() {
    if (this.#isRunning) {
      return false;
    }
    this.#isRunning = true;

    await this.#runTask();

    this.#isRunning = false;

    return true;
  }
}

const t = new TaskPro();

t.addTask(async (next) => {
  console.log(1, "start");
  await next();
  console.log(1, "end");
});

t.addTask(() => {
  console.log(2);
});

t.addTask(() => {
  console.log(3);
});

t.run(); // 1 start 2 3 1 end
