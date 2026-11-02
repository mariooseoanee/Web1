interface FilterBarProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export function FilterBar({
    categories,
    selectedCategory,
    onSelectCategory
}: FilterBarProps) {
    return (
        <nav id="filters" aria-label="Category filters">
            <button
                type="button"
                className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => onSelectCategory('all')}
            >
                All
            </button>

            {categories.map((cat) => (
                <button
                    key={cat}
                    type="button"
                    className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => onSelectCategory(cat)}
                >
                    {cat}
                </button>
            ))}
        </nav>
    );
}
