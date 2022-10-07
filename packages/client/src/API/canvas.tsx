import { useEffect, useRef } from "react"

export const canvas = (): JSX.Element => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx = ref.current?.getContext('2d');

        ctx?.fillRect(0, 0, 100, 100)
    }, []);

    return (
        <canvas ref = {ref} width={300} height={300} />
    );
}