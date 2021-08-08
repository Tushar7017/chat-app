import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'

const EditableInput = ({
    initialValue,
    onSave,
    label = null,
    placeholder = 'write your value',
    emptyMsg = "input is empyty",
    ...inputProps
}) => {

    const [input, setInput] = useState(initialValue);
    const [isEditable, setIsEditable] = useState(false);

    const onInputChange = useCallback((value) => {

        setInput(value);

    }, []);

    const onEditClick = useCallback(() => {
        setIsEditable(p => !p)
        setInput(initialValue);

    }, [initialValue]);

    const onSaveClick = async () => {
        const trimed = input.trim();

        if (trimed === '') {
            Alert.info(emptyMsg, 4000);
        }

        if (trimed !== initialValue) {
            await onSave(trimed);
        }

        setIsEditable(false);
    }

    return (
        <div>
            {label}
            <InputGroup>
                <Input
                    {...inputProps}
                    disabled={!isEditable}
                    placeholder={placeholder}
                    value={input}
                    onChange={onInputChange}
                />
                <InputGroup.Button onClick={onEditClick}>
                    <Icon icon={isEditable ? 'close' : 'edit2'} />
                </InputGroup.Button>

                {isEditable && (
                    <InputGroup.Button onClick={onSaveClick}>
                        <Icon icon='check' />
                    </InputGroup.Button>
                )}
            </InputGroup>
        </div>
    )
}

export default EditableInput