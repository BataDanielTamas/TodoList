import { observable, action, computed, makeObservable } from "mobx";

export class TodoItem {
  @observable id: string;
  @observable title: string;
  @observable done: boolean;

  constructor(id: string, title: string, done = false) {
    this.id = id;
    this.title = title;
    this.done = done;
    makeObservable(this);
  }

  @action toggle = () => {
    this.done = !this.done;
  };

  @action setTitle = (title: string) => {
    this.title = title.trim();
  };

  @computed get label() {
    return this.done ? `✓ ${this.title}` : this.title;
  }

  toJSON = () => ({ id: this.id, title: this.title, done: this.done });
}
