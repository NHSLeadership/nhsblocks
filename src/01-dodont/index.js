const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
    RichText,
    URLInputButton } = wp.editor;
//npm packages (also requires babel + webpack compilation because it's es6 but no jsx compiler required)
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import cloneDeep from 'clone-deep';

let el = wp.element.createElement;
let c = wp.components;

Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

const countNonEmpty = function (object) {
    let c = 0;
    for (let key in object)
        if (object.hasOwnProperty(key) && ((typeof object[key] === 'string' && object[key].length) || typeof object[key] === 'number' || typeof object[key] === 'boolean'))
            c++;

    return c;
};

const repeaterData = (value, returnArray = false, removeEmpty = true) => {
    if (typeof value === 'string' && !returnArray)
        return value; //If it hasn't been rendered yet it's still a string
    else if (typeof value === 'string')
        return JSON.parse(value);

    value = cloneDeep(value);

    value = value.filterMap((v) => {
        delete v._key;
        if (!removeEmpty || countNonEmpty(v) !== 0) {
            return v;
        }
    });
    return returnArray ? value : JSON.stringify(value);
};

const SortableItem = SortableElement(({value, parentValue, index, onChangeChild, template, removeText, onRemove, addOnNonEmpty}) => {
    return el('div', {className: 'repeater-row-wrapper'}, [
        el('div', {className: 'repeater-row-inner'}, template(value, (v) => {
            onChangeChild(v, index)
        })),
        el('div', {className: 'button-wrapper'},
            addOnNonEmpty && index === parentValue.length - 1 ? null : el(c.Button, {
                    className: 'repeater-row-remove is-button is-default is-large',
                    onClick: () => {
                        onRemove(index)
                    }
                },
                removeText ? removeText : '-')
        )
    ])
});
const SortableList = SortableContainer(({items, id, template, onChangeChild, removeText, onRemove, addOnNonEmpty}) => {
    return el('div', {className: 'repeater-rows'}, items.map((value, index) => {
            return el(SortableItem, {
                key: id + '-repeater-item-' + value._key,
                index,
                value,
                parentValue: items,
                onChangeChild,
                template,
                removeText,
                onRemove,
                addOnNonEmpty
            })
        }
    ));
});
c.RepeaterControl = wp.compose.withInstanceId(function (_ref) {
    let value = [{}],
        max = _ref.max,
        addOnNonEmpty = !_ref.addText,
        removeOnEmpty = !!_ref.removeOnEmpty,
        instanceId = _ref.instanceId,
        id = "inspector-repeater-control-".concat(instanceId);
    if (typeof _ref.value === 'string') {
        try {
            const parsed = JSON.parse(_ref.value);
            value = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            value = [];
        }
    } else {
        value = cloneDeep(_ref.value); //Clone value else we would mutate the state directly
    }

    const onRemove = (i) => {
        if (value.length > 0) {
            value.splice(i, 1);
            if (value.length === 0) {
                onAdd();
            } else {
                onChangeValue(value);
            }
        }
    };
    let key = 0; //This is the key of each element, it must be unique
    value.map((v) => {
        if (typeof v._key === 'undefined')
            v._key = key++;
        else {
            key = v._key;
        }
    });

    const onAdd = () => {
        if (!max || value.length < max) {
            value.push({_key: ++key});
            onChangeValue(value);
        }
    };
    const onChangeValue = (v) => {
        return _ref.onChange(v);
    };
    const onChangeChild = (v, i) => {
        value[i] = v;
        if (i === value.length - 1) {
            if (addOnNonEmpty && countNonEmpty(v) > 1) {
                onAdd()
            } else if (removeOnEmpty && countNonEmpty(v) <= 1) {
                onRemove(i)
            } else {
                onChangeValue(value);
            }
        } else if (value.length > 1 && removeOnEmpty && countNonEmpty(v) <= 1) {
            onRemove(i)
        } else {
            onChangeValue(value);
        }
    };

    if (value.length === 0) {
        onAdd();
    } else {
        const last = value[value.length - 1];
        if (addOnNonEmpty && countNonEmpty(last) > 1) {
            onAdd()
        }
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
        value.move(oldIndex, newIndex);
        onChangeValue(value);
    };

    return el(c.BaseControl, {
            label: _ref.label,
            id: id,
            help: _ref.help,
            className: _ref.className
        }, [
            el(SortableList, {
                key: id + '-sortable-list',
                id: id,
                items: value,
                lockAxis: 'y',
                helperContainer: function () {
                    //This is an awaiting PR in react-sortable-hoc, until implemented, jQuery has to do the job :(
                    return typeof this.container !== "undefined" ? this.container : jQuery(".edit-post-sidebar").get(0)
                },
                template: _ref.children,
                removeText: _ref.removeText,
                addOnNonEmpty,
                onRemove,
                onChangeChild,
                onSortEnd
            }),
            !addOnNonEmpty && (!max || value.length < max) ? el(c.Button, {
                    className: 'repeater-row-add is-button is-default is-large',
                    onClick: onAdd
                },
                _ref.addText ? _ref.addText : '+') : null
        ]
    );
});

//    $cross = '<path d="M17 18.5c-.4 0-.8-.1-1.1-.4l-10-10c-.6-.6-.6-1.6 0-2.1.6-.6 1.5-.6 2.1 0l10 10c.6.6.6 1.5 0
//    2.1-.3.3-.6.4-1 .4z"></path><path d="M7 18.5c-.4 0-.8-.1-1.1-.4-.6-.6-.6-1.5 0-2.1l10-10c.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1l-10 10c-.3.3-.6.4-1 .4z"></path>';
//    $tick = '<path stroke-width="4" stroke-linecap="round" d="M18.4 7.8l-8.5 8.4L5.6 12"></path>';
//@todo align
//@todo extended classes

registerBlockType("nhsblocks/nhsdodont", {
    title: __("Do / Dont Lists", "nhsblocks"),
    category: "nhsblocks",
    attributes: {
        my_repeater: {
            type: 'string|array', // It's a string when persisted but when working on gutenberg it's an array
            source: 'attribute',
            selector: 'select',
            attribute: 'my_repeater',
            default: []
        }
    },
 edit: props => {
    return <RepeaterControl max={5} value={props.attributes.my_repeater} onChange={(val) => {
        props.setAttributes({my_repeater: val});
    }}>
    {
        //Since this is a template, the content of the repeater MUST be a function, the first parameter is the value of the Repeater row and the second is a callback to call when the value of the row is changed
        (value, onChange) => {
            return [
                // Don't worry about directly modifying the value, it's sent cloned to avoid mutating the state
                <TextControl label="Key" value={value.my_key} onChange={(v) => {
                value.my_key = v;
                onChange(value)
            }}/>,
            <TextControl label="Value" value={value.my_val} onChange={(v) => {
                value.my_val = v;
                onChange(value)
            }}/>
        ]
        }
    }
</RepeaterControl>
},
 save: props => {
    const arData = repeaterData(props.attributes.my_repeater, true);
    return <select my_repeater={JSON.stringify(arData)}>
        {
            arData.map((v) => {
                return <option value={v.my_key}>{v.my_val}</option>
            })
        }
        </select>
}
});

      /*  return (
<div className="nhsuk-do-dont-list">
    <h3 className="nhsuk-do-dont-list__label">title</h3>
    <ul className="nhsuk-list nhsuk-list--tick">
      <li>
        <svg className="nhsuk-icon nhsuk-icon__tick" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"fill="none" aria-hidden="true">
          <path stroke-width="4" stroke-linecap="round" d="M18.4 7.8l-8.5 8.4L5.6 12"></path>
        </svg>
        <div className = "dodonttext">Text</div>
      </li>
    </ul>
</div>*/
