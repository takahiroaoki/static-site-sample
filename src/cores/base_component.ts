export const EVENT_UPDATE_STATE = 'event_update_state';

export type EventSetting = {
    selector: string;
    eventName: string;
    callback: EventListenerOrEventListenerObject;
};

type SetStateOption = {
    render: boolean;
    emit: boolean;
}

export class BaseComponent<T> {
    private elem: HTMLElement;
    private state: T;
    private emitter = new EventTarget();

    constructor(elem: HTMLElement, initialState: T) {
        this.state = initialState;
        this.elem = elem;
        this.getEventSettings().forEach((e: EventSetting) => {
            this.select(e.selector)?.addEventListener(e.eventName, e.callback);
        });
    }

    protected emit(eventName: string): void {
        this.emitter.dispatchEvent(new CustomEvent(eventName));
    }

    public getState(): T {
        return this.state;
    }

    public setState(partial: Partial<T>, options: SetStateOption = { render: true, emit: true }): void {
        const newState = { ...this.state, ...partial };
        this.state = newState;
        if (options.emit) {
            this.emit(EVENT_UPDATE_STATE);
        }
        if (options.render) {
            this.render();
        }
    }

    public on(eventName: string, callback: EventListenerOrEventListenerObject): void {
        this.emitter.addEventListener(eventName, callback);
    }

    protected getEventSettings(): EventSetting[] {
        return [];
    }

    protected select(selector: string): HTMLElement | null {
        return this.elem.querySelector(selector);
    }

    protected getDataset(): DOMStringMap {
        return this.elem.dataset;
    }

    protected getRef(): string {
        return this.getDataset().ref || '';
    }

    protected render(): void {}
}