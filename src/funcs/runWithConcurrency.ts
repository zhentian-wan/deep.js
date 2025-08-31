async function runWithConcurrency(items, worker, maxConcurrency) {
  if (!items?.length) return;

  let i = 0;
  const workers: Array<Promise<void>> = [];

  async function spawn() {
    while (i < items.length) {
      const idx = i++;
      await worker(items[idx], idx);
    }
  }

  const n = Math.max(1, Math.min(maxConcurrency, items.length));
  for (let i = 0; i < n; i++) workers.push(spawn());

  await Promise.allSettled(workers);
}