import { observable, action, computed, reaction, makeObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoItem } from "./todoItem";

export type TodoFilter = "all" | "active" | "done";

const STORAGE_KEY = "rn-mobx-demo/todos/v1";

export class TodoStore {
  @observable todos: TodoItem[] = [];
  @observable filter: TodoFilter = "all";
  @observable hydrated = false;
  @observable inputText = "";
  @observable inputBusy = false;

  constructor() {
    makeObservable(this);

    // Auto-persist on any observable change, debounced 300 ms
    reaction(
      () => ({
        todos: this.todos.map((t) => t.toJSON()),
        filter: this.filter,
      }),
      () => this.persist(),
      { delay: 300 }
    );
  }

  // ── Computed ──────────────────────────────────────────────

  @computed get totalCount() {
    return this.todos.length;
  }

  @computed get completedCount() {
    return this.todos.filter((t) => t.done).length;
  }

  @computed get activeCount() {
    return this.todos.filter((t) => !t.done).length;
  }

  @computed get completionRate() {
    if (this.todos.length === 0) return 0;
    return Math.round((this.completedCount / this.todos.length) * 100);
  }

  @computed get filteredTodos(): TodoItem[] {
    switch (this.filter) {
      case "active":
        return this.todos.filter((t) => !t.done);
      case "done":
        return this.todos.filter((t) => t.done);
      default:
        return this.todos;
    }
  }

  // ── Actions ───────────────────────────────────────────────

  @action setFilter = (filter: TodoFilter) => {
    this.filter = filter;
  };

  @action setInputText = (text: string) => {
    this.inputText = text;
  };

  @action submitInput = () => {
    if (this.inputBusy || !this.inputText.trim()) return;
    this.inputBusy = true;
    this.todos.push(new TodoItem(Date.now().toString(), this.inputText.trim()));
    this.inputText = "";
    setTimeout(() => { this.inputBusy = false; }, 200);
  };

  @action addTodo = (title: string) => {
    if (!title.trim()) return;
    this.todos.push(new TodoItem(Date.now().toString(), title.trim()));
  };

  @action removeTodo = (id: string) => {
    this.todos = this.todos.filter((t) => t.id !== id);
  };

  @action clearCompleted = () => {
    this.todos = this.todos.filter((t) => !t.done);
  };

  @action private setHydrated = (value: boolean) => {
    this.hydrated = value;
  };

  @action private setTodos = (items: TodoItem[]) => {
    this.todos = items;
  };

  // ── Persistence ───────────────────────────────────────────

  hydrate = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          todos: { id: string; title: string; done: boolean }[];
          filter: TodoFilter;
        };
        this.setTodos(
          (parsed.todos ?? []).map((t) => new TodoItem(t.id, t.title, t.done))
        );
        this.setFilter(parsed.filter ?? "all");
      }
    } catch {
      this.setTodos([]);
      this.setFilter("all");
    } finally {
      this.setHydrated(true);
    }
  };

  persist = async () => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          todos: this.todos.map((t) => t.toJSON()),
          filter: this.filter,
        })
      );
    } catch {
      // log / Sentry
    }
  };

  clearStorage = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    this.setTodos([]);
    this.setFilter("all");
  };
}

const inst = new TodoStore();
export default inst;
