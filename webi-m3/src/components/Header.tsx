interface HeaderProps {
    title?: string;
    subtitle?: string;
}

export function Header({
    title = 'NASA APOD Odyssey',
    subtitle = 'Explore the cosmos through daily astronomical photography'
}: HeaderProps) {
    return (
        <header>
            <h1>🚀 {title}</h1>
            <p className="header-subtitle">{subtitle}</p>
        </header>
    );
}
