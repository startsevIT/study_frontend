import {useState} from "react";

export function useValidation<T>(options: {
    isRequired?: boolean;
    validate?: (value: T) => string | null;
}): {
    error: string;
    setError: (v: string) => void;
    isValid: (v: T) => boolean;
    clearError: () => void;
} {
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

    const isValid = (val: T): boolean => {
        let result = validateValue(val);
        setError(result || '');
        return !result;
    };
    const clearError = () => setError('');

    return {error, setError, isValid, clearError,};
}