export default function StatusBox({ loading, error, children }) {
    if (loading) {
        return (
            <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10 }}>
                Loading...
            </div>
        );
    }
    if (error) {
        return (
            <div style={{ padding: 12, border: "1px solid #f5c2c2", background: "#ffecec", borderRadius: 10 }}>
                <b>Error:</b> {error}
            </div>
        );
    }
    return children;
}