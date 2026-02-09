import { TodoStore } from "./todoStore";

export class RootStore {
todoStore: TodoStore;

  constructor() {
    this.todoStore = new TodoStore(this);
  }
}

export const rootStore = new RootStore();
