import { EVENT_INPUT_VALIDATED, Input } from "@src/components/input/input";

const index = async () => {
    const input = new Input(document.querySelector('[data-ref="input1-ref"]')!, {
        value: '',
        validationFunc: (value: string) => {
            if (value.length < 5) {
                return new Error('length must be at least 5 characters');
            }
            return null;
        },
        isValid: false,
    });
    input.on(EVENT_INPUT_VALIDATED, () => {
        if (input.getState().isValid) {
            window.alert('Input is valid!');
        }
    });
};

document.addEventListener('DOMContentLoaded', index);
