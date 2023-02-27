type MakeInfiniteScrollType<TRow> = {
    key: keyof TRow,
    initialRows?: TRow[]
    fetchRows: () => Promise<TRow[]> | TRow[]
}

export const makeInfiniteScroll = <TRow>(params: MakeInfiniteScrollType<TRow>) => {
    const data = params.initialRows || [];
  
    const scroll = async () => {
      const rows = await params.fetchRows();
      data.push(...rows);
    };
  
    return {
      scroll,
      getRows: () => data,
    };
  };