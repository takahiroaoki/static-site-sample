import { EVENT_INPUT_VALIDATED, Input } from "@src/components/input/input";
import { lengthValidationFunc } from "@src/utils/validation";

const index = async () => {
    const input = new Input(document.querySelector('[data-ref="input1-ref"]')!, {
        value: '',
        validationFunc: lengthValidationFunc(3, 5),
        isValid: false,
    });
    input.on(EVENT_INPUT_VALIDATED, () => {
        if (input.getState().isValid) {
            window.alert('Input is valid!');
        }
    });
};

document.addEventListener('DOMContentLoaded', index);
