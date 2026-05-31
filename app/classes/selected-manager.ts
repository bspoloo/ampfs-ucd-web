export class SelectedManger<T> {
    private dataDict: Map<string, T>;
    private static instance: SelectedManger<any> | null = null;

    private constructor() {
        this.dataDict = new Map<string, T>();
    }

    public static getInstance<T>(): SelectedManger<T> {
        if (!SelectedManger.instance) {
            SelectedManger.instance = new SelectedManger<T>();
        }
        return SelectedManger.instance as SelectedManger<T>;
    }
    public addItem(key: string, data: T) {
        if (!this.dataDict.get(key)) {
            this.dataDict.set(key, data);
        }
    }

    public removeItem(key: string) {
        if (this.dataDict.get(key)) {
            this.dataDict.delete(key);
        }
    }

    public getDataDict(): Map<string, T> {
        return this.dataDict;
    }

    public isExist(key: string) {
        return this.dataDict.get(key)
    }

    public clearData(): void {
        this.dataDict.clear();
    }
}