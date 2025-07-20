"use client";

export default function Error({ error, reset }) {
    return (
        <div>
            <p>{error.message}</p>
            <button onClick={reset}>Reset</button>
        </div>
    )
}