const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

export const getDayOfWeek = (dateStr: string) => {
    const d = new Date(dateStr);
    return daysOfWeek[d.getDay() ? d.getDay() - 1 : daysOfWeek.length - 1] || '';
};
export const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('ru-RU', {day: '2-digit', month: '2-digit'});
};