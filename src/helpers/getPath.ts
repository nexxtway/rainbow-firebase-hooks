type PathFunc = (...args: any[]) => string;
type Path = string | PathFunc;

export default function getPath(path: Path, ...args: any[]): string {
    if (typeof path === 'function') {
        return path(...args);
    }
    return path;
}
