interface ErrorStateProps {
    message: string;
    onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
    return (
        <div className="error-state" role="alert">
            <h2>❌ Transmission Failure</h2>
            <p>{message}</p>
            <button
                type="button"
                id="retry-btn"
                onClick={onRetry}
            >
                Retry Connection
            </button>
        </div>
    );
}
