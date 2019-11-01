/*global jsUtils:false */
const parameters  = {
    getFormatTime: ["hour", "min", "sec", "milisec"],
    isValidString: ["datetimeString"],
    toUTCString: ["epoc", "addMsec"],
    toString: ["epoc", "addMsec"],
    toPruneString: ["epoc", "space"],
    toRFC3339UTC: ["epoc"],
    getDateFromDatetimeString: ["datetimeString"],
    roundMilliEpoc: ["milli_epoc"],
    isMatchInSeconds: ["epoc1", "epoc2"],
    getEpoch: ["datetime"]
}

function makeForm(className, methodName, functions) {
    const formIdPrefix = className + '_' + methodName;
    const fragment = document.createDocumentFragment();

    const params = parameters[methodName];
    if (!params) {
        return fragment;
    }

    const form = document.createElement('form');
    form.setAttribute('name', formIdPrefix);
    form.setAttribute('action', '#' + formIdPrefix);
    form.classList.add('uk-form-horizontal');

    const div = document.createElement('div');
    div.classList.add('uk-margin-left');
    let inputElems = new Array();
    for (let i=0; i<params.length; i++) {
        const paramID = formIdPrefix + '_' +  params[i];
        inputElems.push(paramID);

        const formLabel = document.createElement('label');
        formLabel.classList.add('uk-form-label');
        formLabel.appendChild(document.createTextNode(params[i]));
        div.appendChild(formLabel);

        const formControl = document.createElement('div');
        formControl.classList.add('uk-form-controls');

        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', paramID);
        input.classList.add('uk-input');
        formControl.appendChild(input);

        div.appendChild(formControl);
    }
    form.appendChild(div);

    const resultAreaID = formIdPrefix + '_result_area';
    const button = document.createElement('a');
    button.classList.add('uk-button');
    button.classList.add('uk-button-primary');
    button.appendChild(document.createTextNode('実行'));
    button.onclick = function() {
//        console.log('Name: ' + formIdPrefix);
//        console.log(inputElems);
        let inputArgs = new Array();
        for (let i=0; i<inputElems.length; i++) {
            inputArgs.push(document.getElementById(inputElems[i]).value);
        }
        document.getElementById(resultAreaID).value = functions[methodName].apply(null, inputArgs);
    };
    form.appendChild(button);

    const resultArea = document.createElement('input');
    resultArea.setAttribute('type', 'text');
    resultArea.setAttribute('id', resultAreaID);
    resultArea.classList.add('uk-input');
    form.appendChild(resultArea);

    fragment.appendChild(form);

    return fragment;
}

function makeDatetimeArea() {
    const elem = document.getElementById('datetime_area');

    const fragment = document.createDocumentFragment();
    const functions = jsUtils.datetime;

    for (let f in functions) {
        const h3 = document.createElement('h3');
        h3.id = f;
        h3.appendChild(document.createTextNode(f));
        fragment.appendChild(h3);
        fragment.appendChild(makeForm("datetime", f, functions));
    }

    elem.appendChild(fragment);
}
