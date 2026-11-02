interface LoadingStateProps {
    message?: string;
}

export function LoadingState({ message = 'Connecting to NASA APOD API...' }: LoadingStateProps) {
    return (
        <div className="loading-state" role="status" aria-live="polite">
            <div className="spinner"></div>
            <p>🚀 {message}</p>
        </div>
    );
}
