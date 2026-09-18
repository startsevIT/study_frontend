import {useState} from "react";

interface ValidationOptions<T> {
    isRequired?: boolean;
    validate?: (value: T) => string | null;
}

export function useValidation<T>(options: ValidationOptions<T>) {
    const [error, setError] = useState('');

    const validateValue = (val: T): string | null => {
        if (options.isRequired) {
            if (Array.isArray(val) && val.length === 0) return 'Обязательное поле';
            if (typeof val === 'string' && !val.trim()) return 'Обязательное поле';
            if (!val) return 'Обязательное поле';
        }
        if (options.validate) return options.validate(val);
        return null;
    };

    const isValid = (val: T) : boolean => {
        let result = validateValue(val);
        setError(result || '');
        return !result;
    };
    const clearError = () => setError('');

    return {
        error,
        setError,
        isValid,
        clearError,
    };
}