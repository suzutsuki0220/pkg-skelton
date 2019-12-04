function execButton(onClick) {
    const button = document.createElement('a');
    button.classList.add('uk-button');
    button.classList.add('uk-button-primary');
    button.appendChild(document.createTextNode('実行'));

    if (onClick) {
        button.onclick = onClick;
    }

    return button;
}

function inputText() {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.classList.add('uk-input');

    return input;
}

function makeForm(params, doFunction) {
    const fragment = document.createDocumentFragment();

    if (!params) {
        return fragment;
    }

    const form = document.createElement('form');
    form.setAttribute('action', '#');
    form.classList.add('uk-form-horizontal');

    const div = document.createElement('div');
    div.classList.add('uk-margin-left');
    let inputElems = new Array();
    for (let i=0; i<params.length; i++) {
        const formLabel = document.createElement('label');
        formLabel.classList.add('uk-form-label');
        formLabel.appendChild(document.createTextNode(params[i]));
        div.appendChild(formLabel);

        const formControl = document.createElement('div');
        formControl.classList.add('uk-form-controls');

        const input = inputText();
        inputElems.push(input);
        formControl.appendChild(input);

        div.appendChild(formControl);
    }
    form.appendChild(div);

    const resultArea = inputText();
    const button = execButton(function() {
//        console.log('Name: ' + formIdPrefix);
//        console.log(inputElems);
        let inputArgs = new Array();
        for (let i=0; i<inputElems.length; i++) {
            inputArgs.push(inputElems[i].value);
        }
        resultArea.value = doFunction.apply(null, inputArgs);
    });
    form.appendChild(button);
    form.appendChild(resultArea);

    fragment.appendChild(form);

    return fragment;
}

function makeArea(elem, params, functions) {
    const fragment = document.createDocumentFragment();

    for (let f in functions) {
        const h3 = document.createElement('h3');
        h3.id = f;
        h3.appendChild(document.createTextNode(f));
        fragment.appendChild(h3);
        fragment.appendChild(makeForm(params[f], functions[f]));
    }

    elem.appendChild(fragment);
}
