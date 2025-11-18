
export type MethodTable<A, R> = Map<any, (arg: A) => R>;

export class MultiFn<A, R> {
	private dispatchFn: (arg: A) => any;
	private table: MethodTable<A, R> = new Map();
	
	constructor(dispatchFn: (arg: A) => any) {
		this.dispatchFn = dispatchFn;
	}
	
	defmethod(key: any, fn: (arg: A) => R) {
		this.table.set(key, fn);
	}
	
	
  call(arg: A): R {
    const key = this.dispatchFn(arg);
    const method = this.table.get(key);
    if (!method) {
      throw new Error(`No method for dispatch value: ${key}`);
    }
    return method(arg);
  }
}

export enum CellType {
	CELL = "cell",
	WATER = "water",
	FISH = "fish",
}

export type Cell = {
	cell: CellType
}



const tick = new MultiFn<Cell, Cell>(c => c.cell);

tick.defmethod( CellType.WATER, c => {
	if(Math.random() > 0.4) {
		return { cell: CellType.FISH };
	}
	return { cell: CellType.WATER };
});


export { tick };