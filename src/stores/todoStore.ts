import { makeAutoObservable, reaction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStore } from "./rootStore";


export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export type TodoFilter = "all" | "active" | "done";

export class TodoStore {
  private disposer?: () => void;
  rootStore: RootStore;
  todos: Todo[] = [];
  filter: TodoFilter = "all";
  private storageKey = "rn-mobx-demo/todos/v1";
  hydrated = false;

  

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);

    // automatikus mentés minden releváns változásra
    
  }
  

  get totalCount() {
    return this.todos.length;
  }

  get completedCount() {
    return this.todos.filter(t => t.done).length;
  }

  get activeCount() {
    return this.todos.filter(t => !t.done).length;
  }

  get completionRate() {
    if (this.todos.length === 0) return 0;
    return Math.round((this.completedCount / this.todos.length) * 100);
  }

  get filteredTodos() {
    switch (this.filter) {
      case "active":
        return this.todos.filter(t => !t.done);
      case "done":
        return this.todos.filter(t => t.done);
      default:
        return this.todos;
    }
  }


  setFilter(filter: TodoFilter) {
    this.filter = filter;
  }

  addTodo(title: string) {
    if (!title.trim()) return;
    
    this.todos.push({
      id: Date.now().toString(),
      title,
      done: false,
    });
  }

  toggleTodo(id: string) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.done = !todo.done;
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  clearCompleted() {
    this.todos = this.todos.filter(t => !t.done);
  }

   async hydrate() {
  try {
    const raw = await AsyncStorage.getItem(this.storageKey);
    if (!raw) return;

    const parsed = JSON.parse(raw) as {
      todos: Todo[];
      filter: TodoFilter;
    };

    this.todos = parsed.todos ?? [];
    this.filter = parsed.filter ?? "all";
  } catch {
    this.todos = [];
    this.filter = "all";
  } finally {
    this.hydrated = true;
  }
}
  async persist() {
    try {
      const payload = JSON.stringify({
        todos: this.todos,
        filter: this.filter,
      });

      await AsyncStorage.setItem(this.storageKey, payload);
    } catch (e) {
      // itt lehetne logolni / Sentry
    }
  }

  async clearStorage() {
    await AsyncStorage.removeItem(this.storageKey);
    this.todos = [];
    this.filter = "all";
  }

}
