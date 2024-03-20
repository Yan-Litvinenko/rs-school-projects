class DataBase {
  private db: Record<string, string | boolean>;

  constructor() {
    const storedDb = localStorage.getItem('puzzle-data-base');
    this.db = storedDb ? JSON.parse(storedDb) : { translate: true, image: true };
    this.createDb();
  }

  private createDb(): void {
    localStorage.setItem('puzzle-data-base', JSON.stringify(this.db));
  }

  add(key: string, value: string | boolean): void {
    this.db[key] = value;
    this.createDb();
  }

  get(key: string): string | boolean | undefined {
    return this.db[key];
  }

  has(key: string): boolean {
    return key in this.db;
  }

  remove(): void {
    localStorage.removeItem('puzzle-data-base');
    this.db = { translate: true };
  }
}

const dataBase = new DataBase();

export { dataBase };
