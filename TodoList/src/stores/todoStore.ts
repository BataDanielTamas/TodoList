import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  action,
  computed,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";
import { RootStore } from "./rootStore";

/** Miért van ez külön? → a filter típusa az app "szótára" */
export type TodoFilter = "all" | "active" | "done";

/** Perzisztenciához "egyszerű" JSON formátum kell, class instance nem jó nyersen */
type TodoDTO = { id: string; title: string; done: boolean };
type PersistDTO = { todos: TodoDTO[]; filter: TodoFilter; inputText: string };

/**
 * OOP: egy darab Todo.
 * Miért jó?
 * - soronkénti logika itt van (toggle, setTitle)
 * - UI nem írja át közvetlenül a done/title-t, hanem metódust hív
 */
export class Todo {
  id: string;
  title: string;
  done: boolean;

  constructor(id: string, title: string, done = false) {
    this.id = id;
    this.title = title;
    this.done = done;

    // makeObservable: kézzel mondjuk meg mi figyelhető és mi action
    makeObservable(this, {
      title: observable,
      done: observable,
      toggle: action,
      setTitle: action,
      isDone: computed,
    });
  }

  toggle() {
    this.done = !this.done;
  }

  setTitle(title: string) {
    this.title = title;
  }

  // computed: UI-ban olvasható “kész-e”
  get isDone() {
    return this.done;
  }

  // JSON-hoz alakítás (class instance → plain object)
  toDTO(): TodoDTO {
    return { id: this.id, title: this.title, done: this.done };
  }

  // plain object → class instance
  static fromDTO(dto: TodoDTO) {
    return new Todo(dto.id, dto.title, dto.done);
  }
}

/**
 * OOP: a Todo-k gyűjteménye + szabályok.
 * Miért store-ban az inputText is?
 * - "UI state" is lehet központi igazságforrás, így a UI tényleg buta.
 */
export class TodoStore {
  rootStore: RootStore;

  hydrated = false;

  // lista + filter
  filter: TodoFilter = "all";
  todos: Todo[] = [];

  // ✅ input a store-ban (így nincs useState a komponensben)
  inputText = "";

  private storageKey = "rn-mobx-demo/todos/oop-v2";
  private disposer?: () => void;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      // ----- state -----
      hydrated: observable,
      filter: observable,
      todos: observable.shallow, // lista figyelése, elemek külön observable-k (Todo class)
      inputText: observable,

      // ----- computed (UI-döntések a store-ban) -----
      totalCount: computed,
      completedCount: computed,
      activeCount: computed,
      completionRate: computed,
      filteredTodos: computed,
      emptyMessage: computed,
      canAdd: computed,

      // ----- actions (módosítások csak metóduson keresztül) -----
      setFilter: action,
      setInputText: action,
      addFromInput: action,
      addTodo: action,
      removeTodo: action,
      clearCompleted: action,
      clearStorage: action,
    });
  }

  // ---------------- computed ----------------

  get totalCount() {
    return this.todos.length;
  }

  get completedCount() {
    return this.todos.filter((t) => t.done).length;
  }

  get activeCount() {
    return this.todos.filter((t) => !t.done).length;
  }

  get completionRate() {
    if (this.totalCount === 0) return 0;
    return Math.round((this.completedCount / this.totalCount) * 100);
  }

  // A listaszűrés a store-ban legyen, ne a UI-ban
  get filteredTodos() {
    switch (this.filter) {
      case "active":
        return this.todos.filter((t) => !t.done);
      case "done":
        return this.todos.filter((t) => t.done);
      default:
        return this.todos;
    }
  }

  // ✅ a korábbi UI ternary helyett store computed
  get emptyMessage() {
    if (this.filter === "all") return "Még nincs feladatod.";
    if (this.filter === "active") return "Nincs aktív feladat.";
    return "Nincs kész feladat.";
  }

  // ✅ Add gomb engedélyezése store computed-ből
  get canAdd() {
    return this.inputText.trim().length > 0;
  }

  // ---------------- actions ----------------

  setFilter(filter: TodoFilter) {
    this.filter = filter;
  }

  setInputText(value: string) {
    this.inputText = value;
  }

  /**
   * UI csak ezt hívja: "Add".
   * A store intézi:
   * - trim + validáció
   * - hozzáadás
   * - input ürítés
   */
  addFromInput() {
    const trimmed = this.inputText.trim();
    if (!trimmed) return;

    this.addTodo(trimmed);
    this.inputText = "";
  }

  addTodo(title: string) {
    const t = title.trim();
    if (!t) return;

    const id = Date.now().toString();
    this.todos.push(new Todo(id, t, false));
  }

  removeTodo(id: string) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  clearCompleted() {
    this.todos = this.todos.filter((t) => !t.done);
  }

  async clearStorage() {
    await AsyncStorage.removeItem(this.storageKey);
    runInAction(() => {
      this.todos = [];
      this.filter = "all";
      this.inputText = "";
    });
  }

  // ---------------- persist / hydrate ----------------

  /**
   * Miért így?
   * - hydrate async → App.tsx hívja egyszer (useEffect)
   * - reaction csak hydrate után indul, hogy ne írjuk felül azonnal az üreset
   */
  async hydrate() {
    try {
      const raw = await AsyncStorage.getItem(this.storageKey);

      if (raw) {
        const parsed = JSON.parse(raw) as PersistDTO;

        runInAction(() => {
          this.todos = (parsed.todos ?? []).map(Todo.fromDTO);
          this.filter = parsed.filter ?? "all";
          this.inputText = parsed.inputText ?? "";
        });
      }
    } catch {
      runInAction(() => {
        this.todos = [];
        this.filter = "all";
        this.inputText = "";
      });
    } finally {
      runInAction(() => {
        this.hydrated = true;
      });

      // reaction: bármilyen változás → mentés
      if (!this.disposer) {
        this.disposer = reaction(
          () =>
            JSON.stringify({
              todos: this.todos.map((t) => t.toDTO()),
              filter: this.filter,
              inputText: this.inputText,
            } satisfies PersistDTO),
          (payload) => {
            AsyncStorage.setItem(this.storageKey, payload);
          }
        );
      }
    }
  }
}
