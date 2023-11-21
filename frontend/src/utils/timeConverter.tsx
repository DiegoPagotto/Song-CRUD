
export function convertToSeconds(timeString: string): number {
    const [minutes, seconds] = timeString.split(':');
    const parsedMinutes: number = parseInt(minutes);
    const parsedSeconds: number = parseInt(seconds);

    if (isNaN(parsedMinutes) || isNaN(parsedSeconds)) {
        throw new Error('Invalid time format');
    }

    const totalSeconds: number = parsedMinutes * 60 + parsedSeconds;
    return totalSeconds;
}

export function convertToTimeString(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    const timeString: string = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    return timeString;
}