function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export class ParalleTask {
  constructor(paralleCount = 2) {
    this.tasks = [];
    this.paralleCount = paralleCount;
    this.runningCount = 0;
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      this._run();
    });
  }

  _run() {
    while (this.runningCount < this.paralleCount && this.tasks.length) {
      this.runningCount++;
      const { task, resolve, reject } = this.tasks.shift();
      task()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.runningCount--;
          this._run();
        });
    }
  }
}

function main() {
  const superTask = new ParalleTask();

  function addTask(time, name) {
    superTask
      .add(() => timeout(time))
      .then(() => {
        console.log(`${name} is done`);
      });
  }
  
  addTask(10000, "Task 1");
  addTask(5000, "Task 2");
  addTask(3000, "Task 3");
  addTask(4000, "Task 4");
  addTask(5000, "Task 5");

  // after 5 second, finish Task 2
  // then after 3 second, finish Task 3
  // then after 2 second, finish Task 1
  // then after 2 second, finish Task 4
  // then after 3 second, finish Task 5
  // Total 15 seconds
}
