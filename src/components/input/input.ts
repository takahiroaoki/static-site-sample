import { BaseComponent } from "@src/cores/base_component";

export const EVENT_INPUT_VALIDATED = 'event_input_validated';

type InputState = {
    value: string;
    validationFunc: (value: string) => Error|null;
    isValid: boolean;
};

export class Input extends BaseComponent<InputState> {
    constructor(elem: HTMLElement, initialState: InputState) {
        super(elem, initialState);
    }

    protected getEventSettings() {
        return [
            {
                selector: '.input__field',
                eventName: 'input',
                callback: () => {
                    this.setState({
                        value: this.getInputValue(),
                        isValid: false,
                    })
                }
            }
        ];
    }

    private getInputValue(): string {
        const inputElem = this.select('.input__field') as HTMLInputElement;
        return inputElem.value;
    }

    protected render() {
        const { value, validationFunc } = this.getState();
        const error = validationFunc(value);

        const messageElem = this.select('.input__message') as HTMLElement;
        messageElem.textContent = error?.message ?? '';
        this.setState({ isValid: error == null }, { render: false, emit: false });
        this.emit(EVENT_INPUT_VALIDATED);
    }
}